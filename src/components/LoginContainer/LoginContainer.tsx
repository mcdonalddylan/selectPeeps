import { ReactElement, SyntheticEvent, useEffect } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import { PointingDataContainer } from '../PointingDataContainer/PointingDataContainer';
import './LoginContainer.scss';

interface ILoginContainerProps {
    sortDataByTeam: Function;
    sortDataByDate: Function;
};

export const LoginContainer = ({ sortDataByTeam, sortDataByDate }: ILoginContainerProps): ReactElement => {
    const { currentLanguage, currentPage, loggedInUsername, setLoggedInUsername } = usePageDataContext();

    const handleLoginSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newLoginText: string = e.currentTarget['loginUsername'].value;
        if (newLoginText?.length > 0 && newLoginText?.length <= 20) {
            setLoggedInUsername(newLoginText);
            localStorage.setItem('username', newLoginText);
        }
    };

    const handleLogout = () => {
        setLoggedInUsername(null);
        localStorage.removeItem('username');
    };

    useEffect(() => {
        if (!loggedInUsername && currentPage === 'pointing') {
            const loginInputElement = document.getElementsByName('loginUsername');
            if (loginInputElement) {
                loginInputElement[0]?.focus();
            }
        }
    }, [currentPage, loggedInUsername]);

    return (
        <>
            {!loggedInUsername &&
                <div className='d-flex login-container'>
                    <form onSubmit={handleLoginSubmit}>
                        <input
                            type='text'
                            name='loginUsername'
                            placeholder={formatMessage('Site.Login.Placeholder', currentLanguage)}
                            className='login-input'
                        >
                        </input>
                        <button type='submit' className='login-btn'>
                            {formatMessage('Site.Login.Button', currentLanguage)}
                        </button>
                    </form>
                </div>
            }
            {loggedInUsername &&
                <>
                    <div className='d-flex justify-content-center align-items-center logged-in-container'>
                        <p className='p-6 welcome-text'>
                            {`${formatMessage('Site.Login.Welcome', currentLanguage)} ${loggedInUsername}`}
                        </p>
                        <button onClick={handleLogout} className='p-3 ms-auto logout-btn'>
                            {formatMessage('Site.Logout.Button', currentLanguage)}
                        </button>
                    </div>
                    <PointingDataContainer
                        sortDataByTeam={sortDataByTeam}
                        sortDataByDate={sortDataByDate}
                    />
                </>
            }
        </>
    );
};