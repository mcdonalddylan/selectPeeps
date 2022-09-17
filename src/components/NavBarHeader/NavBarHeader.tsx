import { ReactElement } from 'react';
import './NavBarHeader.scss';
import logo from '../../assets/logo.svg';
import bulb from '../../assets/light-bulb.svg';

export const NavBarHeader = (): ReactElement => {

    return (
        <div className='nav-container'>
            <div className='bg-logo-container'>
                <img src={logo} className='bg-logo' alt='bg-logo' />
            </div>
            <div className='nav-relative-container'>
                <div className='nav-container-gradient'></div>
            </div>
            <div className='nav-button-container container'>
                <div className='d-flex align-items-center'>
                    <div className='p-3'>
                        <button className='reg-btn'>
                            Techtro
                        </button>
                    </div>
                    <div className='p-3'>
                        <button className='reg-btn'>
                            Weekly Retro
                        </button>
                    </div>
                    <div className='p-3'>
                        <button className='theme-btn'>
                            <img src={bulb} alt='change-dark-light' className='bulb-img'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};