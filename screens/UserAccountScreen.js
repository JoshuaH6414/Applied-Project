import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig.js'; // Import Firebase auth
import { sendPasswordResetEmail } from 'firebase/auth';

const UserAccountScreen = ({ navigation }) => {

  // Function to handle user sign out
  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out successfully');
        // Perform any additional actions after sign-out if needed
        navigation.navigate('LoginSignup'); // Navigate to login/signup screen
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });

  };
  
  // Function to handle password reset
  const resetPassword = () => {
    const emailAddress = auth.currentUser.email; // Get the current user's email address
  
    sendPasswordResetEmail(auth, emailAddress)
      .then(() => {
        console.log('Password reset email sent successfully');
        // You can navigate to a success screen or display a message to the user
      })
      .catch((error) => {
        console.error('Error sending password reset email:', error);
        // Handle any errors, such as invalid email or network issues
      });
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>Username</Text>
        <Text style={styles.bookmarks}>Bookmarks: 0</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go to Bookmarks" onPress={() => navigation.navigate('Bookmarks')} />
        <Button title="Log out" onPress={handleSignOut} />
        <Button title="Edit Password" onPress={resetPassword} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  banner: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  emptyProfilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  userInfo: {
    marginBottom: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bookmarks: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default UserAccountScreen;
