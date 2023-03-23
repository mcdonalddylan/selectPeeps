import { render, screen } from '@testing-library/react';
import { AddRemoveModal } from '../AddRemoveModal';

test('renders nav bar text', () => {
  render(<AddRemoveModal />);
  const textElement = screen.getByText(/idk bro/i);
  expect(textElement).toBeInTheDocument();
});