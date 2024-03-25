import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import homeIcon from './assets/BottomBar/Home.png';
import bookmarksIcon from './assets/BottomBar/Bookmark.png';
import userAccountIcon from './assets/BottomBar/User.png';

import LoginSignupScreen from './screens/LoginSignupScreen';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import UserAccountScreen from './screens/UserAccountScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator // Check this area to change the background colour to black
      tabBarOptions= {{
        style: {
          backgroundColor: "black"
        },
      }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={homeIcon}
              style={{ width: 24, height: 24, tintColor: focused ? 'black' : 'gray' }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Bookmarks" 
        component={BookmarksScreen} 
        options={{
          tabBarLabel: 'Bookmarks',
          tabBarIcon: ({ focused }) => (
            <Image
              source={bookmarksIcon}
              style={{ width: 24, height: 24, tintColor: focused ? 'black' : 'gray' }}
            />
          ),
        }}
      />
      <Tab.Screen 
        name="UserAccount" 
        component={UserAccountScreen} 
        options={{
          tabBarLabel: 'User Account',
          tabBarIcon: ({ focused }) => (
            <Image
              source={userAccountIcon}
              style={{ width: 24, height: 24, tintColor: focused ? 'black' : 'gray' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LoginSignup"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "black"},
          headerTitleStyle: {fontWeight: "bold"},
        }}>
        <Stack.Screen name="LoginSignup" component={LoginSignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'FlixTok', headerShown: false }} />
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} options={{ title: 'Movie Details' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
