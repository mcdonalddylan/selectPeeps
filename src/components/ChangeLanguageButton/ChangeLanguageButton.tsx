import { ReactElement } from "react";
import { usePageDataContext } from "../../context/PageDataProvider/PageDataProvider";
import { formatMessage } from "../../utils/translationUtils/translationUtils";
import bulb from '../../assets/light-bulb.svg';
import './ChangeLanguageButton.scss';

export const ChangeLanguageButton = (): ReactElement => {
    const { isLightOn, setIsLightOn, currentLanguage, changeCurrentLanguage } = usePageDataContext();

    return (
        <div className='language-button-container'>
            <button
                className={`${isLightOn ? 'theme-btn-light' : 'theme-btn'}`}
                onClick={() => {
                    setIsLightOn(!isLightOn);
                    localStorage.setItem('lightOnPreference', `${!isLightOn}`);
                }}
            >
                <img src={bulb} alt='change-dark-light' className='bulb-img'/>
            </button>
            <button
                className='language-button'
                onClick={() => {
                    changeCurrentLanguage(currentLanguage);
                }}
            >
                {formatMessage('Site.Language.Button', currentLanguage)}
            </button>
        </div>
    );
}