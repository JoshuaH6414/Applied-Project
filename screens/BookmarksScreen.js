// Import the necessary dependencies
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase configuration

const BookmarksScreen = () => {
  const [likedMovies, setLikedMovies] = useState([]);

  // Function to fetch liked movies from the database
  const fetchLikedMovies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'likedMovies'));
      const moviesData = [];
      querySnapshot.forEach((doc) => {
        moviesData.push(doc.data());
      });
      setLikedMovies(moviesData);
    } catch (error) {
      console.error('Error fetching liked movies:', error);
    }
  };

  useEffect(() => {
    fetchLikedMovies();
  }, []);

  // Render function for each movie item in the watch later list
  const renderMovieItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Text>{item.title}</Text>
      {/* Add any additional movie details you want to display */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Liked Movies</Text>
      {likedMovies.length > 0 ? (
        <FlatList
          data={likedMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.emptyMessage}>No movies liked yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  movieItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#777',
  },
});

export default BookmarksScreen;



