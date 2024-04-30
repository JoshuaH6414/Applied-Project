import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import { collection, getDocs, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import saveLikedMovie from '../utils/saveLikedMovie'; 
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const [randomMovie, setRandomMovie] = useState(null);
  let indexToSave = useRef(null);
  const [movieCount, setMovieCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const pan = useRef(new Animated.ValueXY()).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;
  const thumbsDownOpacity = useRef(new Animated.Value(0)).current;
  
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
  
  const goToBookmarks = () => {
    // Navigate to bookmarks change with add to book marks 
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="white" /> 
      ) : (
        <>
          <Text style={styles.title}>{randomMovie ? randomMovie.title : 'Fetching movies'}</Text>
          <View style={styles.card}>
            <Text>{randomMovie ? randomMovie.description : 'Swipe Left to dislike'}</Text>
            {randomMovie && randomMovie.poster && (
              <Image source={{ uri: randomMovie.poster }} style={styles.movieImage} />
            )}
          </View>
          <View style={styles.swipeTextContainer}>
            <TouchableOpacity onPress={handleDislike}>
              <Image source={require('../assets/homePage/CrossDislike.png')} style={styles.dislikeIcon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLike}>
              <Image source={require('../assets/homePage/Heart.png')} style={styles.heartIcon} />
            </TouchableOpacity>
          </View>
          <Animated.Image
            source={require('../assets/homePage/Heart.png')}
            style={[styles.icon, { opacity: heartOpacity }]}
          />
          <Animated.Image
            source={require('../assets/homePage/CrossDislike.png')}
            style={[styles.icon, { opacity: thumbsDownOpacity }]}
          />
          <TouchableOpacity style={styles.NextMovie} onPress={generateRandomMovie}>
            <Text style={styles.buttonText2}>Next Movie</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToMovieDetails}>
            <Text style={styles.buttonText}>Movie{'\n'}Details</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToBookmarks}>
              <Image source={require('../assets/homePage/Bookmark.png')} style={styles.BookmarkIcon} />
          </TouchableOpacity>
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
    width: 300,
    height: 450,
    backgroundColor: 'black',
    borderRadius: 10,
    alignItems: 'left',
    justifyContent: 'center',
    borderWidth: 0,
    borderColor: '#ddd',
    elevation: 5,
    bottom: -15,
    left:-25,
  },

  swipeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 15,
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
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 5,
    borderRadius: 15,
    top: -200,
    left: 158,
  },
  
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonText2: {
    color: 'black',
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
    alignContent: "center",
    width: '100%',
    height: 450,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  heartIcon: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
    zIndex: 1,
    top: -200,
    left: 39, 
  },

  dislikeIcon: {
  position: 'absolute',
  width: 40,
  height: 40,
  resizeMode: 'contain',
  zIndex: 1,
  top: -120,
  left: 230,
},

BookmarkIcon: {
  position: 'absolute',
  width: 50,
  height: 50,
  resizeMode: 'contain',
  zIndex: 1,
  top: -330,
  left: 133, 
},

NextMovie: {
  position: 'absolute',
  width: 100,
  height: 40,
  resizeMode: 'contain',
  zIndex: 1,
  top: 570,
  left: 136, 
  backgroundColor: 'rgba(173, 216, 230, 1)',
  padding: 10,
  borderRadius: 15,
}

});

export default HomeScreen;
