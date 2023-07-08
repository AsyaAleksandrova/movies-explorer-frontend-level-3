import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import iconPath from '../../images/icon__profile.svg';

function Navigation() {
   const [burgerIsOpen, setBurgerIsOpen] = useState(false);

   const handleOpenMenu = () => {
      setBurgerIsOpen(!burgerIsOpen);
   }

   const closeMenu = () => {
      setBurgerIsOpen(false);
   }

   return (
      <nav className='menu'>
         {burgerIsOpen && <div className='menu__underlay'></div>}
         <label className={`${burgerIsOpen? 'menu__burger_open' : 'menu__burger'}`}><button type='button' onClick={handleOpenMenu} className='menu__button' /></label>
         <ul className={`menu__list ${burgerIsOpen && 'menu__list_open'}`}>
            <li className='menu__block'>
               <NavLink to={'/'} onClick={closeMenu} className='menu__item menu__item_main'>
                  {({ isActive }) => (<p className={isActive ? 'menu__text menu__text_active' :'menu__text'}>Главная</p>)}
               </NavLink>
               <NavLink to={'/movies'} onClick={closeMenu} className={`menu__item`}>
                  {({ isActive }) => (<p className={isActive ? 'menu__text menu__text_active' :'menu__text'}>Фильмы</p>)}
               </NavLink>
               <NavLink to={'/saved-movies'} onClick={closeMenu} className='menu__item'>
                  {({ isActive }) => (<p className={isActive ? 'menu__text menu__text_active' :'menu__text'}>Сохранённые фильмы</p>)}
               </NavLink>
            </li>
            <li >
               <NavLink to={'/profile'} onClick={closeMenu} className='menu__item menu__item_profile'>
                  {({ isActive }) => (
                     <>
                        <p className={isActive ? 'menu__text menu__text_active' : 'menu__text'}>Аккаунт</p>
                        <img src={iconPath} alt='Профиль' className='menu__profile-icon' />
                     </>
                  )}
               </NavLink>
            </li>
         </ul>
      </nav>
   )
}

export default Navigation;