import { ReactElement } from 'react';
import './NavBarHeader.scss';
import logo from '../../assets/logo.svg';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';

export const NavBarHeader = (): ReactElement => {
    const { currentLanguage, setCurrentPage, currentPage } = usePageDataContext();

    return (
        <div className='nav-container'>
            <div className='bg-logo-container'>
                <img src={logo} className='bg-logo' alt='bg-logo' />
            </div>
            <div className='nav-relative-container'>
                <div className='nav-container-gradient'></div>
            </div>
            <div className='nav-button-container'>
                <div className='d-flex align-items-center'>
                    <div className='p-3'>
                        <button
                            className='reg-btn'
                            onClick={() => {
                                if(currentPage !== 'retro') {
                                    setCurrentPage('retro');
                                }
                            }}
                        >
                            {formatMessage('Site.Retro.Button', currentLanguage)}
                        </button>
                    </div>
                    <div className='p-3'>
                        <button
                            className='reg-btn'
                            onClick={() => {
                                if(currentPage !== 'techtro') {
                                    setCurrentPage('techtro');
                                }
                            }}
                        >
                            {formatMessage('Site.Techtro.Button', currentLanguage)}
                        </button>
                    </div>
                    <div className='p-3'>
                        <button
                            className='reg-btn'
                            onClick={() => {
                                if(currentPage !== 'techtro') {
                                    setCurrentPage('techtro');
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