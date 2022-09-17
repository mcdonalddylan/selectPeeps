import { NameOnList } from '../NameOnList';
import { render, screen } from '@testing-library/react';

test('renders nav bar text', () => {
    render(<NameOnList />);
    const text = screen.getByText(/ayyyy/i);
    expect(text).toBeInTheDocument();
});