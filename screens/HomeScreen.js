import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Animated, PanResponder, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}>
        <Text>{randomMovie ? randomMovie.title : 'Loading...'}</Text>
        <Text>{randomMovie ? randomMovie.description : 'Loading...'}</Text>
      </Animated.View>
      <View style={styles.swipeTextContainer}>
        <Image source={require('../assets/homePage/CrossDislike.png')} style={styles.swipeIcon} />
        <Image source={require('../assets/homePage/Heart.png')} style={styles.swipeIcon} />
      </View>
      <Animated.Image
        source={require('../assets/homePage/Heart.png')}
        style={[styles.icon, { opacity: heartOpacity }]}
      />
      <Animated.Image
        source={require('../assets/homePage/CrossDislike.png')}
        style={[styles.icon, { opacity: thumbsDownOpacity }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
  },
  swipeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  swipeIcon: {
    width: 40,
    height: 40,
  },
  icon: {
    position: 'absolute',
    width: 100,
    height: 100,
    resizeMode: 'contain',
    zIndex: 1,
    top: '15%',
  },
});

export default HomeScreen;




