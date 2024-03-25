import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [likedContent] = useState(null);

  return (
    <View>
      <Text>{likedContent}</Text>
      
      <Button title="Go to Movie Details" onPress={() => navigation.navigate('MovieDetails')} />
      <Button title="Like" onPress={() => navigation.navigate('BookmarksScreen')} />
    </View>
  );
}

export default HomeScreen;
