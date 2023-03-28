import { ReactElement, SyntheticEvent } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import './AddRemoveModal.scss';

interface IAddRemoveModal {
    isVisible: boolean;
    closeModalFunction: Function;
    isAddingName?: boolean;
    isAddingStory?: boolean;
}

export const AddRemoveModal = ({ isAddingName, isAddingStory, isVisible, closeModalFunction }: IAddRemoveModal): ReactElement => {
    const { currentLanguage, selectedTeam, nameData, setNameData, updateRetroMemberData, updateTechtroMemberData, currentPage,
    pointData, setPointData, updatePointingData, loggedInUsername } = usePageDataContext();

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
        const currentDateTimeInISOFormat: string = Date.now().toString();
        if (newNameText.length > 0 && newNameText.length <= 30) {
            const updatedPointData = [...pointData, {
                storyId: Math.random()*9999999,
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
            setPointData(updatedPointData);
            updatePointingData(updatePointingData);

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
    }

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