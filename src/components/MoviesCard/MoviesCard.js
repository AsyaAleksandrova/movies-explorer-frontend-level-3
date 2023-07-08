/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './MoviesCard.css'

function MoviesCard({ movie, onAddMovie, onDeleteMovie, saved }) {
   const [liked, setLiked] = useState(false);

   const duration = `${(Math.floor(movie.duration / 60) !== 0) ? (Math.floor(movie.duration / 60) + 'ч ') : ''}
                     ${movie.duration - Math.floor(movie.duration / 60) * 60}м`;
   let url = ``
   if (movie.image.url) {
      url = `https://api.nomoreparties.co/${movie.image.url}`;      
   } else {
      url = movie.image;
   }

   const myMovies = JSON.parse(localStorage.getItem('myMovies'));
   const likedMovie = myMovies.find((saved) => saved.nameRU === movie.nameRU);

   useEffect(() => {
      if(likedMovie) {
         setLiked(true)
      }
    }, [])   

   const handleLikeMovie = () => {
      if (saved) {
         onDeleteMovie(likedMovie);
      } else {
         if (liked) {
            setLiked(false);
            onDeleteMovie(likedMovie);
         } else {
            setLiked(true);
            onAddMovie(movie);
         }         
      }
   }

   return (
      <li className='film'>
         <div className='film__container'>
            <h4 className='film__title'>{movie.nameRU}</h4>
            <p className='film__duration'>{duration}</p>
            {!saved && <button onClick={handleLikeMovie} type='button' className={`film__like ${liked ? 'film__like_active' : ''}`}></button>}
            {saved && <button onClick={handleLikeMovie} type='button' className='film__delete'></button>}
            <a className='film__preview-box' href={movie.trailerLink} target='_blank' rel="noreferrer">
               <img src={url} alt={movie.nameRU} className='film__preview' />
            </a>
         </div>
      </li>
   )
}

export default MoviesCard;