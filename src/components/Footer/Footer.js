import React from 'react';
import { Outlet } from 'react-router-dom';
import './Footer.css';

function Footer() {

   return (
      <>
         <Outlet/>
         <footer className='footer'>
            <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
            <div className='footer__container'>
               <p className='footer__copy'>&copy; 2023</p>
               <div className='footer__links'>
                  <a className='footer__link' href='https://practicum.yandex.ru' target={'_blank'} rel="noreferrer">Яндекс Практикум</a>
                  <a className='footer__link' href='https://github.com/yandex-praktikum?tab=repositories' target={'_blank'} rel="noreferrer">Github</a>
               </div>
            </div>
         </footer>      
      </>

   )
}

export default Footer;