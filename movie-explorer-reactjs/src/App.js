import React, { useState, useEffect } from 'react';
import Header from './Header';
import MovieList from './MovieList';
import Popup from './Popup';
import './App.css';

const App = () => {
  const [heading, setHeading] = useState('Popular Movies');

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [genreMap, setGenreMap] = useState({});

  useEffect(() => {
    fetchGenres();
    fetchMovies('');
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
      const data = await response.json();
      const genres = {};
      data.genres.forEach(genre => {
        genres[genre.id] = genre.name;
      });
      setGenreMap(genres);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const fetchMovies = async (searchTerm = '') => {
    try {
      const url = searchTerm
        ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchTerm}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}`;
  
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results || []);
      setHeading(searchTerm ? `Search Results for: "${searchTerm}"` : 'Popular Movies');

    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };
  

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const closePopup = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <Header fetchMovies={fetchMovies} />
      <main>
        <h2>{heading}</h2>
        <MovieList movies={movies} onMovieClick={handleMovieClick} genreMap={genreMap} />
      </main>
      {selectedMovie && <Popup movie={selectedMovie} onClose={closePopup} genreMap={genreMap} />}
    </div>
  );
};

export default App;