import React from 'react';
import './AboutProject.css'

function AboutProject() {

   return (
      <section className='project' id='project'>
         <h2 className='project__title'>О проекте</h2>
         <div className='project__container'>
            <div className='project__block'>
               <h3 className='project__subtitle'>Дипломный проект включал&nbsp;5&nbsp;этапов</h3>
               <p className='project__description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>               
            </div>
            <div className='project__block'>
               <h3 className='project__subtitle'>На выполнение диплома ушло&nbsp;5&nbsp;недель</h3>
               <p className='project__description'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>               
            </div>
         </div>
         <div className='project__chart'>
            <p className='project__cell project__cell_active'>1 неделя</p>
            <p className='project__cell'>4 недели</p>
            <p className='project__sign'>Back-end</p>
            <p className='project__sign'>Front-end</p>
         </div>
      </section>
   )
}

export default AboutProject;