import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firebase configuration

const HomeScreen = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const pan = React.useRef(new Animated.ValueXY()).current;
  const heartOpacity = React.useRef(new Animated.Value(0)).current;
  const thumbsDownOpacity = React.useRef(new Animated.Value(0)).current;

  // Function to generate random movie
  const generateRandomMovie = (moviesData) => {
    if (!moviesData || moviesData.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * moviesData.length);
    return moviesData[randomIndex];
  };

  // Function to handle swipe release
  const handlePanResponderRelease = (_, gesture) => {
    if (gesture.dx > 120) {
      // Swiped right, liked
      Animated.timing(heartOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(heartOpacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }).start();
      });
    } else if (gesture.dx < -120) {
      // Swiped left, disliked
      Animated.timing(thumbsDownOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(thumbsDownOpacity, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }).start();
      });
    }
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'movies'));
        const moviesData = [];
        querySnapshot.forEach((doc) => {
          moviesData.push(doc.data());
        });
        setRandomMovie(generateRandomMovie(moviesData));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
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
    backgroundColor: 'black',
    
    
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
    top: '20%',
  },
});

export default HomeScreen;
