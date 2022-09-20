import { ReactElement } from "react";
import { usePageDataContext } from "../../context/PageDataProvider/PageDataProvider";
import { formatMessage } from "../../utils/translationUtils/translationUtils";
import './ChangeLanguageButton.scss';

export const ChangeLanguageButton = (): ReactElement => {
    const { currentLanguage, changeCurrentLanguage } = usePageDataContext();

    return (
        <div className='language-button-container'>
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