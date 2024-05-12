import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import background from '../assets/background/bc2.jpg';

const SignupScreen = ({ navigation }) => {

  // State variables to manage form inputs and password match status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handlePasswordChange = (text) => {
    setPassword(text);
    // Check if entered password matches the confirmation password
    if (text === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  // Function to handle confirmation password input change
  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    // Check if entered confirmation password matches the password
    if (text === password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

   // Function to handle signup button press
  const handleSignup = () => {
    navigation.navigate('Home');  // Navigate to Home screen
  };

  return (
    <View style={styles.container}>
      <Image 
        style={styles.image}
        source={background} // Background image
      />
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign Up</Text>
          {/* Email input */}
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
          />
          {/* Password input */}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handlePasswordChange}
          />
           {/* Confirm password input */}
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={handleConfirmPasswordChange}
          />
           {/* Signup button */}
          <Button
            title="Signup"
            onPress={handleSignup}
            disabled={!passwordsMatch || !email || !password}
          />
           {/* Back to login button */}
          <Button
            title="Back to Login"
            onPress={() => navigation.goBack()}
            color="#1a9"
          />
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,1)', 
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff',
  },

  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  
});

export default SignupScreen;

