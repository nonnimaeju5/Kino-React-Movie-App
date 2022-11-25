import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites'; 

const App = () => {
	const [movies, setMovies] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

// We're updating our getMovieRequest function to accept a parameter: searchValue
	const getMovieRequest = async (searchValue) => { 
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	// When the useEffect hooks runs, it passes the new searchValue to our getMovieRequest function
	useEffect(() => {
		getMovieRequest(searchValue); // We're updating the useEffect hook to run whenever the searchValue changes
	}, [searchValue]);

	useEffect(() => { // We're using the useEffect hook to retrieve favorites from local storage when the app loads, and we're setting this to state
		const movieFavorites = JSON.parse( //We're creating a function called removeFavoriteMovie to remove a given movie from our favorites state
			localStorage.getItem('react-movie-app-favorites')
		);

		setFavorites(movieFavorites);
	}, []);

	const saveToLocalStorage = (items) => { // We're adding a function called saveToLocalStorage. This function takes a list of items, and saves them to local storage against a key. In this case the key is react-movie-app-favorites.
		localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
	};

	const addFavoriteMovie = (movie) => {
		const newFavoriteList = [...favorites, movie];
		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList); // We're saving to local storage when we add a favorite movie
	};

	const removeFavoriteMovie = (movie) => {
		const newFavoriteList = favorites.filter(
			(favorite) => favorite.imdbID !== movie.imdbID
		);

		setFavorites(newFavoriteList);
		saveToLocalStorage(newFavoriteList); // We're saving to local storage when we remove a favorite movie 
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' /> 
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>   {/*  We're adding a new row and within it, adding a new heading using the MovieListHeading component */}
				<MovieList // We're passing our RemoveFavorites component and our removeFavoriteMovie function to our MovieList component
					movies={movies}
					handleFavoritesClick={addFavoriteMovie}
					favoriteComponent={AddFavorites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favorites' />
			</div>
			<div className='row'>  {/*  We're adding another row also here and rending our favorites using the MovieList component */}
			<MovieList
					movies={favorites}
					handleFavoritesClick={removeFavoriteMovie}
					favoriteComponent={RemoveFavorites}
				/>
			</div>
		</div>
	);
};

export default App;