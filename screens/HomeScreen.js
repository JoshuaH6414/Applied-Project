// screens/HomeScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Home Screen</Text>
      {/* Movie cards with scrolling functionality */}
      <Button title="Go to Movie Details" onPress={() => navigation.navigate('MovieDetails')} />
    </View>
  );
}

export default HomeScreen;
