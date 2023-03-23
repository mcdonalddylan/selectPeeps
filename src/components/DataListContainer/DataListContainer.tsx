import { ReactElement, useEffect, useState } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import { NameOnList } from '../NameOnList/NameOnList';
import './DataListContainer.scss';

export const DataListContainer = (): ReactElement => {
    const { currentPage, currentLanguage, getRetroMemberData, getTechtroMemberData, getPointingData } = usePageDataContext();
    const [nameData, setNameData] = useState<any | null>(null);
    const [pointData, setPointData] = useState<any | null>(null);

    useEffect(() => {
        if (currentPage === 'retro') {
            const tempMemberData = getRetroMemberData();
            setPointData(null);
            setNameData(tempMemberData);
        } else if (currentPage === 'techtro') {
            const tempMemberData = getTechtroMemberData();
            setPointData(null);
            setNameData(tempMemberData);
        } else if (currentPage === 'pointing') {
            const tempPointingData = getPointingData();
            setNameData(null);
            setPointData(tempPointingData);
        }
    }, [currentPage]);

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
    }

    return (
        <div className={`container d-flex data-list-container ${currentPage === 'pointing' ? 'justify-content-center' : 'justify-content-start'}`}>
            <div className='flex-row'>
                {nameData && nameData?.map((person: any, index: number) => {
                    return (
                        <NameOnList key={index} name={person?.name} selected={person?.isSelected} />
                    )
                })}
                {pointData ? (
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
                                <div className='d-flex justify-content-center align-items-center pointer-row'>
                                    <p className='p-1'>
                                        {index+1}
                                    </p>
                                    <p className='p-3'>
                                        {person?.pointName}
                                    </p>
                                    <p className='p-1'>
                                        {person?.pointValue === -1 ? '???' : person?.pointValue}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    ) :
                    <></>
                }
            </div>
        </div>
    );
};