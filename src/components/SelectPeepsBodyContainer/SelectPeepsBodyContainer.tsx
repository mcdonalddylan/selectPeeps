import { ReactElement } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { AddRemoveModal } from '../AddRemoveModal/AddRemoveModal';
import { DataListContainer } from '../DataListContainer/DataListContainer';
import './SelectPeepsBodyContainer.scss';

export const SelectPeepsBodyContainer = (): ReactElement => {
    const { isLightOn } = usePageDataContext();
    
    return (
        <div className={`${isLightOn ? 'select-container-bg-light' : 'select-container-bg-dark'}`}>
            <div className='container d-flex justify-content-center'>
                <div className='flex-row'>
                    <div className='p-12 select-container-fg'>
                        <DataListContainer />
                        <AddRemoveModal />
                    </div>
                </div>
            </div>
        </div>
    )
};