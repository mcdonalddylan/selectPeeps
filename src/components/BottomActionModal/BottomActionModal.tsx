import { ReactElement, useEffect, useState, useRef } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import './BottomActionModal.scss';

export const BottomActionModal = (): ReactElement => {
    const { shouldShowBottomAction, setShouldShowBottomAction, currentLanguage, currentPage, isRandomizing, setIsRandomizing,
        nameData, setNameData, updateRetroMemberData, updateTechtroMemberData } = usePageDataContext();
    const [triggerRandomize, setTriggerRandomize] = useState<boolean>(false);
    const firstUpdateCheck = useRef<number>(0);

    const RANDOMIZE_SPEED = 200;
    let randomIntervalId : NodeJS.Timer;

    const randomizeTheSelectedPerson = () => {
        if (!isRandomizing) {
            setIsRandomizing(true);

            let loopCount = Math.round((Math.random()*10) + 4);
            const originalSelectedMember = getSelectedMemberData();
            randomIntervalId = setInterval(() => {
                const tempMember = getSelectedMemberData();
                if (tempMember) {
                    tempMember.isSelected = false;
                    let randomIndexValue: number = 0;
                    while (true) {
                        randomIndexValue = Math.round(Math.random()*(nameData.length-1));
                        if (nameData[randomIndexValue]?.id !== tempMember?.id) {
                            break;
                        }
                    };
                    const updatedNameData: any[] = nameData;
                    if (updatedNameData) {
                        console.log('UPDATED NAME DATA: ', updatedNameData);
                        updatedNameData[randomIndexValue].isSelected = true;
                        setNameData(updatedNameData);
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

    useEffect(() => {
        firstUpdateCheck.current++;
        if (firstUpdateCheck.current > 2) { // this ignores the couple times that this useEffect runs upon first loading the page
            randomizeTheSelectedPerson();
        } else {
            return;
        }
        return () => window.clearInterval(randomIntervalId);
    }, [triggerRandomize]);

    const selectTheNextPerson = () => {
        if (!isRandomizing) {
            const selectedMembersIndex = getSelectedMemberIndex();
            const updatedNameData: any[] = nameData;
            console.log('select mem index: ', selectedMembersIndex, ' | updatedNameData: ', updatedNameData);
            if (updatedNameData) {
                console.log('SHOULD SEE');
                updatedNameData[selectedMembersIndex].isSelected = false;
                updatedNameData[selectedMembersIndex+1 > nameData?.length-1 ? 0 : selectedMembersIndex+1].isSelected = true;
                setNameData(updatedNameData);
                if (currentPage === 'retro') {
                    updateRetroMemberData(updatedNameData);
                } else if (currentPage === 'techtro') {
                    updateTechtroMemberData(updatedNameData);
                }
            }   
        }
    };

    useEffect(() => {
        console.log(nameData);
    }, [nameData]);

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

    return (
        <div className='bottom-action-container'>
            <div className={`d-flex ${shouldShowBottomAction ? 'bottom-action-enter' : 'bottom-action-exit'}`}>
                {currentPage === 'retro' || currentPage === 'techtro' ?
                <>
                    <div className='p-4'>
                        <button
                            className={isRandomizing ? 'randomize-button' : 'bottom-button'}
                            onClick={() => {
                                // begin the randomization animation
                                if (!isRandomizing) {
                                    setTriggerRandomize(!triggerRandomize);
                                    setShouldShowBottomAction(false);
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
                    <div className='p-1'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                // begin the randomization animation
                                randomizeTheSelectedPerson();
                                setShouldShowBottomAction(false);
                            }}
                        >
                            0
                        </button>
                    </div>
                    <div className='p-1'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                // select the next person on the list
                                selectTheNextPerson();
                            }}
                        >
                            1
                        </button>
                    </div>
                    <div className='p-1'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                // begin the randomization animation
                                setShouldShowBottomAction(false);
                            }}
                        >
                            2
                        </button>
                    </div>
                    <div className='p-1'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                // select the next person on the list
                                selectTheNextPerson();
                            }}
                        >
                            3
                        </button>
                    </div>
                    <div className='p-1'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                // select the next person on the list
                                selectTheNextPerson();
                            }}
                        >
                            5
                        </button>
                    </div>
                    <div className='p-1'>
                        <button
                            className='bottom-button'
                            onClick={() => {
                                // select the next person on the list
                                selectTheNextPerson();
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