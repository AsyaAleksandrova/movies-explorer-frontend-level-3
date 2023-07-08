import * as constant from './constant'

export function getMovies() {
    return fetch(`${constant.MOVIE_URL}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
      .then((res) => {
        if (res.ok) {    
         return res.json();
      }
         return Promise.reject(`Ошибка ${res.status}`);
      })
};
