import { BottomActionModal } from '../BottomActionModal';
import { render, screen } from '@testing-library/react';

test('renders nav bar text', () => {
    render(<BottomActionModal />);
    const text = screen.getByText(/ayyyy/i);
    expect(text).toBeInTheDocument();
});