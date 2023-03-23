import { ReactElement } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import './TeamSelectContainer.scss';

export const TeamSelectContainer = (): ReactElement => {
    const { currentLanguage, selectedTeam, setSelectedTeam } = usePageDataContext();

    return (
        <>
            <div className='team-select-container'>
                <label className='team-select-label' htmlFor='teamsDropdown'>
                        {`${formatMessage('Site.TeamSelect.Team', currentLanguage)}:`}
                </label>
                <select className='team-select-selector' name='teamsDropdown'>
                    <option value='Get Support'>
                        {formatMessage('Site.TeamSelect.Get Support', currentLanguage)}
                    </option>
                    <option value='CSR'>
                        {formatMessage('Site.TeamSelect.CSR', currentLanguage)}
                    </option>
                </select>
                
            </div>
            <div className='team-select-selector-gradient'></div>
        </>
    );
}