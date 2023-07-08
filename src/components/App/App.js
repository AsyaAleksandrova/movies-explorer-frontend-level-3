/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState} from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import NoPage from '../NoPage/NoPage';
import InfoPopup from '../InfoPopup/InfoPopup';
import Preloader from '../Preloader/Preloader';
import * as moviesApi from '../../utils/moviesApi';
import * as mainApi from '../../utils/mainApi';
import * as constant from '../../utils/constant';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });
  const [filterMovies, setFilterMovies] = useState([]);
  const [filterMyMovies, setFilterMyMovies] = useState([]);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [openPreloader, setOpenPreloader] = useState(false);
  const [regError, setRegError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [editError, setEditError] = useState('');

  const handleRegister = ({ name, email, password}) => {
    return mainApi.register(name, email, password)
      .then((res) => {
        openPopupInfo('Регистрация', 'Регистрация прошла успешно! Добро пожаловать на сайт!');
        setCurrentUser({ name: res.user.name, email: res.user.email, _id: res.user._id });
        setLoggedIn(true);
        localStorage.setItem('login', 'true');
        navigate('/movies');
        getMyMovies();
        setRegError('');
      })
      .catch((e) => {
        switch(e.status) {
          case 409: setRegError('Пользователь с таким email уже зарегистрирован.');
            break;
          case 400: setRegError('Переданые некорректные данные при создании пользователя.');
            break;
          default: setRegError('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });
  };

  const handleLogin = (email, password) => {
    return mainApi.login(email, password)
      .then((res) => {
        setCurrentUser({ name: res.user.name, email: res.user.email, _id: res.user._id });
        setLoggedIn(true);
        localStorage.setItem('login', 'true');
        navigate('/movies');
        getMyMovies();
        setLoginError('');
      })
      .catch((e) => {
       closeAllPopups();
        switch(e.status) {
          case 401: setLoginError('Некорректно указаны почта и/или пароль.');
            break;        
          default: setLoginError('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });
  };

  const handleLogout = () => {
    return mainApi.logout()
      .then(() => {
        setCurrentUser({ name: '', email: '', _id: '' });
        localStorage.clear();
        setFilterMovies([]);
        setFilterMyMovies([]);
        setLoggedIn(false);
        navigate('/');
      })
      .catch((e) => {
        openPopupInfo('Ошибка', 'Что-то пошло не так. Попробуйте повторить запрос.');
      })  
  };

  const checkToken = () => {
    if (localStorage.getItem('login') === 'true') {
      return mainApi.checkToken()
        .then((res) => {
          setCurrentUser({ name: res.name, email: res.email, _id: res._id });
          setLoggedIn(true);
          getMyMovies();
          navigate(location.pathname);
        })
        .catch((e) => {
          console.log(e);
          setLoggedIn(false);
        });      
    } else {
      return
    }
  };

  useEffect(() => {
    checkToken();
  }, [])

  const handleEditUser = (name, email) => {
    return mainApi.editUser(name, email)
      .then((res) => {
        setCurrentUser({...currentUser, name: res.name, email: res.email });
        setLoggedIn(true);
        openPopupInfo('Изменение данных', 'Данные пользователя успешно изменены');
        setEditError('');
      })
      .catch((e) => {
        switch(e.status) {
          case 409: setEditError('Пользователь с таким email уже зарегистрирован.');
            break;
          case 400: setEditError('Переданые некорректные данные при изменении пользователя.');
            break;
          default: setEditError('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });    
  };

  const getMyMovies = () => {
    return mainApi.getMyFilms()
      .then((res) => {
        localStorage.setItem('myMovies', JSON.stringify(res))
        setFilterMyMovies(res);
      })
      .catch((e) => {
        openPopupInfo('Ошибка', 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      })  
  }

  const handleAddMovie = (movie) => {
    const newFilm = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail:`https://api.nomoreparties.co${movie.image.url}` ,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    }
    return mainApi.addFilm(newFilm)
      .then(() => {
        getMyMovies();
      })
      .catch((e) => {
        switch(e.status) {
          case 400: openPopupInfo('Ошибка', 'Переданые некорректные данные при добавлении фильма.');
            break;
          default: openPopupInfo('Ошибка', 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
            break;
        }
      });
    
  };

  const handleDeleteMovie = (movie) => {
    return mainApi.deleteFilm(movie._id)
      .then(() => {
        getMyMovies();
    })
      .catch((e) => {
        switch(e.status) {
          case 403: openPopupInfo('Ошибка', 'Отсутствуют права для удаления фильма.');
            break;
          default: openPopupInfo('Ошибка', 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
            break;
        }
      });
  };

  const getMoviesSet = () => {
    return moviesApi.getMovies()
      .then((movies) => {
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch(() => {
        openPopupInfo('Ошибка', 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.');
      })
  };

  const filterFilm = (movies, query, short) => {
    let filterArray = [];
    movies.forEach((movie) => {
      if (movie.nameRU.toLowerCase().includes(query.toLowerCase()) || query === '') {
        if (short) {
          if (movie.duration <= constant.SHORT_FILM_LENGTH) {
            return filterArray.push(movie)
          } return
        } 
        return filterArray.push(movie)
      } 
    });

    return filterArray
  }

  const searchFilm = () => {
    const query = localStorage.getItem('query');
    let short = false;
    if (localStorage.getItem('short') === 'true') { short = true } else { short = false }
    if (!localStorage.getItem('movies')) {
      return getMoviesSet()
        .finally(() => {
          const filter = filterFilm(JSON.parse(localStorage.getItem('movies')), query, short)
          setFilterMovies(filter);
          localStorage.setItem('filterMovies', JSON.stringify(filter));
          setOpenPreloader(false);
        })
    } else {
      const filter = filterFilm(JSON.parse(localStorage.getItem('movies')), query, short)
      setFilterMovies(filter);
      localStorage.setItem('filterMovies', JSON.stringify(filter));
      setOpenPreloader(false);
    }
  };

  const searchMyFilm = () => {
    const query = localStorage.getItem('query_myMovies');
    let short = false;
    if (localStorage.getItem('short_myMovies') === 'true') { short = true} else { short = false }    
    setFilterMyMovies(filterFilm(JSON.parse(localStorage.getItem('myMovies')), query, short));
    setOpenPreloader(false);
  }  

  const openPopupInfo = (title, message) => {
    setInfoTitle(title);
    setInfoMessage(message);
    setIsInfoPopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsInfoPopupOpen(false);
    setOpenPreloader(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={<Header loggedIn={loggedIn} />}>
          <Route path='/' element={ <Footer/> }>
          <Route path='/' element={<Main />} />
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                  movies={filterMovies}
                  setFilterMovies={setFilterMovies}
                  onAddMovie={handleAddMovie}
                  onDeleteMovie={handleDeleteMovie}
                  openPopupInfo={openPopupInfo}
                  setOpenPreloader={setOpenPreloader}
                  searchFilm={searchFilm}              
              />                
            </ProtectedRoute>
          }/>
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                movies={filterMyMovies}
                onDeleteMovie={handleDeleteMovie}
                openPopupInfo={openPopupInfo}
                setOpenPreloader={setOpenPreloader}
                searchFilm={searchMyFilm}
                getMyMovies={getMyMovies}
              />
            </ProtectedRoute>
          } />
          </Route>
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
            <Profile
              onExit={handleLogout}
              onSubmit={handleEditUser}
              error={editError}
              setError={setEditError}
            />
            </ProtectedRoute>
          } />
        </Route>
        <Route path='/signup' element={
          <ProtectedRoute loggedIn={!loggedIn}>
          <Register
            onSubmit={handleRegister}
            error={regError}
            setError={setRegError}/>            
          </ProtectedRoute>
        } />
        <Route path='/signin' element={
          <ProtectedRoute loggedIn={!loggedIn}>
          <Login
            onSubmit={handleLogin}
            error={loginError}
            setError={setLoginError}/>
          </ProtectedRoute>
        } />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <InfoPopup isOpen={isInfoPopupOpen} onClose={closeAllPopups} title={infoTitle} message={infoMessage} />
      {openPreloader && <Preloader />}
    </CurrentUserContext.Provider>
  );
}

export default App;
