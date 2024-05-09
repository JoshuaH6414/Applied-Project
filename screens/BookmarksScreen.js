import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
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
        const userBookmarksRef = collection(db, 'likedBookmarks', userId, 'bookmarks', movieId, 'bookmarks');
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
    <View style={styles.movieItem}>
      <Image source={{ uri: item.poster }} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{item.title}</Text>
      {/* Add any additional movie details you want to display */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Bookmarked Movies</Text>
      {bookmarkedMovies.length > 0 ? (
        <FlatList
          data={bookmarkedMovies}
          renderItem={renderMovieItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true} // Scroll horizontally
          showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
          contentContainerStyle={styles.movieList} // Apply styling to the container
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
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10,
  },
  movieList: {
    paddingLeft: 20,
  },
  movieItem: {
    marginRight: 20,
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    marginBottom: 5,
  },
  movieTitle: {
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    color: '#777',
    alignSelf: 'center',
  },
});

export default BookmarksScreen;
