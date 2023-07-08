import React, {useState} from 'react';
import './SearchForm.css';

function SearchForm({ setOpenPreloader, openPopupInfo, searchFilm, saved }) {
   const [query, setQuery] = useState(() => {
      if (saved) {
         if (localStorage.getItem('query_myMovies')) { return localStorage.getItem('query_myMovies') } else { return '' }
      } else {
         if (localStorage.getItem('query')) { return localStorage.getItem('query') } else { return '' }
      }

   });
   const [short, setShort] = useState(() => {
      if (saved) {
         if (localStorage.getItem('short_myMovies') === 'true') { return true } else { return false }
      } else {
         if (localStorage.getItem('short') === 'true') { return true } else { return false }
      }
   });

   const handleChangeQuery = (e) => {
      setQuery(e.target.value);
   };

   const handleChangeShort = () => {
      if (short) {
         setShort(false);
      } else {
         setShort(true);
      }
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (query === '' && !saved) {
         openPopupInfo('Ошибка поиска', 'Нужно ввести ключевое слово');
      } else {
         if (saved) {
            localStorage.setItem('query_myMovies', query);
            localStorage.setItem('short_myMovies', short); 
         } else {
            localStorage.setItem('query', query);
            localStorage.setItem('short', short);            
         }
         setOpenPreloader(true);
         searchFilm();  
      }
   }

   return (
      <section className='search'>
         <form className='search__form' onSubmit={handleSubmit}>
            <label className='search__label'></label>
            <input className='search__input' type='search' value={query} onChange={handleChangeQuery} placeholder='Фильм' />
            <button className='search__button' type='submit'></button>
            <div className='search__box'>
               <input className='search__hidebox' type='checkbox' checked={short} onChange={handleChangeShort} id='short' />
               <label htmlFor='short' className='search__checkbox'></label>
               <label htmlFor='short' className='search__short'>Короткометражки</label>
            </div>
         </form>
      </section>
   )
}

export default SearchForm;