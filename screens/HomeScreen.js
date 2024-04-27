import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Image, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { saveLikedMovie } from '../utils/saveLikedMovie'; 
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  const pan = React.useRef(new Animated.ValueXY()).current;
  const heartOpacity = React.useRef(new Animated.Value(0)).current;
  const thumbsDownOpacity = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  // Get the current user
  const currentUser = auth.currentUser;
  const userId = currentUser ? currentUser.uid : null;

  const generateRandomMovie = (moviesData) => {
    if (!moviesData || moviesData.length === 0) {
      return null;
    }
    const randomIndex = Math.floor(Math.random() * moviesData.length);
    return moviesData[randomIndex];
  };

  const handlePanResponderRelease = async (_, gesture) => {
    const Threshold = 150;
    const velocity = Math.sqrt(gesture.vx ** 2 + gesture.vy ** 2);
    
    if (gesture.dx > Threshold || gesture.dx < -Threshold || velocity > 1) {
      if (gesture.dx > 120) {
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
        // Save liked movie
        if (randomMovie && userId) {
          saveLikedMovie(userId, randomMovie);
        }
      } else if (gesture.dx < -120) {
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
    }
  
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
      tension: 100,
      friction: 10,
    }).start();
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: handlePanResponderRelease,
    })
  ).current;

  // Function to navigate to MovieDetailsScreen
  const goToMovieDetails = () => {
    navigation.navigate('MovieDetailsScreen', { movie : randomMovie});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{randomMovie ? randomMovie.title : 'Swipe to begin'}</Text>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}>
        <Text>{randomMovie ? randomMovie.description : 'Swipe Left to dislike'}</Text>
        {randomMovie && randomMovie.poster && (
          <Image source={{ uri: randomMovie.poster }} style={styles.movieImage} />
        )}
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
      
      {/* Button to navigate to MovieDetailsScreen */}
      <TouchableOpacity style={styles.button} onPress={goToMovieDetails}>
        <Text style={styles.buttonText}>Movie Details</Text>
      </TouchableOpacity>
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
    height: 450,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
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

  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    
  },
  
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  
  movieImage: {
    alignContent: "center",
    width: '100%',
    height: 450,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export default HomeScreen;
