import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './NavTab.css'

function NavTab() {

   return (
      <nav className='navtab'>
         <ul className='navtab__list'>
            <li><HashLink to='#project' className='navtab__item'>О проекте</HashLink></li>
            <li><HashLink to='#techs' className='navtab__item'>Технологии</HashLink></li>
            <li><HashLink to='#about' className='navtab__item'>Студент</HashLink></li>
         </ul>
      </nav>
   )
}

export default NavTab;