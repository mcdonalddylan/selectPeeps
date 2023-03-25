import { ReactElement } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import logo from '../../assets/logo.svg';
import './BackgroundElements.scss';

export const BackgroundElements = (): ReactElement => {
    const { isLightOn} = usePageDataContext();
        
    return (
        <>
            <div className={isLightOn ? 'select-container-bg-light' : 'select-container-bg-dark'}></div>
            <div className='bg-logo-container'>
                <img src={logo} className='bg-logo' alt='bg-logo' />
            </div>
        </>
    );
};