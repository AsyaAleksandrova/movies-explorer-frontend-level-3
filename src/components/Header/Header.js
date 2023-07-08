import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Header.css';
import Navigation from '../Navigation/Navigation';
import logoPath from '../../images/logo.svg';

function Header({loggedIn}) {

   return (
      <>
         <header className='header'>
            <Link to={'/'}><img src={logoPath} alt='Логотип' className='header__logo' /></Link>
            {loggedIn && <Navigation />}
            <div>
               {!loggedIn && <Link to={'/signup'}>
                  <button type='button' className='header__button header__button_type_signup'>Регистрация</button>
               </Link>}
               {!loggedIn && <Link to={'/signin'}>
                  <button type='button' className='header__button header__button_type_signin'>Войти</button>
               </Link>}            
            </div>
         </header>
         <Outlet/>      
      </>
   )
}

export default Header;