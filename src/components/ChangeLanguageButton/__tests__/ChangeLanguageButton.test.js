import { ChangeLanguageButton } from '../ChangeLanguageButton';
import { render, screen } from '@testing-library/react';

test('renders nav bar text', () => {
    render(<ChangeLanguageButton />);
    const text = screen.getByText(/Change Language/i);
    expect(text).toBeInTheDocument();
});