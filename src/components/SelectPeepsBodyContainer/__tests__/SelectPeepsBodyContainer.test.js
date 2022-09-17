import { SelectPeepsBodyContainer } from '../SelectPeepsBodyContainer';
import { render, screen } from '@testing-library/react';

test('renders nav bar text', () => {
    render(<SelectPeepsBodyContainer />);
    const text = screen.getByText(/ayyyy/i);
    expect(text).toBeInTheDocument();
});