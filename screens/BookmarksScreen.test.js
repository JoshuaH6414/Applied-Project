// Import necessary dependencies for testing
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import BookmarksScreen from './BookmarksScreen';
import { collection, getDocs } from 'firebase/firestore'; // Mock Firestore methods

// Mock Firebase configuration
jest.mock('../firebaseConfig', () => ({
  db: jest.fn(),
}));

// Mock getDocs method from Firestore
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
}));

describe('BookmarksScreen', () => {
  it('renders "No movies liked yet." when there are no liked movies', async () => {
    // Mock empty data returned from Firestore
    getDocs.mockResolvedValueOnce({ forEach: jest.fn() });

    // Render BookmarksScreen component
    const { getByText } = render(<BookmarksScreen />);

    // Wait for the component to render
    await waitFor(() => getByText('No movies liked yet.'));

    // Assert that the empty message is rendered
    expect(getByText('No movies liked yet.')).toBeTruthy();
  });

  // You can write more tests to cover other scenarios
});
