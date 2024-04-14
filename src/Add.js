import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, { useEffect } from 'react';
import { firebase } from '../config';

const Home = () => {
    const movieRef = firebase.firestore().collection('movies'); //adding to firebase
    const genres = [
        {
          "id": 28,
          "name": "Action"
        },
        {
          "id": 12,
          "name": "Adventure"
        },
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 80,
          "name": "Crime"
        },
        {
          "id": 99,
          "name": "Documentary"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Family"
        },
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "History"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Music"
        },
        {
          "id": 9648,
          "name": "Mystery"
        },
        {
          "id": 10749,
          "name": "Romance"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        },
        {
          "id": 10770,
          "name": "TV Movie"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "War"
        },
        {
          "id": 37,
          "name": "Western"
        }
      ]//genre list with ID from TMDB formatted using JSON (https://api.themoviedb.org/3/genre/movie/list?api_key=94923745af562ecdf922d1e84e9f5aaf)

    // Fetch movie info from API
    const fetchAndAddMovies = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=94923745af562ecdf922d1e84e9f5aaf');//API key
            const data = await response.json();
            const movies = data.results;
    
            const batch = firebase.firestore().batch();
    
            movies.forEach((movie) => {
                const genreNames = movie.genre_ids.map(genreId => {
                    const genre = genres.find(g => g.id === genreId);
                    return genre ? genre.name : "Unknown";
                });
    
                const movieData = {
                    title: movie.original_title,
                    releaseDate: movie.release_date,
                    genres: genreNames.join(', '), // Join multiple genres with comma
                    poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                };
                const newMovieRef = movieRef.doc();
                batch.set(newMovieRef, movieData);
            });
    
            await batch.commit();
            console.log('Movies added successfully');
        } catch (error) {
            console.error('Error fetching and adding movies:', error);
        }
    };
    

    useEffect(() => {
        fetchAndAddMovies(); 
    }, []);

    return (
        //a button to add movies to the database
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={fetchAndAddMovies}>
                <Text style={styles.buttonText}>Fetch and Add Movies</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Home;
