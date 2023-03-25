import { render, screen } from '@testing-library/react';
import { PointingDataContainer } from '../PointingDataContainer';

test('renders pointing data container text', () => {
    render(<PointingDataContainer />);
    const text = screen.getByText(/ayyyy/i);
    expect(text).toBeInTheDocument();
});