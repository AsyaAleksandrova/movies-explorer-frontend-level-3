/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies({ movies, onDeleteMovie, openPopupInfo, setOpenPreloader, searchFilm, getMyMovies }) {
   const [error, setError] = useState('');

   useEffect(() => {
      if (movies.length === 0) {
         setError('Ничего не найдено')
      } else {
         setError('')
      }
   }, [movies]);

   return (
      <main className='movies'>
         <SearchForm setOpenPreloader={setOpenPreloader} openPopupInfo={openPopupInfo} searchFilm={searchFilm} saved={true} />
         {error !== '' && <p className='movies__error'>{ error }</p>}
         {movies.length !== 0 && <MoviesCardList
            movies={movies}
            onDeleteMovie={onDeleteMovie}
            saved={true}
         />}
      </main>
   )
}

export default SavedMovies;