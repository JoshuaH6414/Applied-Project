import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig'; // Import both db and auth from your Firebase configuration

const BookmarksScreen = () => {
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  // Function to fetch bookmarked movies for the current user from the database
  const fetchBookmarkedMovies = async () => {
    try {
      const currentUser = auth.currentUser;
      const userId = currentUser ? currentUser.uid : null;
      if (userId) {
        const userDocRef = collection(db, 'likedBookmarks', userId, 'bookmarks');
        const bookmarksQuery = query(userDocRef, limit(10)); // Limit the query to fetch only 10 documents
        const querySnapshot = await getDocs(bookmarksQuery);

        if (!querySnapshot.empty) {
          const bookmarkedMoviesData = [];
          querySnapshot.forEach((doc) => {
            bookmarkedMoviesData.push(doc.data());
          });

          setBookmarkedMovies(bookmarkedMoviesData);
        } else {
          console.log('No bookmarked movies found.');
        }
      } else {
        console.log('User not authenticated.');
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
      <Text style={styles.title}>{item.title}</Text>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
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
