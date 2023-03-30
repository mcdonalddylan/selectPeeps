import { ReactElement, useEffect, useState, useRef } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import './BottomActionModal.scss';

export const BottomActionModal = (): ReactElement => {
    const { currentLanguage, currentPage, isRandomizing, setIsRandomizing,
        nameData, setNameData, updateRetroMemberData, updateTechtroMemberData, isLocalEnvironment, loggedInUsername,
        isLoggedInMemberInSelectedStory } = usePageDataContext();

    const RANDOMIZE_SPEED = 150;
    let randomIntervalId : NodeJS.Timer;

    
    useEffect(() => {
        if (isLocalEnvironment){
            console.log('name data:', nameData);
        }
    }, [nameData]);

    const randomizeTheSelectedPerson = () => {
        if (!isRandomizing && nameData && nameData?.length > 1) {
            setIsRandomizing(true);

            let loopCount = Math.round((Math.random()*10) + 4);
            const originalSelectedMember = getSelectedMemberData();
            randomIntervalId = setInterval(() => {
                const tempMember = getSelectedMemberData();
                const selectedMembersIndex = getSelectedMemberIndex();
                if (tempMember && selectedMembersIndex !== -1) {
                    tempMember.isSelected = false;
                    setNameData((prevNameData: any[]) => [
                        ...prevNameData.slice(0, selectedMembersIndex),
                        {
                            id: prevNameData[selectedMembersIndex]?.id,
                            name: prevNameData[selectedMembersIndex]?.name,
                            team: prevNameData[selectedMembersIndex]?.team,
                            isSelected: false
                        },
                        ...prevNameData.slice(selectedMembersIndex+1, nameData?.length)
                    ]);
                    let randomIndexValue: number = 0;
                    while (true) {
                        randomIndexValue = Math.round(Math.random()*(nameData.length-1));
                        if (nameData[randomIndexValue]?.id !== tempMember?.id) {
                            break;
                        }
                    };
                    const updatedNameData: any[] = nameData;
                    if (updatedNameData) {
                        updatedNameData[randomIndexValue].isSelected = true;
                        setNameData((prevNameData: any[]) => [
                            ...prevNameData.slice(0, randomIndexValue),
                            {
                                id: prevNameData[randomIndexValue]?.id,
                                name: prevNameData[randomIndexValue]?.name,
                                team: prevNameData[randomIndexValue]?.team,
                                isSelected: true
                            },
                            ...prevNameData.slice(randomIndexValue+1, nameData?.length)
                        ]);
                        loopCount--;
                        if (loopCount < 0 && originalSelectedMember?.id !== updatedNameData[randomIndexValue]?.id) {  // ends the interval once the looping number is over
                            clearInterval(randomIntervalId);
                            setIsRandomizing(false);
                            if (currentPage === 'retro') {
                                updateRetroMemberData(updatedNameData);
                            } else if (currentPage === 'techtro') {
                                updateTechtroMemberData(updatedNameData);
                            }
                        } else if (loopCount < 0) {
                            loopCount++;
                        }
                    } else {
                        clearInterval(randomIntervalId);
                        setIsRandomizing(false);
                        console.error('**ERROR: had to exit randomizing loop to due to nameData being undefined or null');
                    }
                    
                } else {
                    clearInterval(randomIntervalId);
                    setIsRandomizing(false);
                    console.error('**ERROR: had to exit randomizing loop to due to nameData being undefined or null');
                }
            }, RANDOMIZE_SPEED);
        };
    };

    const selectTheNextPerson = () => {
        if (!isRandomizing && nameData && nameData?.length > 1) {
            const selectedMembersIndex = getSelectedMemberIndex();
            const updatedNameData: any[] = nameData;
            console.log('select mem index: ', selectedMembersIndex, ' | updatedNameData: ', updatedNameData);
            if (updatedNameData && updatedNameData.length > 1 && selectedMembersIndex !== -1) {
                updatedNameData[selectedMembersIndex].isSelected = false;
                updatedNameData[selectedMembersIndex+1 > nameData?.length-1 ? 0 : selectedMembersIndex+1].isSelected = true;

                const nextNameIndex = selectedMembersIndex+1 > nameData?.length-1 ? 0 : selectedMembersIndex+1; // TODO: Need to fix this logic
                // Updating name data without replcaing the whole object (to fix animation)
                setNameData((prevNameData: any[]) => [
                    ...prevNameData.slice(0, selectedMembersIndex),
                    {
                        id: prevNameData[selectedMembersIndex]?.id,
                        name: prevNameData[selectedMembersIndex]?.name,
                        team: prevNameData[selectedMembersIndex]?.team,
                        isSelected: false
                    },
                    {
                        id: prevNameData[nextNameIndex]?.id,
                        name: prevNameData[nextNameIndex]?.name,
                        team: prevNameData[nextNameIndex]?.team,
                        isSelected: true
                    },
                    ...prevNameData.slice(nextNameIndex+1 > nameData?.length-1 ? nameData?.length : nextNameIndex+1, nameData?.length)
                ]);
                if (currentPage === 'retro') {
                    updateRetroMemberData(updatedNameData);
                } else if (currentPage === 'techtro') {
                    updateTechtroMemberData(updatedNameData);
                }
            }   
        }
    };

    const getSelectedMemberData = (): any => {
        let singleNameDataMember = [];
        singleNameDataMember = nameData?.filter((data: any) => data?.isSelected === true);
        if (singleNameDataMember?.length > 0) {
            return singleNameDataMember[0];
        } else {
            return null;
        }
    };

    const getSelectedMemberIndex = (): number => {
        return nameData?.findIndex((data: any) => data?.isSelected === true);
    };

    const updateLoggedInMembersPointValue = (pointUpdateValue: number) => {
        //TODO: Update logged in member's point value based on value passed in
    };

    return (
        <div className='bottom-action-container'>
            <div className={`d-flex ${(currentPage === 'retro' || currentPage === 'techtro') || isLoggedInMemberInSelectedStory ? 'bottom-action-enter' : 'bottom-action-exit'}`}>
                {currentPage === 'retro' || currentPage === 'techtro' ?
                <>
                    <div className='p-4'>
                        <button
                            className={isRandomizing ? 'randomize-button' : 'bottom-button'}
                            onClick={() => {
                                // begin the randomization animation
                                if (!isRandomizing) {
                                    randomizeTheSelectedPerson();
                                }
                            }}
                        >
                            {formatMessage('Site.Randomize.Button', currentLanguage)}
                        </button>
                    </div>
                    <div className='p-4'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                // select the next person on the list
                                selectTheNextPerson();
                            }}
                        >
                            {formatMessage('Site.NextPerson.Button', currentLanguage)}
                        </button>
                    </div>
                </> :
                <>
                    <div className='p-1 point-btn'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                updateLoggedInMembersPointValue(0);
                            }}
                        >
                            0
                        </button>
                    </div>
                    <div className='p-1 point-btn'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                updateLoggedInMembersPointValue(1);
                            }}
                        >
                            1
                        </button>
                    </div>
                    <div className='p-1 point-btn'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                updateLoggedInMembersPointValue(2);
                            }}
                        >
                            2
                        </button>
                    </div>
                    <div className='p-1 point-btn'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                updateLoggedInMembersPointValue(3);
                            }}
                        >
                            3
                        </button>
                    </div>
                    <div className='p-1 point-btn'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                updateLoggedInMembersPointValue(5);
                            }}
                        >
                            5
                        </button>
                    </div>
                    <div className='p-1 point-btn'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                updateLoggedInMembersPointValue(8);
                            }}
                        >
                            8+
                        </button>
                    </div>
                </>}
            </div>
        </div>
    ); 
};