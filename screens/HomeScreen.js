import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated, PanResponder, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth, db } from '../firebaseConfig.js'; // Import Firebase auth, db
import { collection, getDocs } from '@firebase/firestore';


const HomeScreen = ({ navigation }) => {
  const [likedContent, setLikedContent] = useState(null);
  const [randomMovie, setRandomMovie] = useState(null);
  const [moviesPool, setMoviesPool] = useState([
    { id: 1, title: 'Movie A', description: 'Description for Movie A', disliked: false },
    { id: 2, title: 'Movie B', description: 'Description for Movie B', disliked: false },
    { id: 3, title: 'Movie C', description: 'Description for Movie C', disliked: false },
  ]);
  const pan = React.useRef(new Animated.ValueXY()).current;
  const heartOpacity = React.useRef(new Animated.Value(0)).current;
  const thumbsDownOpacity = React.useRef(new Animated.Value(0)).current;

  // Function to generate random movie excluding disliked ones
  const generateRandomMovie = () => {
    const filteredMovies = moviesPool.filter(movie => !movie.disliked);
    if (filteredMovies.length === 0) {
      // If all movies are disliked, return null
      return null;
    }
    const randomIndex = Math.floor(Math.random() * filteredMovies.length);
    return filteredMovies[randomIndex];
  };

  // Function to handle swipe release
  const handlePanResponderRelease = (_, gesture) => {
    if (gesture.dx > 120) {
      // Swiped right, liked
      setLikedContent('Liked');
      Animated.timing(heartOpacity, {
        toValue: 1,
        duration: 500, // 0.5 seconds
        useNativeDriver: true,
      }).start(() => {
        // Reset opacity after animation
        Animated.timing(heartOpacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }).start();
      });
    } else if (gesture.dx < -120) {
      // Swiped left, disliked
      setLikedContent('Disliked');
      Animated.timing(thumbsDownOpacity, {
        toValue: 1,
        duration: 500, // 0.5 seconds
        useNativeDriver: true,
      }).start(() => {
        // Reset opacity after animation
        Animated.timing(thumbsDownOpacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }).start();
      });
      // Update disliked status for the current movie
      setMoviesPool(prevMovies =>
        prevMovies.map(movie => (movie === randomMovie ? { ...movie, disliked: true } : movie))
      );
    }
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
    // Generate a new random movie
    setRandomMovie(generateRandomMovie());
  };

  useEffect(() => {
    // Generate a random movie when the component mounts
    setRandomMovie(generateRandomMovie());
  }, []);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: handlePanResponderRelease,
    })
  ).current;

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

// export default HomeScreen;
