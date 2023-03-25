import { ReactElement } from 'react';
import './NavBarHeader.scss';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';

export const NavBarHeader = (): ReactElement => {
    const { currentLanguage, setCurrentPage, currentPage, isRandomizing } = usePageDataContext();

    return (
        <div className='nav-container'>
            <div className='nav-relative-container'>
                <div className='nav-container-gradient'></div>
            </div>
            <div className='nav-button-container'>
                <div className='d-flex align-items-center'>
                    <div className='p-3'>
                        <button
                            className={currentPage === 'retro' ? 'selected-btn': 'reg-btn'}
                            onClick={() => {
                                if(currentPage !== 'retro' && !isRandomizing) {
                                    localStorage.setItem('pagePreference', 'retro');
                                    setCurrentPage('retro');
                                }
                            }}
                        >
                            {formatMessage('Site.Retro.Button', currentLanguage)}
                        </button>
                    </div>
                    <div className='p-3'>
                        <button
                            className={currentPage === 'techtro' ? 'selected-btn': 'reg-btn'}
                            onClick={() => {
                                if(currentPage !== 'techtro' && !isRandomizing) {
                                    localStorage.setItem('pagePreference', 'techtro');
                                    setCurrentPage('techtro');
                                }
                            }}
                        >
                            {formatMessage('Site.Techtro.Button', currentLanguage)}
                        </button>
                    </div>
                    <div className='p-3'>
                        <button
                            className={currentPage === 'pointing' ? 'selected-btn': 'reg-btn'}
                            onClick={() => {
                                if(currentPage !== 'pointing' && !isRandomizing) {
                                    localStorage.setItem('pagePreference', 'pointing');
                                    setCurrentPage('pointing');
                                }
                            }}
                        >
                            {formatMessage('Site.Pointing.Button', currentLanguage)}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};