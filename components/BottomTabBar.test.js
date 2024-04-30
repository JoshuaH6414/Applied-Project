import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import BottomTabBar from './BottomTabBar';

describe('BottomTabBar component', () => {
  const navigation = {
    navigate: jest.fn(),
  };

  it('renders three tab items', () => {
    const { getByText } = render(<BottomTabBar navigation={navigation} />);
    expect(getByText('Bookmarks')).toBeTruthy();
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('User Account')).toBeTruthy();
  });

  it('calls navigation.navigate with the correct screen name when a tab is pressed', () => {
    const { getByText } = render(<BottomTabBar navigation={navigation} />);
    fireEvent.press(getByText('Bookmarks'));
    expect(navigation.navigate).toHaveBeenCalledWith('Bookmarks');

    fireEvent.press(getByText('Home'));
    expect(navigation.navigate).toHaveBeenCalledWith('Home');

    fireEvent.press(getByText('User Account'));
    expect(navigation.navigate).toHaveBeenCalledWith('UserAccount');
  });

  // Additional tests for styling, etc., can be added as needed
});
