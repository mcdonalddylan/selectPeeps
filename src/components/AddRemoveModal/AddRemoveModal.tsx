import { ReactElement, SyntheticEvent } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import './AddRemoveModal.scss';

interface IAddRemoveModal {
    isVisible: boolean;
    closeModalFunction: Function;
}

export const AddRemoveModal = ({ isVisible, closeModalFunction }: IAddRemoveModal): ReactElement => {
    const { currentLanguage, selectedTeam, nameData, setNameData, updateRetroMemberData, updateTechtroMemberData, currentPage } = usePageDataContext();

    const handleSubmittingNewName = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newNameText: string = e.currentTarget['newName'].value;
        console.log('new name suggestion: ', newNameText);
        if (newNameText.length > 0 && newNameText.length <= 25) {
            const updatedNameData = [...nameData, {
                id: Math.random()*999999,
                team: selectedTeam,
                name: newNameText,
                isSelected: false
            }];
            setNameData(updatedNameData);

            if (currentPage === 'retro') {
                updateRetroMemberData(updatedNameData);
            } else if (currentPage === 'techtro') {
                updateTechtroMemberData(updatedNameData);
            }
            closeModalFunction();
        } else {
            console.error('**ERROR: suggested name is too long. Less than 25 characters please');
        }
    };

    return (
        <>
            {isVisible && 
                <div className='modal-container' >
                    <div className='modal-bg'></div>
                    <div className='modal'>
                        <form onSubmit={handleSubmittingNewName}>
                            <input type='text' className='modal-input' name='newName' placeholder={formatMessage('Site.AddNewPerson.Placeholder', currentLanguage)}></input>
                            <div className='d-flex justify-content-center align-items-center'>
                                <button className='p-5 modal-submit-btn' type='submit'>
                                    {formatMessage('Site.Common.Submit', currentLanguage)}
                                </button>
                                <button className='p-5 modal-cancel-btn' onClick={() => closeModalFunction()}>
                                    {formatMessage('Site.Common.Cancel', currentLanguage)}
                                </button> 
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
};