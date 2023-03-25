import { render, screen } from '@testing-library/react';
import { AddNameDataButton } from '../AddNameDataButton';

test('renders button text', () => {
  render(<AddNameDataButton />);
  const textElement = screen.getByText(/idk bro/i);
  expect(textElement).toBeInTheDocument();
});