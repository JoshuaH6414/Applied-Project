import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const MovieDetailsScreen = ({ navigation, route }) => {
  // Extract movie details from the route params
  const { movie } = route.params;

  // Check if movie is null before accessing its properties
  if (!movie) {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>Go Back and Swipe Left or Right on the card to begin!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie Details</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.detailsBox}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.text}>{movie.title}</Text>
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.text}>{movie.overview}</Text>
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.label}>Genres:</Text>
          <Text style={styles.text}>{movie.genres}</Text>
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.label}>Release:</Text>
          <Text style={styles.text}>{movie.releaseDate}</Text>
        </View>
        {movie.reviews.length > 0 ? (
          <View style={styles.detailsBox}>
            <Text style={styles.label}>Reviews:</Text>
            {movie.reviews.map(review => (
              <View key={review.reviewDate}>
                <Text style={styles.text}>-------------------------------------------</Text>
                <Text style={styles.text}>Author: {review.author}</Text>
                <Text style={styles.text}>Date: {review.reviewDate}</Text>
                <Text style={styles.text}>Content: {review.content}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.text}>No reviews available for this movie.</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#0b0f54',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
    color: "white",
    textAlign: "center"  
  },
  label: {
    fontWeight: 'bold',
    fontSize: 23,
    marginBottom: 10,
    color: "white",
  },
  text: {
    marginBottom: 20,
    color: "white",
    fontSize:16,
  },
  instructions: {
    fontSize: 18,
    textAlign: 'center',
    color: "white"
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  detailsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    maxHeight: 400,
    //maxWidth: 400,
  },
});

export default MovieDetailsScreen;
