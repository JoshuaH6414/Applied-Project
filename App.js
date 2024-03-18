// Code for the temporary login screen just to check if the app is loading 

import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// test
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>User Login</Text>
        <StatusBar style="auto" />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aa1"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aa1"
          secureTextEntry={true} // Hides the text entered while its being entered
        />
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    backgroundColor: '#333', 
    padding: 20,
    borderRadius: 30,
    width: '80%',
  },
  loginText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: '#fff',
  },
  loginButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
