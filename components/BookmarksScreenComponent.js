import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { auth } from '../firebaseConfig'; // Assuming you have access to auth

const BookmarksScreen = () => {
  const [likedMovies, setLikedMovies] = useState([]);
  const currentUser = auth.currentUser;
  const userId = currentUser ? currentUser.uid : null;

  useEffect(() => {
    const fetchLikedMovies = async () => {
      if (!userId) {
        return; // No user is signed in
      }
      try {
        // Query the "likedMovies" collection for documents where userId matches the current user's ID
        const querySnapshot = await getDocs(query(collection(db, 'likedMovies'), where('userId', '==', userId)));
        const moviesData = [];
        querySnapshot.forEach((doc) => {
          moviesData.push(doc.data());
        });
        setLikedMovies(moviesData);
      } catch (error) {
        console.error('Error fetching liked movies:', error); 
      }
    };

    fetchLikedMovies();
  }, [userId]); // Trigger the effect whenever userId changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>
      <FlatList
        data={likedMovies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieContainer}>
            <Text style={styles.movieTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    top: '10%'
  },
  movieContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    top: '20%'
  },
});

export default BookmarksScreen;
