import { StoryNameRowContainer } from "../StoryNameRowContainer";
import { render, screen } from '@testing-library/react';

test('renders nav bar text', () => {
    render(<StoryNameRowContainer />);
    const text = screen.getByText(/ayyyy/i);
    expect(text).toBeInTheDocument();
});