import React from 'react';
import './Portfolio.css';

function Portfolio() {

   return (
       <ul className='about__worklist'>
         <li>
            <a href='https://github.com/AsyaAleksandrova/how-to-learn' target={'_blank'} rel="noreferrer" className='about__work'>
               <span>Статичный сайт</span>
               <span className='about__arrow'>&#8594;</span>               
            </a>
         </li>
         <li>
            <a href='https://github.com/AsyaAleksandrova/russian-travel' target={'_blank'} rel="noreferrer" className='about__work'> 
               <span>Адаптивный сайт</span>
               <span className='about__arrow'>&#8594;</span>                  
            </a>
         </li>
         <li>
            <a href='https://github.com/AsyaAleksandrova/react-mesto-api-full' target={'_blank'} rel="noreferrer" className='about__work'>
               <span>Одностраничное приложение</span>
               <span className='about__arrow'>&#8594;</span>                  
            </a>
         </li>
         <li>
            <a href='https://github.com/AsyaAleksandrova/homunity' target={'_blank'} rel="noreferrer" className='about__work about__work_last'>
               <span>Социальная сеть<span className='about__work_note'>&emsp;(в&nbsp;разработке)</span></span>
               <span className='about__arrow'>&#8594;</span>
            </a>
         </li>
      </ul>
   )
}

export default Portfolio;