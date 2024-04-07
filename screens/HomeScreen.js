import { StyleSheet, Button, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig.js'; // Import Firebase auth, db
import { collection, getDocs } from '@firebase/firestore';

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

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movies")); // Get movies collection from Firestore
        const moviesData = [];
        querySnapshot.forEach((doc) => {
          moviesData.push(doc.data());
        });
        setMovies(moviesData);
        console.log(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    

    fetchMovies();
  }, []);


  return (
    <View>
      <Text>{likedContent}</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            {/* Add more movie details as needed */}
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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