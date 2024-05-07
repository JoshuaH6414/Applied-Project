import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bookmarks')}>
          <Text style={styles.buttonText}>Go to Bookmarks</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={resetPassword}>
          <Text style={styles.buttonText}>Edit Password</Text>
        </TouchableOpacity>
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
    backgroundColor:"#003426",
  },
  userInfo: {
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"white",
    marginTop:200,
  },
  bookmarks: {
    fontSize: 16,
    color: '#777',
  },
  buttonContainer: {
    width: '60%',
    padding: 10,
  },
  button: {
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UserAccountScreen;
