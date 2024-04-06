import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import background from '../assets/background/bc2.jpg';

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text === confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (text === password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  };

  const handleSignup = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image 
        style={styles.image}
        source={background}
      />
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handlePasswordChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={handleConfirmPasswordChange}
          />
          <Button
            title="Signup"
            onPress={handleSignup}
            disabled={!passwordsMatch || !email || !password}
          />
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

