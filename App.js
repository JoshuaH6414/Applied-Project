// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginSignupScreen from './screens/LoginSignupScreen';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import UserAccountScreen from './screens/UserAccountScreen';
import SignUpScreen from './screens/SignUpScreen';
import BottomTabBar from './components/BottomTabBar';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen name="UserAccount" component={UserAccountScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginSignup">
        <Stack.Screen name="LoginSignup" component={LoginSignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'FlixTok' }} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen name="Bookmarks" component={BookmarksScreen} options={{ title: 'Bookmarks' }} />
        <Stack.Screen name="UserAccount" component={UserAccountScreen} options={{ title: 'User Account' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
