import { render, screen } from '@testing-library/react';
import { AddRemovePeopleModal } from '../AddRemovePeopleModal';

test('renders nav bar text', () => {
  render(<AddRemovePeopleModal />);
  const textElement = screen.getByText(/idk bro/i);
  expect(textElement).toBeInTheDocument();
});