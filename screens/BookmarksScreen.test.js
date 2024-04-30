import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import BookmarksScreen from './BookmarksScreen';
import { collection, getDocs } from 'firebase/firestore'; 

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
    
    getDocs.mockResolvedValueOnce({ forEach: jest.fn() });
    const { getByText } = render(<BookmarksScreen />);

 
    await waitFor(() => getByText('No movies liked yet.'));
    expect(getByText('No movies liked yet.')).toBeTruthy();
  });


});
