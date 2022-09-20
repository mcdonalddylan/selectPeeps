import { SelectPeepsBodyContainer } from '../SelectPeepsBodyContainer';
import { render, screen } from '@testing-library/react';
import * as getPageDataContext from '../../../context/PageDataProvider/PageDataProvider';

describe('<SelectPeepsBodyContainer />', () => {
    let pageDataContextValues,
        currentPage,
        setCurrentPage,
        isLightOn,
        setIsLightOn,
        currentLanguage,
        setCurrentLanguage,
        isLoadingRetro,
        setIsLoadingRetro,
        retroData,
        setRetroData,
        hasErrorRetro,
        setHasErrorRetro,
        isLoadingTechtro,
        setIsLoadingTechtro,
        techtroData,
        setTechtroData,
        hasErrorTechtro,
        setHasErrorTechtro;

    beforeEach(() => {
        currentPage = 'retro';
        setCurrentPage = () => {};
        isLightOn = false;
        setIsLightOn = () => {};
        currentLanguage = 'en';
        setCurrentLanguage = () => {};
        isLoadingRetro = false;
        setIsLoadingRetro = () => {};
        retroData = null;
        setRetroData = () => {};
        hasErrorRetro = false;
        setHasErrorRetro = () => {};
        isLoadingTechtro = false;
        setIsLoadingTechtro= () => {};
        techtroData = null;
        setTechtroData = () => {};
        hasErrorTechtro = false;
        setHasErrorTechtro = () => {};

        pageDataContextValues = {
            currentPage,
            setCurrentPage,
            isLightOn,
            setIsLightOn,
            currentLanguage,
            setCurrentLanguage,
            isLoadingRetro,
            setIsLoadingRetro,
            retroData,
            setRetroData,
            hasErrorRetro,
            setHasErrorRetro,
            isLoadingTechtro,
            setIsLoadingTechtro,
            techtroData,
            setTechtroData,
            hasErrorTechtro,
            setHasErrorTechtro
        };
        jest.spyOn(getPageDataContext, 'usePageDataContext').mockImplementation(() => pageDataContextValues);
    });

    test('renders nav bar text', () => {
        render(<SelectPeepsBodyContainer />);
        const text = screen.getByText(/Techtro/i);
        expect(text).toBeInTheDocument();
    });
});
