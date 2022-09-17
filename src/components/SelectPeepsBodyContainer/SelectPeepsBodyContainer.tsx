import { ReactElement } from 'react';
import { AddRemovePeopleModal } from '../AddRemovePeopleModal/AddRemovePeopleModal';
import { NameListContainer } from '../NameListContainer/NameListContainer';
import './SelectPeepsBodyContainer.scss';

export const SelectPeepsBodyContainer = (): ReactElement => {
    return (
        <div className='select-container-bg'>
            <div className='container d-flex justify-content-center'>
                <div className='flex-row'>
                    <div className='p-12'>
                        <NameListContainer />
                        <AddRemovePeopleModal />
                    </div>
                </div>
            </div>
        </div>
    )
};