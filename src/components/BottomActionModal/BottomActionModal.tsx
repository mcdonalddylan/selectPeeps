import { ReactElement } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import './BottomActionModal.scss';

export const BottomActionModal = (): ReactElement => {
    const { shouldShowBottomAction, setShouldShowBottomAction, currentLanguage } = usePageDataContext();

    const randomizeTheSelectedPerson = () => {

    }

    const selectTheNextPerson = () => {

    }

    return (
        <div className='bottom-action-container'>
            <div className={`d-flex ${shouldShowBottomAction ? 'bottom-action-enter' : 'bottom-action-exit'}`}>
                <div className='p-4'>
                    <button
                        className='randomize-button'
                        onClick={() => {
                            // begin the randomization animation
                            randomizeTheSelectedPerson();
                            setShouldShowBottomAction(false);
                        }}
                    >
                        {formatMessage('Site.Randomize.Button', currentLanguage)}
                    </button>
                </div>
                <div className='p-4'>
                    <button
                        className='randomize-button'
                        onClick={() => {
                            // select the next person on the list
                            selectTheNextPerson();
                        }}
                    >
                        {formatMessage('Site.NextPerson.Button', currentLanguage)}
                    </button>
                </div>
            </div>
        </div>
    ); 
};