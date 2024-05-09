import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import background from '../assets/background/bc2.jpg';
import logo from '../assets/background/logo-no-background.png'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // function to handle user sign up
  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful sign-up
        const user = userCredential.user;
        console.log('User signed up with email:', user.email);
      })
      .catch((error) => {
        // Handle sign-up error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-up error:', errorMessage, ", error code: ", errorCode);
      });
  };

  // Function to handle user sign-in
  const handleSignIn = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        const userId = user.uid;
        // Save the user ID to AsyncStorage
        AsyncStorage.setItem('userId', userId);
        // Create a guest session for the user
        createGuestSession();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Sign-in error:', errorMessage, ", error code: ", errorCode)
    });
  }

  // Create a guest session on IMDb (not implemented at this stage)
  // const createGuestSession = async () => {
  //   try {
  //     const response = await axios.get('https://api.themoviedb.org/3/authentication/guest_session/new', {
  //       headers: {
  //         'Accept': 'application/json',
  //         // Add your API key as a bearer token
  //         'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmZmNTQzMDJkM2VjMTEwMjk3YWRmMjIwZjVlODM2OSIsInN1YiI6IjY2MDAxOWU2MjI2YzU2MDEzMTZlZmMzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QDEM9Uw5n7Es4I_v-3527_7fwTA8QaJflisMVeYNm9g',
  //        'Host': 'api.themoviedb.org',
  //       }
  //     });

  //     const guestSessionId = response.data.guest_session_id;
  //     // Store the guest session ID locally
  //     await AsyncStorage.setItem('guestSessionId', guestSessionId);
  //     console.log('Guest session created:', guestSessionId);
  //   } catch (error) {
  //     console.error('Error creating guest session:', error);
  //   }
  // }

  return (
    <View style={styles.container}>
      <Image 
        style={[styles.image, styles.backgroundImage]}
        source={background}
      />
      <View style={[styles.overlay]}>
        <View style={styles.logoContainer}>
          <Image 
            style={styles.logo}
            source={logo}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}></Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#000"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleSignIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const buttonStyles = {
  backgroundColor: '#007bff',
  width: 100,
  borderRadius: 10,
  paddingVertical: 6,
  paddingHorizontal: 10,
  marginTop: 15,
  marginBottom: 1,
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

  backgroundImage: {
    resizeMode: 'cover',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)', 
    justifyContent: 'center',
    alignItems: 'center',   
  },

  logoContainer: {
    position: 'absolute',
    top: '15%',
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },

  formContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },

  input: {
    width: '100%',
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },

  button: buttonStyles,

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

});

export default LoginScreen;
