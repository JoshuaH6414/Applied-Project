import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const BookmarksScreen = ({ navigation }) => {
  const [watchLaterList, setWatchLaterList] = useState([]);

  // Function to handle adding a movie to the watch later list
  const addMovieToWatchLater = (movie) => {
    setWatchLaterList(prevList => [...prevList, movie]);
  };

  // Function to handle removing a movie from the watch later list
  const removeMovieFromWatchLater = (id) => {
    setWatchLaterList(prevList => prevList.filter(movie => movie.id !== id));
  };

  // Render function for each movie item in the watch later list
  const renderMovieItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Text>{item.title}</Text>
      <TouchableOpacity onPress={() => removeMovieFromWatchLater(item.id)}>
        <Image source={require('../assets/homePage/CrossDislike.png')} style={styles.deleteIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Watch Later</Text>
      {watchLaterList.length > 0 ? (
        <>
          <View style={styles.tableHeader}>
            <Text style={styles.columnHeader}>Title</Text>
            <Text style={styles.columnHeader}>Actions</Text>
          </View>
          <FlatList
            data={watchLaterList}
            renderItem={renderMovieItem}
            keyExtractor={item => item.id.toString()}
          />
        </>
      ) : (
        <Text style={styles.emptyMessage}>No movies added yet. Like a movie to add it to your watch later list.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  columnHeader: {
    fontWeight: 'bold',
  },
  movieItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#999',
  },
});

export default BookmarksScreen;


