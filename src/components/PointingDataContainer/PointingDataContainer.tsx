import { ReactElement, useState, useEffect } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import './PointingDataContainer.scss';

interface IPointingDataContainerProps {
    pointingDataList: any[];
    sortDataByTeam: Function;
    sortDataByDate: Function;
};

export const PointingDataContainer = ({ pointingDataList, sortDataByTeam, sortDataByDate } : IPointingDataContainerProps): ReactElement => {
    const { currentLanguage, selectedTeam, getPointingData } = usePageDataContext();
    const [selectedStoryData, setSelectedStoryData] = useState<any>(pointingDataList[0]);

    const handleSelectingStory = (storyData: any) => {
        window.scrollTo(0,0);
        setSelectedStoryData(storyData);
    };

    useEffect(() => {
        let tempPointingData = sortDataByTeam(getPointingData());
        tempPointingData = sortDataByDate(tempPointingData);
        setSelectedStoryData(tempPointingData[0]);
    }, [selectedTeam]);

    const calcAveragePoints = (): string | number => {
        if (pointingDataList) {
            let runningTotal: number = 0;
            let numOfIterations = 0;
            for (const data of selectedStoryData?.members) {
                if (data?.pointValue !== -1) {
                    runningTotal += data.pointValue;
                    numOfIterations++;
                }
            }
            return (runningTotal / numOfIterations).toFixed(1);
        }
        return '???';
    };

    return (<>
                <div className='point-data-container'>
                    <div className='chosen-point-container'>
                        {selectedStoryData?.chosenPointValue === -1 ? '???' : selectedStoryData?.chosenPointValue}
                    </div>
                    <div className='average-points-container'>
                        {`${formatMessage('Site.Pointing.AvgPoints', currentLanguage)}: ${calcAveragePoints()}`}
                    </div>
                    <h1>{selectedStoryData?.storyName}</h1>
                    <hr className='points-hr' ></hr>
                    {selectedStoryData?.members?.map((person: any, index: number) => {
                        return (
                            <div className='pointer-row-container' key={index}>
                                <div className='d-flex justify-content-center align-items-center pointer-name-row'>
                                    <p className='p-1'>
                                        {index+1}
                                    </p>
                                    <p className='p-3'>
                                        {person?.pointName}
                                    </p>
                                    <p className='ms-auto p-1'>
                                        {person?.pointValue === -1 ? '???' : person?.pointValue}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
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
                        {pointingDataList?.map((storyData: any, index: number) => {
                                return (
                                    <div
                                        className={`d-flex align-items-center mb-3 ${storyData?.storyId === selectedStoryData?.storyId ? 'story-row-selected' : 'story-row-unselected'}`}
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