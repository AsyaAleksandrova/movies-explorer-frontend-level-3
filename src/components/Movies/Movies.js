/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ movies, setFilterMovies, onAddMovie, onDeleteMovie, openPopupInfo, setOpenPreloader, searchFilm }) {
   const [error, setError] = useState('');

   useEffect(() => {
      if (localStorage.getItem('filterMovies')) {
         setFilterMovies(JSON.parse(localStorage.getItem('filterMovies')));
      }
   }, [])

   useEffect(() => {
      if (movies.length === 0 && localStorage.getItem('query')) {
         setError('Ничего не найдено')
      } else {
         setError('')
      }      
   }, [movies])

   return (
      <main className='movies'>
         <SearchForm setOpenPreloader={setOpenPreloader} openPopupInfo={openPopupInfo} searchFilm={searchFilm} saved={false} />
         {error !== '' && <p className='movies__error'>{ error }</p>}
         {movies.length !== 0 && <MoviesCardList
            movies={movies}
            onAddMovie={onAddMovie}
            onDeleteMovie={onDeleteMovie}
            saved={false}
         />}
      </main>
   )
}

export default Movies;