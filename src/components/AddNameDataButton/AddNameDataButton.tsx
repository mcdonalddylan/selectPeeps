import { ReactElement, useState } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { AddRemoveModal } from '../AddRemoveModal/AddRemoveModal';
import './AddNameDataButton.scss';

export const AddNameDataButton = (): ReactElement => {
    const { isRandomizing } = usePageDataContext();
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleAddingNewName = () => {
        if (!isRandomizing) {
            setShowModal(true);
        }
    };

    return (
        <>
            <div className='p3 add-name-btn-container' onClick={handleAddingNewName}>
                <div className='add-name-btn'>
                    +
                </div>
            </div>
            <AddRemoveModal isNameData={true} isVisible={showModal} closeModalFunction={() => setShowModal(false)} />
        </>
    );
};