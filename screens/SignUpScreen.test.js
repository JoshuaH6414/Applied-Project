import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignupScreen from './SignupScreen';

describe('SignupScreen', () => {
  it('renders input fields and buttons', () => {
    const { getByPlaceholderText, getByText } = render(<SignupScreen />);

    // Check if email, password, and confirm password input fields are rendered
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();

    // Check if Signup and Back to Login buttons are rendered
    expect(getByText('Signup')).toBeTruthy();
    expect(getByText('Back to Login')).toBeTruthy();
  });
});