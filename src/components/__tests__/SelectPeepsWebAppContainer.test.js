import React from 'react';
import { render, screen } from '@testing-library/react';
import { SelectPeepsWebAppContainer } from '../SelectPeepsWebAppContainer';

test('renders nav bar text', () => {
  render(<SelectPeepsWebAppContainer />);
  const textElement = screen.getByText(/idk bro/i);
  expect(linkElement).toBeInTheDocument();
});
