import { db } from '../firebaseConfig'; // Assuming you have a firebaseConfig.js file
import { setDoc, collection, doc } from 'firebase/firestore';

const saveLikedMovie = async (userId, movieData) => {
  try {
    // Add a new document to the "likedMovies" collection
    await setDoc(doc(collection(db, 'likedMovies', userId, 'movies')), {
      movieId: movieData,
    });
    console.log('Liked movie saved successfully!');
  } catch (error) {
    console.error('Error saving liked movie:', error);
  }
};

export default saveLikedMovie;