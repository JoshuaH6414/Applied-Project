import React from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.image}
        source={{uri: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
      />
      <View style={styles.overlay}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>FlixTok</Text>
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Email"
            placeholderTextColor="#000"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={[styles.input, styles.inputText]}
            placeholder="Password"
            placeholderTextColor="#000"
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
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
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    
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
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  inputText: {
    color: '#000',
  },
  button: {
    backgroundColor: '#007bff',
    width: 100,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginTop: 15,
    marginBottom: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;
