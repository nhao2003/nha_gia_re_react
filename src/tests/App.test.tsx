import { render, screen } from '@testing-library/react';
<<<<<<< HEAD
import App from '../templates/classic/index.';
=======
import App from '../templates/classic/ClassicApp';
>>>>>>> 1997bbf5d267d23378b80669dad348c39a3da15b

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
