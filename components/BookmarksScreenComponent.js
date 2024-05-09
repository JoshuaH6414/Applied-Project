import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig';

const BookmarksScreen = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const currentUser = auth.currentUser;
  const userId = currentUser ? currentUser.uid : null;

  // Function to fetch bookmarked movies for the current user from the database
  const fetchBookmarkedMovies = async () => {
    try {
      if (userId) {
        const userBookmarksRef = collection(db, 'likedBookmarks', userId, 'bookmarks');
        const bookmarksQuerySnapshot = await getDocs(userBookmarksRef);
  
        const bookmarkedMoviesData = [];
        bookmarksQuerySnapshot.forEach((doc) => {
          const movieData = doc.data(); // Data for each movie
          bookmarkedMoviesData.push(movieData);
        });
  
        console.log('Bookmarked movies:', bookmarkedMoviesData);
        setBookmarkedMovies(bookmarkedMoviesData);
      }
    } catch (error) {
      console.error('Error fetching bookmarked movies:', error);
    }
  };
  

  useEffect(() => {
    fetchBookmarkedMovies();
  }, []);

  // Render function for each bookmarked movie item
  const renderMovieItem = ({ item }) => (
    <TouchableOpacity style={styles.movieItem}>
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.releaseDate}>{item.releaseDate}</Text>
      {/* Add any additional movie details you want to display */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookmarked Movies</Text>
      {bookmarkedMovies.length > 0 ? (
        <FlatList
          data={bookmarkedMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      ) : (
        <Text style={styles.emptyMessage}>No movies bookmarked yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#003426',
    paddingTop: 40, // Add padding top to move content down
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
    marginTop: 20, // Adjust margin top to move the text down
  },
  flatListContainer: {
    alignItems: 'stretch',
    paddingHorizontal: 20, // Add horizontal padding to the FlatList content
  },
  movieItem: {
    backgroundColor: '#348833',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DEFFDE'
  },
  releaseDate: {
    fontSize: 14,
    color: '#99BB99',
    marginTop: 5,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#777777',
  },
});

export default BookmarksScreen;
