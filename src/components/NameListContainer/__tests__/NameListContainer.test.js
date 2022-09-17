import { NameListContainer } from '../NameListContainer';
import { render, screen } from '@testing-library/react';

test('renders nav bar text', () => {
    render(<NameListContainer />);
    const text = screen.getByText(/ayyyy/i);
    expect(text).toBeInTheDocument();
});