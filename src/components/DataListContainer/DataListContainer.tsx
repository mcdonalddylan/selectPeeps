import { ReactElement, useEffect } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import { AddNameDataButton } from '../AddNameDataButton/AddNameDataButton';
import { NameOnList } from '../NameOnList/NameOnList';
import logo from '../../assets/logo.svg';
import './DataListContainer.scss';

export const DataListContainer = (): ReactElement => {
    const { currentPage, selectedTeam, currentLanguage, getRetroMemberData, getTechtroMemberData, isLightOn,
        getPointingData, isRandomizing, setIsRandomizing, pointData, setPointData, nameData, setNameData } = usePageDataContext();

    const sortDataByTeam = (dataList: any[]) => {
        return dataList?.filter((data) => data?.team === selectedTeam);
    };

    const sortDataByDate = (dataList: any[]) => {
        return dataList?.sort((x, y) => new Date(x?.timeStamp).getTime() - new Date(y?.timeStamp).getTime());
    };

    useEffect(() => {
        if (currentPage === 'retro') {
            const tempMemberData = sortDataByTeam(getRetroMemberData());
            setPointData(null);
            setNameData(tempMemberData);
        } else if (currentPage === 'techtro') {
            const tempMemberData = sortDataByTeam(getTechtroMemberData());
            setPointData(null);
            setNameData(tempMemberData);
        } else if (currentPage === 'pointing') {
            let tempPointingData = sortDataByTeam(getPointingData());
            tempPointingData = sortDataByDate(tempPointingData);
            setNameData(null);
            setPointData(tempPointingData);
        }
        window.scrollTo(0,0);
        if (isRandomizing) {
            setIsRandomizing(false);
        }
    }, [currentPage, selectedTeam]);

    const calcAveragePoints = (): string | number => {
        if (pointData) {
            let runningTotal: number = 0;
            for (const data of pointData[0]?.members) {
                if (data?.pointValue !== -1) {
                    runningTotal += data.pointValue;
                }
            }
            return runningTotal / pointData[0]?.members.length;
        }
        return '???';
    };

    return (
        <div className={`container data-list-container ${currentPage === 'pointing' ? 'justify-content-center' : 'justify-content-start'}`}>
            <>
                <div className='d-flex flex-wrap'>
                    {nameData && nameData?.map((person: any, index: number) => {
                        return (
                            <NameOnList key={index} id={person?.id} name={person?.name} selected={person?.isSelected} />
                        )
                    })}
                    {nameData && <AddNameDataButton />}
                </div>
                <div className='flex-row'>
                    {pointData ? (
                        <>
                            <div className='point-data-container'>
                                <div className='chosen-point-container'>
                                    {pointData[0]?.chosenPointValue === -1 ? '???' : pointData[0]?.chosenPointValue}
                                </div>
                                <div className='average-points-container'>
                                    {`${formatMessage('Site.Pointing.AvgPoints', currentLanguage)}: ${calcAveragePoints()}`}
                                </div>
                                <h1>{pointData[0]?.storyName}</h1>
                                <hr className='points-hr' ></hr>
                                {pointData[0]?.members?.map((person: any, index: number) => {
                                    return (
                                        <div className='pointer-row-container'>
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
                            <div className='point-data-history-container'>
                                <div className='d-flex align-items-center mb-3 story-header-container'>
                                    <h4 className='p-1'>
                                        Date:
                                    </h4>
                                    <h4 className='p-5'>
                                        Story Name:
                                    </h4>
                                    <h4 className='ms-auto p-2'>
                                        Chosen Point Value:
                                    </h4>
                                </div>
                                <hr className='history-hr'></hr>
                                {pointData?.map((storyData: any, index: number) => {
                                        return (
                                            <div className='d-flex align-items-center mb-3 story-row-unselected'>
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
                        </>
                        ) :
                        <></>
                    }
                </div>
                <div className={isLightOn ? 'select-container-bg-light' : 'select-container-bg-dark'}></div>
                <div className='bg-logo-container'>
                    <img src={logo} className='bg-logo' alt='bg-logo' />
                </div>
            </>
        </div>
    );
};