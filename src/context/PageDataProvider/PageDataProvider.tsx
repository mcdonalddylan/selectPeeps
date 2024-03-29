import { ReactElement, useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { TSupportLanguages } from '../../types/translationTypes';
import { TAvailablePages, TAvailableTeams } from '../../types/pageTypes';

import localRetroMemberData from '../../testSetup/retroMemberDataExample.json';
import localTechtroMemberData from '../../testSetup/techtroMemberDataExample.json';
import localPointingData from '../../testSetup/pointingDataExample.json';
import { isUsernameInSelectedStory } from '../../utils/pointingUtils/pointingUtils';

interface IPageDataProviderContext {
    currentPage: TAvailablePages;
    setCurrentPage: Function;
    isLightOn: boolean;
    isLocalEnvironment: boolean;
    setIsLightOn: Function;
    shouldShowBottomAction: boolean;
    selectedTeam: TAvailableTeams;
    setSelectedTeam: Function;
    setShouldShowBottomAction: Function;
    loggedInUsername: string | null;
    setLoggedInUsername: Function;
    shouldShowAddRemove: boolean;
    setShouldShowAddRemove: Function;
    currentLanguage: TSupportLanguages;
    changeCurrentLanguage: Function;
    isLoadingData: boolean;
    setIsLoadingData: Function;
    hasDataError: boolean;
    setHasDataError: Function;
    getRetroMemberData: Function;
    updateRetroMemberData: Function;
    getTechtroMemberData: Function;
    updateTechtroMemberData: Function;
    getPointingData: Function;
    updatePointingData: Function;
    isRandomizing: boolean;
    setIsRandomizing: Function;
    nameData: any | null;
    setNameData: Function;
    pointData: any | null;
    isAdmin: boolean;
    setPointData: Function;
    selectedStoryData: any;
    setSelectedStoryData: Function;
    isLoggedInMemberInSelectedStory: boolean;
    setIsLoggedInMemberInSelectedStory: Function;
    hasRevealedPoints: boolean;
    setHasRevealedPoints: Function;
}

interface IPageDataProviderProps {
    children: ReactElement;
}

const PageDataContext = createContext({} as IPageDataProviderContext);

export const usePageDataContext = () => useContext(PageDataContext);

export const PageDataProvider = ({children}: IPageDataProviderProps): ReactElement => {

    const isLocalEnvironment = process.env.REACT_APP_ENV === 'production' ? false : true;
    useEffect(() => {
        if (isLocalEnvironment) {
            console.log('**is local env?: ', isLocalEnvironment);
        };
    }, []);
    
    const [currentPage, setCurrentPage] = useState<TAvailablePages>(localStorage.getItem('pagePreference') ? localStorage.getItem('pagePreference') as TAvailablePages: 'retro');
    const [selectedTeam, setSelectedTeam] = useState<TAvailableTeams>(localStorage.getItem('teamPreference') ? localStorage.getItem('teamPreference') as TAvailableTeams : 'Get Support');
    const [isLightOn, setIsLightOn] = useState<boolean>(localStorage.getItem('lightOnPreference') ? localStorage.getItem('lightOnPreference') === 'true' : false);
    const [currentLanguage, setCurrentLanguage] = useState<TSupportLanguages>(localStorage.getItem('languagePreference') ? localStorage.getItem('languagePreference') as TSupportLanguages : 'en');
    const [shouldShowBottomAction, setShouldShowBottomAction] = useState<boolean>(true);
    const [shouldShowAddRemove, setShouldShowAddRemove] = useState<boolean>(false);
    const [isRandomizing, setIsRandomizing] = useState<boolean>(false);
    const [hasRevealedPoints, setHasRevealedPoints] = useState<boolean>(false);
    const [nameData, setNameData] = useState<any[] | null>(null);
    const [pointData, setPointData] = useState<any[] | null>(null);
    const [selectedStoryData, setSelectedStoryData] = useState<any>(pointData ? pointData[0]: {});
    const [loggedInUsername, setLoggedInUsername] = useState<string | null>(localStorage.getItem('username'));
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoggedInMemberInSelectedStory, setIsLoggedInMemberInSelectedStory] = useState<boolean>(isUsernameInSelectedStory(selectedStoryData, loggedInUsername));

    const determineIfAdmin = (): boolean => {
        if (loggedInUsername?.toLocaleLowerCase().includes('jody') ||
            loggedInUsername?.toLocaleLowerCase().includes('brad') ||
            loggedInUsername?.toLocaleLowerCase().includes('nandish') ||
            loggedInUsername?.toLocaleLowerCase().includes('shone') ||
            loggedInUsername?.toLocaleLowerCase().includes('admin') ||
            loggedInUsername?.toLocaleLowerCase().includes('cool')) {
                return true;
            } else {
                return false;
            }
    };

    useEffect(() => {
        if (isLocalEnvironment) {
            console.log('current page is: ', currentPage);
        };
    }, [currentPage]);

    useEffect(() => {
        if (isLocalEnvironment) {
            console.log('current selected team is: ', selectedTeam);
        };
    }, [selectedTeam]);

    useEffect(() => {
        if (determineIfAdmin() ) {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        } 
    }, [loggedInUsername]);

    const changeCurrentLanguage = (language: TSupportLanguages) => {
        switch(language){
            case 'en':
                setCurrentLanguage('hi');
                localStorage.setItem('languagePreference', 'hi');
                break;
            case 'hi':
                setCurrentLanguage('es');
                localStorage.setItem('languagePreference', 'es');
                break;
            case 'es':
                setCurrentLanguage('cn');
                localStorage.setItem('languagePreference', 'cn');
                break;
            case 'cn':
                setCurrentLanguage('al');
                localStorage.setItem('languagePreference', 'al');
                break;
            case 'al':
                setCurrentLanguage('en');
                localStorage.setItem('languagePreference', 'en');
                break;
            default:
                setCurrentLanguage('en');
                localStorage.setItem('languagePreference', 'en');
                break;
        }
    }

    const [isLoadingData, setIsLoadingData] = useState(false);
    const [hasDataError, setHasDataError] = useState(false);

    const getRetroMemberData = () => {
        if (isLocalEnvironment) {
            return localRetroMemberData;
        } else {
            // Get list of retro member data
        }
    };

    const updateRetroMemberData = (updatedRetrooData: any) => {
        // Update list of retro member data
    };

    const getTechtroMemberData = () => {
        if (isLocalEnvironment) {
            return localTechtroMemberData;
        } else {
            // Get list of techtro member data 
        }
    };

    const updateTechtroMemberData = (updatedTechtroData: any) => {
        // Update list of techtro member data
    };

    const getPointingData = () => {
        if (isLocalEnvironment) {
            return localPointingData;
        } else {
            // Get pointing data
        }
    }

    const updatePointingData = () => {
        // Update pointing data
    }

    return (
        <PageDataContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                isLightOn,
                setIsLightOn,
                isLocalEnvironment,
                shouldShowBottomAction,
                setShouldShowBottomAction,
                selectedTeam,
                setSelectedTeam,
                shouldShowAddRemove,
                setShouldShowAddRemove,
                loggedInUsername,
                setLoggedInUsername,
                currentLanguage,
                changeCurrentLanguage,
                isLoadingData,
                setIsLoadingData,
                hasDataError,
                setHasDataError,
                getRetroMemberData,
                updateRetroMemberData,
                getTechtroMemberData,
                updateTechtroMemberData,
                getPointingData,
                updatePointingData,
                isRandomizing,
                setIsRandomizing,
                isAdmin,
                nameData,
                setNameData,
                pointData,
                setPointData,
                selectedStoryData,
                setSelectedStoryData,
                isLoggedInMemberInSelectedStory,
                setIsLoggedInMemberInSelectedStory,
                hasRevealedPoints,
                setHasRevealedPoints
            }}
        >
            {children}
        </PageDataContext.Provider>
    )
}