//export const API_URL = 'http://localhost:3001/api';
export const API_URL = 'https://videoapi.nomoredomainsclub.ru/api';
export const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const SHORT_FILM_LENGTH = 40;

export const INITIAL_CARDS_AMT = () => {
   const windowSize = window.innerWidth;
   if (windowSize < 670) {
      return 5
   } else if (windowSize < 1060) {
      return 8
   } else {
      return 12
   }
};

export const ADD_CARDS_AMT = () => {
   const windowSize = window.innerWidth;
   if (windowSize < 1060) {
      return 2
   } else {
      return 3
   }
};
