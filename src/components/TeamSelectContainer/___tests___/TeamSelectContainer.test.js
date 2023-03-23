import { TeamSelectContainer } from '../TeamSelectContainer';
import { render, screen } from '@testing-library/react';

test('renders nav bar text', () => {
    render(<TeamSelectContainer />);
    const text = screen.getByText(/ayyyy/i);
    expect(text).toBeInTheDocument();
});