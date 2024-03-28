import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase auth

const HomeScreen = ({ navigation }) => {
  const [likedContent] = useState(null);

  const handleSignOut = () => {
    auth.signOut()
        .then(() => {
            console.log('User signed out successfully');
            // Perform any additional actions after sign-out if needed
        })
        .catch((error) => {
            console.error('Error signing out:', error);
        });
  };


  return (
    <View>
      <Text>{likedContent}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <Button title="Go to Movie Details" onPress={() => navigation.navigate('MovieDetails')} />
      <Button title="Like" onPress={() => navigation.navigate('BookmarksScreen')} />
    </View>
  );
  
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  button: {
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
      width: '48%', // Adjust button width as needed
      marginTop: 20, // Add margin to separate from other elements
  },
  buttonText: {
      color: '#fff',
      textAlign: 'center',
  },
});