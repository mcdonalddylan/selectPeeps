import { ReactElement, useState, useContext, createContext, useEffect } from 'react';
import axios from 'axios';
import { TSupportLanguages } from '../../types/translationTypes';
import { TAvailablePages } from '../../types/pageTypes';

interface IPageDataProviderContext {
    currentPage: TAvailablePages;
    setCurrentPage: Function;
    isLightOn: boolean;
    setIsLightOn: Function;
    shouldShowBottomAction: boolean;
    setShouldShowBottomAction: Function;
    shouldShowAddRemove: boolean;
    setShouldShowAddRemove: Function;
    getListOfNamesData: Function;
    postListOfNames: Function;
    currentLanguage: TSupportLanguages;
    changeCurrentLanguage: Function;
    isLoadingNames: boolean;
    setIsLoadingNames: Function;
    nameData: any;
    setNameData: Function;
    hasErrorNames: boolean;
    setHasErrorNames: Function;
}

interface IPageDataProviderProps {
    children: ReactElement;
}

const PageDataContext = createContext({} as IPageDataProviderContext);

export const usePageDataContext = () => useContext(PageDataContext);

export const PageDataProvider = ({children}: IPageDataProviderProps): ReactElement => {

    const [currentPage, setCurrentPage] = useState<TAvailablePages>('retro');
    const [isLightOn, setIsLightOn] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState<TSupportLanguages>('en');
    const [shouldShowBottomAction, setShouldShowBottomAction] = useState(true);
    const [shouldShowAddRemove, setShouldShowAddRemove] = useState(false);

    const changeCurrentLanguage = (language: TSupportLanguages) => {
        switch(language){
            case 'en':
                setCurrentLanguage('hi');
                break;
            case 'hi':
                setCurrentLanguage('es');
                break;
            case 'es':
                setCurrentLanguage('cn');
                break;
            case 'cn':
                setCurrentLanguage('al');
                break;
            case 'al':
                setCurrentLanguage('en');
                break;
            default:
                setCurrentLanguage('en');
                break;
        }
    }

    const [isLoadingNames, setIsLoadingNames] = useState(false);
    const [nameData, setNameData] = useState(false);
    const [hasErrorNames, setHasErrorNames] = useState(false);

    const getListOfNamesData = () => {
        setIsLoadingNames(true);
        axios.get('https://sheet.best/api/sheets/db460ff5-abcb-4b38-89f1-acf4639bb2b6')
        .then((response: any) => {
            setIsLoadingNames(false);
            setNameData(response.data);
            console.log('name data: ', response.data);
        })
        .catch((errorResponse: any) => {
            console.error(errorResponse);
            setIsLoadingNames(false);
            setHasErrorNames(true);
        })
    };

    useEffect(() => {
        if (!isLoadingNames && !hasErrorNames && !nameData) {
            getListOfNamesData();
        }
    }, [nameData]);

    const postListOfNames = (data: any) => {
        setIsLoadingNames(true);
        axios.post('https://sheet.best/api/sheets/db460ff5-abcb-4b38-89f1-acf4639bb2b6', data)
        .then((response: any) => {
            setIsLoadingNames(false);
            setNameData(response.data);
            console.log('name data: ', response.data);
        })
        .catch((errorResponse: any) => {
            console.error(errorResponse);
            setIsLoadingNames(false);
            setHasErrorNames(true);
        })
    };

    return (
        <PageDataContext.Provider
            value={{
                currentPage,
                setCurrentPage,
                isLightOn,
                setIsLightOn,
                shouldShowBottomAction,
                setShouldShowBottomAction,
                shouldShowAddRemove,
                setShouldShowAddRemove,
                getListOfNamesData,
                postListOfNames,
                currentLanguage,
                changeCurrentLanguage,
                isLoadingNames,
                setIsLoadingNames,
                nameData,
                setNameData,
                hasErrorNames,
                setHasErrorNames
            }}
        >
            {children}
        </PageDataContext.Provider>
        
    )
}