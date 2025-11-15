import { render, screen } from '@testing-library/react';
import App from './App';

test('renders atmospheric brilliance headline', () => {
  render(<App />);
  const heroTitle = screen.getByRole('heading', { name: /Atmospheric Brilliance/i });
  expect(heroTitle).toBeInTheDocument();
});
