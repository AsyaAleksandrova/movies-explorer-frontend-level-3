import * as constant from './constant';

export const register = (name, email, password) => {
   return fetch(`${constant.API_URL}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password,})
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const login = (email, password) => {
   return fetch(`${constant.API_URL}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email, password)
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const logout = () => {
   return fetch(`${constant.API_URL}/signout`, {
      method: 'POST',
      credentials: 'include'
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const checkToken = (id) => {
   return fetch(`${constant.API_URL}/users/me`, {
      method: 'GET',
      credentials: 'include'
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const editUser = (name, email) => {
   return fetch(`${constant.API_URL}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name, email)
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const addFilm = (movie) => {
   return fetch(`${constant.API_URL}/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const getMyFilms = () => {
   return fetch(`${constant.API_URL}/movies`, {
      method: 'GET',
      credentials: 'include'
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};

export const deleteFilm = (id) => {
   return fetch(`${constant.API_URL}/movies/${id}`, {
      method: 'DELETE',
      credentials: 'include'
   })
      .then((response) => {
         if (response.ok) {    
            return response.json();
         }
            return Promise.reject(response);
         })
};