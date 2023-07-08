import React from 'react';
import './AboutMe.css';
import photoLink from '../../images/photo.jpg';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {

   return (
      <section className='about' id='about'>
         <h2 className='project__title'>Студент</h2>
         <div className='about__container'>
            <div className='about__item'>
               <div>
                  <h3 className='about__name'>Анастасия</h3>
                  <h4 className='about__description'>Фронтенд-разработчик, 35 лет</h4>
                  <p className='about__intro'>
                     Я родилась в Волгограде и закончила ВолгГТУ. Более 10 лет я проработала финансистом, 
                     после чего занялась развитием банковских  IT-проектов. Сейчас работаю бизнес-аналитиком в IT-компании.
                     Год назад я начала изучать веб-разработку. Она помогает мне в моей текущей работе для создания небольших приложений,
                     а также открывают простор для развития собственных проектов.
                  </p>                  
               </div>
               <a className='about__gitlink' href='https://github.com/AsyaAleksandrova' target={'_blank'} rel="noreferrer">Github</a>
            </div>
            <div className='about__item_photo'>
               <img src={photoLink} alt='Фото' className='about__photo'/>
            </div>
         </div>
         <h3 className='about__subtitle'>Портфолио</h3>
         <Portfolio/>
      </section>
   )
}

export default AboutMe;