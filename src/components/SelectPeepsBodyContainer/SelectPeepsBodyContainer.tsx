import { ReactElement } from 'react';
import { DataListContainer } from '../DataListContainer/DataListContainer';
import './SelectPeepsBodyContainer.scss';

export const SelectPeepsBodyContainer = (): ReactElement => {
    
    return (
        <div>
            <div className='container d-flex justify-content-center'>
                <div className='flex-row'>
                    <div className='p-12'>
                        <DataListContainer />
                    </div>
                </div>
            </div>
        </div>
    )
};