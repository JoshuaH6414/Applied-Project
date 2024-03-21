// screens/LoginSignupScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginSignupScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Login/Signup Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Home')} />
      <Button title="Signup" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

export default LoginSignupScreen;
