import { db } from '../firebaseConfig'; // Assuming you have a firebaseConfig.js file
import { addDoc, collection } from 'firebase/firestore';

const saveLikedMovie = async (userId, movieData) => {
  try {
    // Add a new document to the "likedMovies" collection
    await addDoc(collection(db, 'likedMovies'), {
      userId: userId,
      movieData: movieData.id,
    });
    console.log('Liked movie saved successfully!');
  } catch (error) {
    console.error('Error saving liked movie:', error);
  }
};

export default saveLikedMovie;