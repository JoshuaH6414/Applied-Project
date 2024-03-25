// components/BottomTabBar.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BottomTabBar = ({ navigation }) => {
  const navigateTo = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigateTo('Bookmarks')}>
        <Text>Bookmarks</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigateTo('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tabItem} onPress={() => navigateTo('UserAccount')}>
        <Text>User Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: 50,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
});

export default BottomTabBar;
