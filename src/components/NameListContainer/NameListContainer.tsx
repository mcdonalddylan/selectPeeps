import { ReactElement } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { NameOnList } from '../NameOnList/NameOnList';
import './NameListContainer.scss';

export const NameListContainer = (): ReactElement => {
    const { nameData, currentPage } = usePageDataContext();

    return (
        <div className='container d-flex name-list-container'>
            <div className='flex-row'>
                {nameData ? nameData.map((person: any, index: number) => {
                    return (
                        <NameOnList key={index} name={person?.techtronames} selected={person?.techtroselected} />
                    )
                })
            : null}
            </div>
        </div>
    );
};