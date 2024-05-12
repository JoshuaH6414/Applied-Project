import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig';

const BookmarksScreen = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State to manage refreshing

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

  // Function to handle pull-to-refresh action
  const handleRefresh = () => {
    setRefreshing(true); // Set refreshing state to true
    fetchBookmarkedMovies(); // Fetch bookmarked movies again
    setRefreshing(false); // Set refreshing state back to false after fetching is done
  };

  useEffect(() => {
    fetchBookmarkedMovies();
  }, []);

  // Render function for each bookmarked movie item
  const renderMovieItem = ({ item }) => (
    <TouchableOpacity style={styles.movieItem}>
      <Text style={styles.movieTitle}>{item.movieData.title}</Text>
      <Text style={styles.releaseDate}>{item.movieData.releaseDate}</Text>
      {/* Add any additional movie details you want to display */}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookmarked Movies</Text>
      <FlatList
        data={bookmarkedMovies}
        renderItem={renderMovieItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.flatListContainer}
        refreshControl={ // Refresh control to handle pull-to-refresh
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#003426']} // Android
            tintColor="#003426" // iOS
          />
        }
      />
      {bookmarkedMovies.length === 0 && (
        <Text style={styles.emptyMessage}>No movies bookmarked yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003426',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 20,
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
    color: '#DEFFDE',
  },
  releaseDate: {
    fontSize: 14,
    color: '#99BB99',
    marginTop: 5,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 300,
  },
});

export default BookmarksScreen;
