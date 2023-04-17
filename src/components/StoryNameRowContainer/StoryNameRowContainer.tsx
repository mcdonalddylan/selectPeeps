import { ReactElement, useState, useEffect } from 'react';
import './StoryNameRowContainer.scss';

interface IStoryNameRowContainerProps {
    pointData: any[];
    selectedStoryData: any;
    allMemberData: any[];
    personData: any;
    index: number;
    removePersonFunction: Function;
    hasRevealedPoints: boolean;
    loggedInUsername: string | null;
    isAdmin: boolean;
}

export const StoryNameRowContainer = ({
    pointData,
    selectedStoryData,
    allMemberData,
    personData,
    index,
    removePersonFunction,
    hasRevealedPoints,
    loggedInUsername,
    isAdmin }: IStoryNameRowContainerProps ): ReactElement => {
    const [isRemoveVisible, setIsRemoveVisible] = useState<boolean>(false);
    const [isPointed, setIsPointed] = useState<boolean>(false);

    useEffect(() => {
        if (personData?.pointValue !== -1) {
            setIsPointed(true);
        } else if (personData?.pointValue === -1) {
            setIsPointed(false);
        }
    }, [pointData, selectedStoryData]);
    
    return (
        <div
            className={`pointer-row-container`}
            onClick={() => {
                if (allMemberData.length > 1) {
                    setIsRemoveVisible(!isRemoveVisible);
                }
            }}
            onMouseEnter={() => {
                if (allMemberData.length > 1) {
                    setIsRemoveVisible(true);
                }
            }}
            onMouseLeave={() => {
                if (allMemberData.length > 1) {
                    setIsRemoveVisible(false);
                }
            }}
        >
            <div className={`${isPointed && 'pointed-name-row'}`}>
                {isPointed &&
                    <div className='story-name-pointed-container'>
                        <div className='story-name-point-icon'>
                            ✓
                        </div>
                    </div>
                }
                <div
                    className={`d-flex justify-content-center align-items-center pointer-name-row 
                    ${personData?.pointName === loggedInUsername && 'select-name-row'}`}
                >
                    <p className='p-1 pointer-number'>
                        {index+1}
                    </p>
                    <p className='p-3'>
                        {personData?.pointName}
                    </p>
                    <p className='ms-auto p-1'>
                        {(personData?.pointValue === -1 || !hasRevealedPoints) &&
                        (personData?.pointName !== loggedInUsername || personData?.pointValue === -1) ?
                        '???' :
                        personData?.pointValue}
                    </p>
                </div>
                {isRemoveVisible && (personData?.pointName === loggedInUsername || isAdmin) &&
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
        </div>
    );
};