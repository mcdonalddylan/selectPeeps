import { ReactElement, SyntheticEvent, useEffect } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { sortDataByDate } from '../../utils/pointingUtils/pointingUtils';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import './AddRemoveModal.scss';

interface IAddRemoveModal {
    isVisible: boolean;
    closeModalFunction: Function;
    setSelectedStory?: Function;
    isAddingName?: boolean;
    isAddingStory?: boolean;
}

export const AddRemoveModal = ({ isAddingName, isAddingStory, setSelectedStory, isVisible, closeModalFunction }: IAddRemoveModal): ReactElement => {
    const { currentLanguage, selectedTeam, nameData, setNameData, updateRetroMemberData, updateTechtroMemberData, currentPage,
    pointData, setPointData, updatePointingData, loggedInUsername, hasRevealedPoints, setHasRevealedPoints } = usePageDataContext();

    const handleSubmittingNewName = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newNameText: string = e.currentTarget['newName'].value;
        if (newNameText.length > 0 && newNameText.length <= 25) {
            const updatedNameData = [...nameData, {
                id: Math.random()*999999,
                team: selectedTeam,
                name: newNameText,
                isSelected: false
            }];
            setNameData(updatedNameData);

            if (currentPage === 'retro') {
                updateRetroMemberData(updatedNameData);
            } else if (currentPage === 'techtro') {
                updateTechtroMemberData(updatedNameData);
            }
            closeModalFunction();
        } else {
            console.error('**ERROR: suggested name is too long. Less than 25 characters please');
        }
    };

    const handleSubmittingNewStoryName = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newNameText: string = e.currentTarget['newName'].value;
        const currentDateTimeInISOFormat: string = new Date(Date.now()).toISOString();
        console.log('new Date: ', currentDateTimeInISOFormat);
        if (setSelectedStory && newNameText.length > 0 && newNameText.length <= 30) {
            const randomStoryId = Math.random()*9999999;
            let updatedPointData = [...pointData, {
                storyId: randomStoryId,
                team: selectedTeam,
                storyName: newNameText,
                timeStamp: currentDateTimeInISOFormat,
                chosenPointValue: -1,
                members: [{
                    pointId: Math.random()*9999999,
                    pointName: loggedInUsername,
                    pointValue: -1
                }]
            }];
            updatedPointData = sortDataByDate(updatedPointData);
            setPointData(updatedPointData);
            setSelectedStory(updatedPointData?.filter((data: any) => data?.storyId === randomStoryId)[0]);
            updatePointingData(updatePointingData);
            if (hasRevealedPoints) {
                setHasRevealedPoints(false);
            }
            window.scrollTo(0,0);

            closeModalFunction();
        } else {
            console.error('**ERROR: suggested story name is too long. Less than 30 characters please');
        }
    };

    const renderPlaceholderText = (): string => {
        if (isAddingName) {
            return formatMessage('Site.AddNewPerson.Placeholder', currentLanguage);
        } else if (isAddingStory) {
            return formatMessage('Site.AddNewStory.Placeholder', currentLanguage);
        } else {
            return '???';
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.body.style.position = 'sticky';
            document.body.style.overflowY = 'hidden';
        } else {
            document.body.style.position = '';
            document.body.style.overflowY = '';
        }
    }, [isVisible]);

    return (
        <>
            {isVisible && 
                <div className='modal-container' >
                    <div className='modal-bg'></div>
                    <div className='modal'>
                        <form
                            onSubmit={(e) => {
                                if (isAddingName) {
                                    handleSubmittingNewName(e);
                                } else if (isAddingStory) {
                                    handleSubmittingNewStoryName(e);
                                }
                            }}
                        >
                            <input
                                type='text'
                                className='modal-input'
                                name='newName'
                                placeholder={renderPlaceholderText()}
                            ></input>
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='p-5 modal-submit-btn' type='submit'>
                                    {formatMessage('Site.Common.Submit', currentLanguage)}
                                </button>
                                <button className='p-5 modal-cancel-btn' onClick={() => closeModalFunction()}>
                                    {formatMessage('Site.Common.Cancel', currentLanguage)}
                                </button> 
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};