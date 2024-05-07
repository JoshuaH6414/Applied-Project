import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { collection, getDocs, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import saveLikedMovie from '../utils/saveLikedMovie'; 
import saveBookmarkedMovie from '../utils/saveBookmarkedMovie';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  let indexToSave = useRef(null);
  const [movieCount, setMovieCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const pan = useRef(new Animated.ValueXY()).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;
  const thumbsDownOpacity = useRef(new Animated.Value(0)).current;
  const [isBookmarked, setIsBookmarked] = useState(false)
  
  useEffect(()=> {
    const fetchMovies = async () => {
      setLoading(true); 
      try {
        const coll = collection(db,'movies')
        const snapshot = await getCountFromServer(coll);
        setMovieCount(snapshot.data().count);
        const randomIndex = Math.floor(Math.random() * snapshot.data().count);
        indexToSave.current = randomIndex;
        const movieSnapshot = await getDocs(collection(db, 'movies'));

        const randomMovie = movieSnapshot.docs[randomIndex].data();
        setRandomMovie(randomMovie);
      } catch (error) {
        console.error('Error fetching movie:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []); 
  
  const currentUser = auth.currentUser;
  const userId = currentUser ? currentUser.uid : null;

  const handleLike = async () => {
    try {
      if (randomMovie && userId) {
        setLoading(true);
        await saveLikedMovie(userId, indexToSave.current); 
        console.log("Movie liked:", randomMovie.title);
      }
    } catch (error) {
      console.error('Error liking movie:', error);
    }
    generateRandomMovie();
  };

  const handleDislike = () => {
    setLoading(true);
    console.log("Movie disliked:", randomMovie.title);
    generateRandomMovie();
  };

  const animateHeart = () => {
    Animated.timing(heartOpacity, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(heartOpacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    });
  };

  const animateDislike = () => {
    Animated.timing(thumbsDownOpacity, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(thumbsDownOpacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }).start();
    });
  };

  const generateRandomMovie = async () => {
    try {
      setLoading(true);
  
      const coll = collection(db, 'movies');
      const snapshot = await getCountFromServer(coll);
      const totalCount = snapshot.data().count;
  
      if (totalCount > 0) {
        const randomIndex = Math.floor(Math.random() * totalCount);
        indexToSave.current = randomIndex; // Update the stored index
        const movieSnapshot = await getDocs(collection(db, 'movies'));
        const randomMovie = movieSnapshot.docs[randomIndex].data();
  
        setMovieCount(totalCount);
        setRandomMovie(randomMovie);
      } else {
        console.log('No movies found in the collection.');
      }
    } catch (error) {
      console.error('Error fetching movie:', error);
    } finally {
      setLoading(false); 
    }
  };

  const goToMovieDetails = () => {
    navigation.navigate('MovieDetailsScreen', { movie : randomMovie });
  };
  
  const addToBookmarks = async () => {
    try {
      //setLoading(true);
      await saveBookmarkedMovie(userId, randomMovie);
      console.log("Movie bookmarked", randomMovie.title);
      setIsBookmarked(true)
    } catch (error) {
      console.error("Error Bookmarking movie", error);
    } finally {
      //setLoading(false)
    } 
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="white" /> 
      ) : (
        <>
          <Text style={styles.title}>{randomMovie ? randomMovie.title : 'Fetching movies'}</Text>
          <View style={styles.card}>
            <Text>{randomMovie ? randomMovie.description : 'Loading Movies'}</Text>
            {randomMovie && randomMovie.poster && (
              <Image source={{ uri: randomMovie.poster }} style={styles.movieImage} />
            )}
          </View>
          <View style={styles.swipeTextContainer}>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleDislike}>
                <Image source={require('../assets/homePage/CrossDislike.png')} style={styles.dislikeIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLike}>
                <Image source={require('../assets/homePage/Heart.png')} style={styles.heartIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={addToBookmarks}>
                <Image source={isBookmarked ? require('../assets/homePage/BookmarkSaved.png'): require('../assets/homePage/Bookmark.png')} style={styles.bookmarkIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.nextButton} onPress={goToMovieDetails}>
                <Text style={styles.buttonText}>Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} onPress={generateRandomMovie}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>

            </View>
          </View>
          <Animated.Image
            source={require('../assets/homePage/Heart.png')}
            style={[styles.icon, { opacity: heartOpacity }]}
          />
          <Animated.Image
            source={require('../assets/homePage/CrossDislike.png')}
            style={[styles.icon, { opacity: thumbsDownOpacity }]}
          />
        </>
      )}
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
    width: width * 0.7,
    height: height * 0.6,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: '#ddd',
    elevation: 5,
    marginBottom: 100,
  },

  swipeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: height * 0.02,
    left: 0,
    right: 0,
  },

  icon: {
    position: 'absolute',
    width: 100,
    height: 100,
    resizeMode: 'contain',
    zIndex: 1,
    top: height * 0.2,
  },

  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%', 
    position: 'absolute',
    bottom: height * 0.09,
    left: '10%', 
    marginBottom:5,
    marginTop:10,
  },

  nextButton: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: 'rgba(173, 216, 230, 0.5)',
    padding: 10,
    borderRadius: 15,
  },

  button: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 15,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
    textAlign: 'left',
    maxWidth: '100%',
    paddingLeft: 10, 
  },

  movieImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },

  heartIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop: 10,
  },

  dislikeIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    marginTop: 10,
  },

  bookmarkIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop: 10,
  },
});

export default HomeScreen;