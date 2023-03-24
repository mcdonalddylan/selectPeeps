import { ReactElement, useEffect } from 'react';
import { usePageDataContext } from '../../context/PageDataProvider/PageDataProvider';
import { formatMessage } from '../../utils/translationUtils/translationUtils';
import './TeamSelectContainer.scss';

export const TeamSelectContainer = (): ReactElement => {
    const { currentLanguage, selectedTeam, setSelectedTeam } = usePageDataContext();

    const setSelectElement = (element: any, optionValToSelect: string) => {
        const optionElements = element?.options;
        let currentSelectedIndex = 0;
        for (let i = 0; i < optionElements.length; i++) {
            if(optionElements[i]?.value === optionValToSelect){
                currentSelectedIndex = i;
                break;
            }
        }
        element.selectedIndex = currentSelectedIndex;
    };

    useEffect(() => {
        const teamsDropDown = document.getElementById('teamsDropdown');
        setSelectElement(teamsDropDown, selectedTeam);
    }, [selectedTeam]);

    const handleOnSelectTeam = (e: any) => {
        setSelectedTeam(e.target.value);
        localStorage.setItem('teamPreference', e.target.value);
    }

    return (
        <>
            <div className='team-select-container'>
                <label className='team-select-label' htmlFor='teamsDropdown'>
                        {`${formatMessage('Site.TeamSelect.Team', currentLanguage)}:`}
                </label>
                <select id='teamsDropdown' className='team-select-selector' name='teamsDropdown' onChange={handleOnSelectTeam}>
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