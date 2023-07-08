import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NoPage.css';

function NoPage() {
   const navigate = useNavigate();
   const back = () => navigate(-1);

   return (
      <main className='main'>
         <section className='error'>
            <h1 className='error__title'>404</h1>
            <h2 className='error__subtitle'>Страница не найдена</h2>
            <button onClick={back} className='error__back'>Назад</button>
         </section>

      </main>
   )
}

export default NoPage;