import { db } from '../firebaseConfig'; 
import { setDoc, collection, doc } from 'firebase/firestore';

const saveBookmarkedMovie = async (userId, movieData) => {
  try {
    // Add a new document to the "BookmarkedMovies" collection
    await setDoc(doc(collection(db, 'likedBookmarks', userId, 'bookmarks')), {
      movieId: movieData,
    });
    console.log('Movie Bookmarked successfully!');
  } catch (error) {
    console.error('Error Bookmarking movie:', error);
  }
};

export default saveBookmarkedMovie;