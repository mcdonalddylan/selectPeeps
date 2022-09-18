import { NavBarHeader } from "../NavBarHeader";
import { render, screen } from '@testing-library/react';

test('renders nav bar text', () => {
    render(<NavBarHeader />);
    const text = screen.getByText(/ayyyy/i);
    expect(text).toBeInTheDocument();
});