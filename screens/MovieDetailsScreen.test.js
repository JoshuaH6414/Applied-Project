import React from 'react';
import { render } from '@testing-library/react-native';
import MovieDetailsScreen from './MovieDetailsScreen';

describe('<MovieDetailsScreen />', () => {
  const mockRoute = {
    params: {
      movie: {
        title: 'Test Movie',
        overview: 'Test overview',
        genres: 'Action, Comedy',
        releaseDate: '2023-01-01',
      },
    },
  };

  test('renders movie details correctly', () => {
    const { getByText } = render(<MovieDetailsScreen route={mockRoute} />);
    expect(getByText('Movie Details')).toBeTruthy();
    expect(getByText('Title:')).toBeTruthy();
    expect(getByText('Test Movie')).toBeTruthy();
    expect(getByText('Description:')).toBeTruthy();
    expect(getByText('Test overview')).toBeTruthy();
    expect(getByText('Genres:')).toBeTruthy();
    expect(getByText('Action, Comedy')).toBeTruthy();
    expect(getByText('Release:')).toBeTruthy();
    expect(getByText('2023-01-01')).toBeTruthy();
  });

  test('renders instructions when movie is null', () => {
    const { getByText } = render(<MovieDetailsScreen route={{ params: { movie: null } }} />);
    expect(getByText('Go Back and Swipe Left or Right on the card to begin!')).toBeTruthy();
  });
});
