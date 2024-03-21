// screens/UserAccountScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const UserAccountScreen = ({ navigation }) => {
  return (
    <View>
      <Text>User Account Screen</Text>
      {/* Display user's account info */}
      <Button title="Go to Bookmarks" onPress={() => navigation.navigate('Bookmarks')} />
      <Button title="Log out" onPress={() => navigation.navigate('LoginSignup')} />
    </View>
  );
}

export default UserAccountScreen;
