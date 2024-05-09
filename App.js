import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { auth } from './firebaseConfig'; // Import Firebase initialization
import homeIcon from './assets/BottomBar/Home.png';
import bookmarksIcon from './assets/BottomBar/Bookmark.png';
import userAccountIcon from './assets/BottomBar/User.png';


//test
import LoginSignupScreen from './screens/LoginSignupScreen';
import HomeScreen from './screens/HomeScreen';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import BookmarksScreen from './components/BookmarksScreenComponent';
import UserAccountScreen from './screens/UserAccountScreen';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {backgroundColor: 'black'}, 
        tabBarActiveTintColor:'black',
        tabBarInactiveTintColor: 'white',

      }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={homeIcon}
              style={{ width: 28, height: 28, tintColor: focused ? 'white' : 'gray' }}
            />
          ),
        }}
      />

      <Tab.Screen 
        name="Bookmarks" 
        component={BookmarksScreen} 
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={bookmarksIcon}
              style={{ width: 28, height: 28, tintColor: focused ? 'white' : 'gray' }}
            />
          ),
        }}
      />

      <Tab.Screen 
        name="UserAccount" 
        component={UserAccountScreen} 
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image
              source={userAccountIcon}
              style={{ width: 28, height: 28, tintColor: focused ? 'white' : 'gray' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe; // Cleanup function to unsubscribe from the auth state observer
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="LoginSignup"
        screenOptions={{
          headerTintColor: "white",
          headerStyle: { backgroundColor: "black"},
          headerTitleStyle: {fontWeight: "bold"},
        }}>
          {user ? (
            <>
              <Stack.Screen name="HomeScreen" component={HomeTabs} options={{ title: 'FlixTok', headerShown: false }} />
              <Stack.Screen name="MovieDetailsScreen"  component={MovieDetailsScreen} options={{ title: 'Movie Details', headerShown: false}} />
            </>

        ) : (
          <Stack.Screen name="LoginSignup" component={LoginSignupScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
