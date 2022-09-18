import { ReactElement, useState, useContext, createContext } from 'react';

interface IPageDataProviderContext {
    currentPage: string;
    setCurrentPage: Function;
}

interface IPageDataProviderProps {
    children: ReactElement;
}

//export PageDataContext = createContext({})

export const PageDataProvider = ({children}: IPageDataProviderProps): ReactElement => {

    const [currentPage, setCurrentPage] = useState('retro');

    return (
        <>
            {children}
        </>
        
    )
}