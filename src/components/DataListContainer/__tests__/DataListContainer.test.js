import { DataListContainer } from '../DataListContainer';
import { render, screen } from '@testing-library/react';

test('renders nav bar text', () => {
    render(<DataListContainer />);
    const text = screen.getByText(/ayyyy/i);
    expect(text).toBeInTheDocument();
});