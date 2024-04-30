import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import UserAccountScreen from './UserAccountScreen';
import { auth } from '../firebaseConfig.js';

// Mocking firebase auth methods
jest.mock('../firebaseConfig.js', () => ({
  auth: {
    currentUser: {
      email: 'test@example.com',
    },
    signOut: jest.fn(() => Promise.resolve()),
  },
}));

// Mocking firebase password reset method
jest.mock('firebase/auth', () => ({
  sendPasswordResetEmail: jest.fn(() => Promise.resolve()),
}));

describe('<UserAccountScreen />', () => {
  test('renders correctly', () => {
    const { getByText } = render(<UserAccountScreen />);
    expect(getByText('Username')).toBeTruthy();
    expect(getByText('Bookmarks: 0')).toBeTruthy();
  });

  test('clicking "Log out" button calls handleSignOut function', async () => {
    const { getByText } = render(<UserAccountScreen />);
    const logoutButton = getByText('Log out');
    fireEvent.press(logoutButton);
    expect(auth.signOut).toHaveBeenCalled();
  });

  test('clicking "Edit Password" button calls resetPassword function', async () => {
    const { getByText } = render(<UserAccountScreen />);
    const editPasswordButton = getByText('Edit Password');
    fireEvent.press(editPasswordButton);
    expect(auth.currentUser.email).toBe('test@example.com');
    expect(require('firebase/auth').sendPasswordResetEmail).toHaveBeenCalled();
  });
});
