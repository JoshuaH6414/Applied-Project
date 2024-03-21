// screens/MovieDetailsScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const MovieDetailsScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Movie Details Screen</Text>
      {/* Display movie details */}
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

export default MovieDetailsScreen;
