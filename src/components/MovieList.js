import React from 'react';

//  All we're doing here is taking the handleFavoritesClick function from props and adding it to an onClick property in the overlay 
const MovieList = (props) => { 
	const FavoriteComponent = props.favoriteComponent;  // We're taking our favoriteComponent from props and assigning it to a variable. This lets us use it as a react component

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>  {/*  We're adding a new class to the parent div: image-container. This will allow us to add the zoom effect */} 
					<img src={movie.Poster} alt='movie'></img>
					<div
						onClick={() => props.handleFavoritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center' // We're adding a new div which will be the overlay. We'll hide this div initially and show it when the user hovers over
					>  {/*  We're rendering our favoriteComponent in the overlay */}
						<FavoriteComponent /> 
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;