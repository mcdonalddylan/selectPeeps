import { ReactElement, useEffect } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { AddNameDataButton } from '../AddNameDataButton/AddNameDataButton';
import { NameOnList } from '../NameOnList/NameOnList';
import { BackgroundElements } from '../BackgroundElements/BackgroundElements';
import { LoginContainer } from '../LoginContainer/LoginContainer';
import { sortDataByDate } from '../../utils/pointingUtils/pointingUtils';
import './DataListContainer.scss';

export const DataListContainer = (): ReactElement => {
    const { currentPage, selectedTeam, getRetroMemberData, getTechtroMemberData, getPointingData,
        isRandomizing, setIsRandomizing, pointData, setPointData, nameData, setNameData } = usePageDataContext();

    const sortDataByTeam = (dataList: any[]) => {
        return dataList?.filter((data) => data?.team === selectedTeam);
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
                    {pointData &&
                        <LoginContainer
                            sortDataByTeam={sortDataByTeam}
                            sortDataByDate={sortDataByDate}
                        />
                    }
                </div>
                <BackgroundElements />
            </>
        </div>
    );
};