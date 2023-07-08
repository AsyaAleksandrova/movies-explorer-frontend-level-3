import React, {useState, useEffect} from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import * as constant from '../../utils/constant'

function MoviesCardList({ movies, onAddMovie, onDeleteMovie, saved }) {

   const [initialCardsAmt, setInitialCardsAmt] = useState(constant.INITIAL_CARDS_AMT);
   
   const [addCardsAmt, setAddCardsAmt] = useState(constant.ADD_CARDS_AMT);

   const handleChangeWidth = () => {
      setInitialCardsAmt(constant.INITIAL_CARDS_AMT);
      setAddCardsAmt(constant.ADD_CARDS_AMT);
   }  
   
    useEffect(() => {
        window.addEventListener('resize', handleChangeWidth);
    }, []);   
   
   let displayedMovies = movies;

   if (!saved) {
      displayedMovies = movies?.slice(0, initialCardsAmt);
   } 
   
   const handleLoadMovies = () => {
      setInitialCardsAmt(prevState => {return prevState + addCardsAmt});
   }

   return (
      <section className='cinema'>
         <ul className="cinema__list">
            {(displayedMovies.length > 0) && displayedMovies.map((movie) => (
               <MoviesCard
                  movie={movie}
                  key={saved? movie._id : movie.id}
                  onAddMovie={onAddMovie}
                  onDeleteMovie={onDeleteMovie}
                  saved={saved}
               />
            ))}
         </ul>
         {!saved && (movies.length > displayedMovies.length) &&
            <button
            className={`cinema__more`}
            onClick={handleLoadMovies} >
            Ещё
         </button>}
      </section>
   )
}

export default MoviesCardList;