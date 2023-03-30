import { ReactElement, useState, useEffect, SyntheticEvent } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import { isUsernameInSelectedStory, calcAveragePoints } from '../../utils/pointingUtils/pointingUtils';
import './PointingDataContainer.scss';
import { StoryNameRowContainer } from '../StoryNameRowContainer/StoryNameRowContainer';
import { AddRemoveModal } from '../AddRemoveModal/AddRemoveModal';

interface IPointingDataContainerProps {
    sortDataByTeam: Function;
    sortDataByDate: Function;
};

export const PointingDataContainer = ({ sortDataByTeam, sortDataByDate } : IPointingDataContainerProps): ReactElement => {
    const { currentLanguage, selectedTeam, getPointingData, pointData, setPointData, updatePointingData, 
        loggedInUsername, selectedStoryData, setSelectedStoryData, isLoggedInMemberInSelectedStory, 
        setIsLoggedInMemberInSelectedStory } = usePageDataContext();
    const [isViewingStory, setIsViewingStory] = useState<boolean>(false);
    const [viewAddModal, setViewAddModal] = useState<boolean>(false);
    const [isRemoveButtonVisible, setIsRemoveButtonVisible] = useState<boolean>(false);
    const [isEditingStoryName, setIsEditingStoryName] = useState<boolean>(false);
    const [isEditingPointTotal, setIsEditingPointTotal] = useState<boolean>(false);
    

    const handleSelectingStory = (storyData: any) => {
        window.scrollTo(0,0);
        setIsViewingStory(false);
        setSelectedStoryData(storyData);
    };

    useEffect(() => {
        let tempPointingData = sortDataByTeam(getPointingData());
        tempPointingData = sortDataByDate(tempPointingData);
        setSelectedStoryData(tempPointingData[0]);
    }, [selectedTeam]);

    useEffect(() => {
        setIsLoggedInMemberInSelectedStory(isUsernameInSelectedStory(selectedStoryData, loggedInUsername));
    }, [selectedStoryData]);

    useEffect(() => {
        if (viewAddModal) {
            const newNameInput = document.getElementsByName('newName');
            newNameInput[0].focus();
        }
    }, [viewAddModal]);

    useEffect(() => {
        if (isEditingStoryName) {
            const newStoryNameInput = document.getElementsByName('newStoryName');
            newStoryNameInput[0].focus();
        }
    }, [isEditingStoryName]);

    useEffect(() => {
        if (isEditingPointTotal) {
            const newPointTotalInput = document.getElementsByName('newPointTotal');
            newPointTotalInput[0].focus();
        }
    }, [isEditingPointTotal]);

    const handleJoiningAStory = () => {
        const selectedStoryIndex = pointData?.findIndex((storyData: any) => storyData?.storyId === selectedStoryData?.storyId);
        const newMemberId = Math.round(Math.random()*9999999);
        if (selectedStoryIndex !== -1) {
            setPointData((prevPointData: any[]) => [
                ...prevPointData.slice(0, selectedStoryIndex),
                {
                    ...prevPointData[selectedStoryIndex],
                    members: [
                        ...prevPointData[selectedStoryIndex]?.members,
                        {
                            pointId: newMemberId,
                            pointName: loggedInUsername,
                            pointValue: -1
                        }
                    ],
                },
                ...prevPointData.slice(selectedStoryIndex+1 > pointData?.length-1 ? pointData?.length : selectedStoryIndex+1, pointData?.length)
            ]);
            const newStoryData = [
                ...pointData.slice(0, selectedStoryIndex),
                {
                    ...pointData[selectedStoryIndex],
                    members: [
                        ...pointData[selectedStoryIndex]?.members,
                        {
                            pointId: newMemberId,
                            pointName: loggedInUsername,
                            pointValue: -1
                        }
                    ],
                },
                ...pointData.slice(selectedStoryIndex+1 > pointData?.length-1 ? pointData?.length : selectedStoryIndex+1, pointData?.length)
            ];
            setSelectedStoryData(newStoryData[selectedStoryIndex]);
            updatePointingData(newStoryData);
        }
    };

    const handleStoryMemberRemoval = (pointMemberId: number) => {
        const selectedStoryIndex = pointData?.findIndex((storyData: any) => storyData?.storyId === selectedStoryData?.storyId);
        if (selectedStoryIndex !== -1) {
            const newStoryData = [
                ...pointData.slice(0, selectedStoryIndex),
                {
                    ...pointData[selectedStoryIndex],
                    members: pointData[selectedStoryIndex]?.members?.filter((member: any) => member?.pointId !== pointMemberId),
                },
                ...pointData.slice(selectedStoryIndex+1 > pointData?.length-1 ? pointData?.length : selectedStoryIndex+1, pointData?.length)
            ];
            setPointData(newStoryData);
            setSelectedStoryData(newStoryData[selectedStoryIndex]);
            updatePointingData(newStoryData);
        }
    };

    const handleStoryRemoval = (storyDataId: number) => {
        if (!isEditingStoryName) {
            const newStoryData = [
                ...pointData?.filter((storyData: any) => storyData?.storyId !== storyDataId)
            ];
            setPointData(newStoryData);
            setSelectedStoryData(newStoryData[0]);
            updatePointingData(newStoryData);
        }
    };

    const handleSubmitEditOfStoryName = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newStoryNameText: string = e.currentTarget['newStoryName'].value;
        const selectedStoryIndex = pointData?.findIndex((storyData: any) => storyData?.storyId === selectedStoryData?.storyId);
        if (selectedStoryIndex !== -1) {
            setPointData((prevPointData: any[]) => [
                ...prevPointData.slice(0, selectedStoryIndex),
                {
                    ...prevPointData[selectedStoryIndex],
                    storyName: newStoryNameText
                },
                ...prevPointData.slice(selectedStoryIndex+1 > pointData?.length-1 ? pointData?.length : selectedStoryIndex+1, pointData?.length)
            ]);
            const newStoryData = [
                ...pointData.slice(0, selectedStoryIndex),
                {
                    ...pointData[selectedStoryIndex],
                    storyName: newStoryNameText
                },
                ...pointData.slice(selectedStoryIndex+1 > pointData?.length-1 ? pointData?.length : selectedStoryIndex+1, pointData?.length)
            ];
            setSelectedStoryData(newStoryData[selectedStoryIndex]);
            updatePointingData(newStoryData);
            setIsEditingStoryName(false);
        }
    };

    const handleSubmitEditOfPointTotal = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPointTotalText: string = e.currentTarget['newPointTotal'].value;
        const selectedStoryIndex = pointData?.findIndex((storyData: any) => storyData?.storyId === selectedStoryData?.storyId);
        if (selectedStoryIndex !== -1) {
            setPointData((prevPointData: any[]) => [
                ...prevPointData.slice(0, selectedStoryIndex),
                {
                    ...prevPointData[selectedStoryIndex],
                    chosenPointValue: newPointTotalText
                },
                ...prevPointData.slice(selectedStoryIndex+1 > pointData?.length-1 ? pointData?.length : selectedStoryIndex+1, pointData?.length)
            ]);
            const newStoryData = [
                ...pointData.slice(0, selectedStoryIndex),
                {
                    ...pointData[selectedStoryIndex],
                    chosenPointValue: newPointTotalText
                },
                ...pointData.slice(selectedStoryIndex+1 > pointData?.length-1 ? pointData?.length : selectedStoryIndex+1, pointData?.length)
            ];
            setSelectedStoryData(newStoryData[selectedStoryIndex]);
            updatePointingData(newStoryData);
            setIsEditingPointTotal(false);
        }
    };

    return (<>
                <div
                    className='point-data-container'
                    onClick={() => {
                        if (pointData.length > 1 && !isEditingStoryName && isLoggedInMemberInSelectedStory) {
                            setIsRemoveButtonVisible(!isRemoveButtonVisible);
                        }
                    }}
                    onMouseEnter={() => {
                        if (pointData.length > 1 && !isEditingStoryName && isLoggedInMemberInSelectedStory) {
                            setIsRemoveButtonVisible(true);
                        }
                    }}
                    onMouseLeave={() => {
                        if (pointData.length > 1) {
                            setIsRemoveButtonVisible(false);
                        }
                    }}
                >
                    {isRemoveButtonVisible &&
                        <div className='story-delete-container'>
                            <button
                                className='story-delete-btn'
                                onClick={() => handleStoryRemoval(selectedStoryData?.storyId)}
                            >
                                X
                            </button>
                        </div>
                    }
                    <div className='chosen-point-container' onClick={() => {
                            if (isLoggedInMemberInSelectedStory || isViewingStory) {
                                setIsEditingPointTotal(true);
                            }
                        }}
                    >
                        {isEditingPointTotal ?
                            <form onSubmit={handleSubmitEditOfPointTotal} className='edit-point-container'>
                                <input
                                    className='edit-number'
                                    type='number'
                                    min='0'
                                    max='9'
                                    defaultValue={selectedStoryData?.chosenPointValue === -1 ? 0 : selectedStoryData?.chosenPointValue}
                                    name='newPointTotal'
                                ></input>
                                <button className='edit-point-submit-btn' type='submit'>
                                    {formatMessage('Site.Common.Submit', currentLanguage)}
                                </button>
                                <button className='edit-point-cancel-btn' onClick={() => setIsEditingPointTotal(false)}>
                                    {formatMessage('Site.Common.Cancel', currentLanguage)}
                                </button>
                            </form> :
                            <p>
                                {selectedStoryData?.chosenPointValue === -1 ? '???' : selectedStoryData?.chosenPointValue}
                            </p>}
                    </div>
                    <div className='average-points-container'>
                        {`${formatMessage('Site.Pointing.AvgPoints', currentLanguage)}: ${isLoggedInMemberInSelectedStory || isViewingStory ? calcAveragePoints(selectedStoryData): '???'}`}
                    </div>
                    {isEditingStoryName ?
                        <form onSubmit={handleSubmitEditOfStoryName} className='edit-name-container'>
                            <input className='edit-text' type='text' defaultValue={selectedStoryData?.storyName} name='newStoryName'></input>
                            <button className='edit-submit-btn' type='submit'>
                                {formatMessage('Site.Common.Submit', currentLanguage)}
                            </button>
                            <button className='edit-cancel-btn' onClick={() => setIsEditingStoryName(false)}>
                                {formatMessage('Site.Common.Cancel', currentLanguage)}
                            </button>
                        </form> :
                        <h1 onClick={() => {
                                if (isLoggedInMemberInSelectedStory || isViewingStory) {
                                    setIsEditingStoryName(true);
                                }
                            }}
                        >
                            {selectedStoryData?.storyName}
                        </h1>}
                    <hr className='points-hr' ></hr>
                    {isLoggedInMemberInSelectedStory || isViewingStory ?
                        selectedStoryData?.members?.map((person: any, index: number) => {
                            return (
                                <StoryNameRowContainer
                                    key={index}
                                    allMemberData={selectedStoryData?.members}
                                    personData={person}
                                    index={index}
                                    isViewingStory={isViewingStory}
                                    removePersonFunction={handleStoryMemberRemoval}
                                    loggedInUsername={loggedInUsername}
                                />
                            )
                        }) :
                        <div className='d-flex justify-content-center join-btn-container'>
                            <button onClick={handleJoiningAStory} className='p-4 join-btn'>
                                {`${formatMessage('Site.Login.Join', currentLanguage)}`}
                            </button>
                            <button onClick={() => setIsViewingStory(true)} className='p-4 view-btn'>
                                {`${formatMessage('Site.Common.View', currentLanguage)}`}
                            </button>
                        </div>
                    }
                </div>
                <div className='point-data-history-stretch'>
                    <div className='point-data-history-container' >
                        <div className='d-flex align-items-center mb-3 story-header-container'>
                            <h4 className='p-1'>
                                {`${formatMessage('Site.Common.Date', currentLanguage)}:`}
                            </h4>
                            <h4 className='p-5'>
                                {formatMessage('Site.Pointing.StoryName', currentLanguage)}
                            </h4>
                            <h4 className='ms-auto p-2'>
                                {formatMessage('Site.Pointing.ChosenPoints', currentLanguage)}
                            </h4>
                        </div>
                        <hr className='history-hr'></hr>
                        <div
                            className='d-flex mb-3 justify-content-center align-items-center story-row-add-new'
                            onClick={() => {
                                if (!isEditingStoryName) {
                                    setViewAddModal(true);
                                } 
                            }}
                        >
                            <p className='p-12'>
                                +
                            </p>
                        </div>
                        <AddRemoveModal isAddingStory isVisible={viewAddModal} closeModalFunction={() => setViewAddModal(false)} setSelectedStory={setSelectedStoryData} />
                        {pointData?.map((storyData: any, index: number) => {
                            return (
                                <div
                                    className={`d-flex align-items-center mb-2 ${storyData?.storyId === selectedStoryData?.storyId ? 'story-row-selected' : 'story-row-unselected'}`}
                                    key={index}
                                    onClick={() => handleSelectingStory(storyData)}
                                >
                                    <p className='p-1'>
                                        {new Date(storyData?.timeStamp).toLocaleDateString()}
                                    </p>
                                    <p className='p-5'>
                                        {storyData?.storyName}
                                    </p>
                                    <p className='ms-auto p-2'>
                                        {storyData?.chosenPointValue === -1 ? '???' : storyData?.chosenPointValue}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
            </>
    );
};