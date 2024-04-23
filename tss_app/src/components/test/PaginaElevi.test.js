import React from 'react';
import axios from 'axios';
import { render, waitFor } from '@testing-library/react';
import PaginaElevi from './PaginaElevi.js';

// Mocking the axios module
jest.mock('axios');

describe('PaginaElevi component', () => {
  describe('fetches and displays elevi', () => {
    const mockElevi = [
      { ID: 1, nume: 'John', prenume: 'Doe' },
      { ID: 2, nume: 'Jane', prenume: 'Doe' },
    ];

    beforeEach(() => {
      axios.get.mockResolvedValue({ data: mockElevi });
    });

    it('should fetch and display elevi correctly', async () => {
      // Render PaginaElevi component
      const { getByText } = render(<PaginaElevi />);

      // Wait for component to finish rendering
      await waitFor(() => {
        // Assert that elevi are displayed correctly
        expect(getByText('John')).toBeInTheDocument();
        expect(getByText('Jane')).toBeInTheDocument();
      });
    });

    it('should call the correct API endpoint', async () => {
      render(<PaginaElevi />);

      // Wait for component to make the API request
      await waitFor(() => {
        // Assert that the correct API endpoint is called
        expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/obtineElevi');
      });
    });
  });
});
