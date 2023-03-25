import { render, screen } from '@testing-library/react';
import { BackgroundElements } from '../BackgroundElements';

test('renders nav bar text', () => {
  render(<BackgroundElements />);
  const textElement = screen.getByText(/idk bro/i);
  expect(textElement).toBeInTheDocument();
});