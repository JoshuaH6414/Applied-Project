// screens/BookmarksScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const BookmarksScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Bookmarks Screen lol</Text>
      {/* Display bookmarked movies */}
      <Button title="Go to Movie Details" onPress={() => navigation.navigate('MovieDetails')} />
    </View>
  );
}

export default BookmarksScreen;
