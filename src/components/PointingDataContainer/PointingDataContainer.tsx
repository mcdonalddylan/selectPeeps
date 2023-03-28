import { ReactElement, useState, useEffect } from 'react';
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
        loggedInUsername } = usePageDataContext();
    const [selectedStoryData, setSelectedStoryData] = useState<any>(pointData[0]);
    const [isLoggedInMemberInSelectedStory, setIsLoggedInMemberInSelectedStory] = useState<boolean>(isUsernameInSelectedStory(selectedStoryData, loggedInUsername));
    const [isViewingStory, setIsViewingStory] = useState<boolean>(false);
    const [viewAddModal, setViewAddModal] = useState<boolean>(false);

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

    return (<>
                <div className='point-data-container'>
                    <div className='chosen-point-container'>
                        {selectedStoryData?.chosenPointValue === -1 ? '???' : selectedStoryData?.chosenPointValue}
                    </div>
                    <div className='average-points-container'>
                        {`${formatMessage('Site.Pointing.AvgPoints', currentLanguage)}: ${isLoggedInMemberInSelectedStory || isViewingStory ? calcAveragePoints(selectedStoryData): '???'}`}
                    </div>
                    <h1>{selectedStoryData?.storyName}</h1>
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
                    <div className='point-data-history-container'>
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
                            className='d-flex mb-2 justify-content-center align-items-center story-row-add-new'
                            onClick={() => setViewAddModal(true)}
                        >
                            <p className='p-12'>
                                +
                            </p>
                        </div>
                        {viewAddModal && <AddRemoveModal isAddingStory isVisible={viewAddModal} closeModalFunction={() => setViewAddModal(false)} />}
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