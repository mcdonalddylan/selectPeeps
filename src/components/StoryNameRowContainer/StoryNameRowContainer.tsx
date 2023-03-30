import { ReactElement, useState } from 'react';
import './StoryNameRowContainer.scss';

interface IStoryNameRowContainerProps {
    allMemberData: any[];
    personData: any;
    index: number;
    removePersonFunction: Function;
    isViewingStory: boolean;
    loggedInUsername: string | null;
}

export const StoryNameRowContainer = ({ allMemberData, personData, index, removePersonFunction, isViewingStory, loggedInUsername }: IStoryNameRowContainerProps ): ReactElement => {
    const [isRemoveVisible, setIsRemoveVisible] = useState<boolean>(false);
    
    return (
        <div
            className='pointer-row-container'
            onClick={() => {
                if (allMemberData.length > 1 && !isViewingStory) {
                    setIsRemoveVisible(!isRemoveVisible);
                }
            }}
            onMouseEnter={() => {
                if (allMemberData.length > 1 && !isViewingStory) {
                    setIsRemoveVisible(true);
                }
            }}
            onMouseLeave={() => {
                if (allMemberData.length > 1 && !isViewingStory) {
                    setIsRemoveVisible(false);
                }
            }}
        >
            <div className={`d-flex justify-content-center align-items-center pointer-name-row ${personData?.pointName === loggedInUsername && 'select-name-row'}`}>
                <p className='p-1 pointer-number'>
                    {index+1}
                </p>
                <p className='p-3'>
                    {personData?.pointName}
                </p>
                <p className='ms-auto p-1'>
                    {personData?.pointValue === -1 ? '???' : personData?.pointValue}
                </p>
            </div>
            {isRemoveVisible &&
                <div className='story-name-delete-container'>
                    <button
                        className='story-name-delete-btn'
                        onClick={() => removePersonFunction(personData?.pointId)}
                    >
                        X
                    </button>
                </div>
            }
        </div>
    );
};