import { NavBarHeader } from "../NavBarHeader";
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import { PageDataProvider } from "../PageDataProvider";

jest.mock('axios');

describe('<PageDataProvider />', () => {
    let mockData;

    beforeEach(() => {
        mockData = {}
        axios.get.mockResolvedValue(mockData);
    });

    test('renders nav bar text', () => {
        render(
            <PageDataProvider>
                <div data-testid='providerTest'></div>
            </PageDataProvider>
        );
        const testChildElement = screen.getByTestId(/providerTest/i);
        expect(testChildElement).toBeInTheDocument();
    });
});