/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import logoPath from '../../images/logo.svg';
import { useForm } from '../../utils/useForm';
import { ValidateTextInput } from '../../utils/validateTextInput';

function Login({ onSubmit, error, setError }) {
   const [btnName, setBtnName] = useState('Войти');
   const [disableButton, setDisableButton] = useState(true);
   const [email, handleChangeEmail, isChangedEmail, blurEmail, setBlurEmail, refreshEmail] = useForm('');
   const [emailError, checkEmailError] = ValidateTextInput(0, 200, 'email');
   const [password, handleChangePass, isChangedPass, blurPass, setBlurPass, refreshPass] = useForm('');
   const [passError, checkPassError] = ValidateTextInput(8, 30, 'text');

   useEffect(() => {
      refreshEmail('');
      refreshPass('');
      setError('');
   }, []);

   useEffect(() => { checkEmailError(email) }, [email]);
   useEffect(() => { checkPassError(password) }, [password]);   
   useEffect(() => { checkButton() }, [emailError, passError])

   function checkButton() {
      if (emailError==='' && passError==='') {
         setDisableButton(false)
      } else {
         setDisableButton(true);
      }
   }

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Проверяем...');
      onSubmit({ email, password })
        .finally(() => {
            setBtnName('Войти');
        });
   }

   return (
      <main className='main'>
         <section className='auth'>
            <Link to={'/'}><img src={logoPath} alt='Логотип' className='auth__logo' /></Link>
            <h1 className='auth__title'>Рады видеть!</h1>
            <form className='auth__form' onSubmit={handleSubmit} name='register'>
               <div className='auth__input-container'>
                  <label className = {`auth__placeholder ${isChangedEmail && 'auth__placeholder_active'}`}>E-mail</label>
                  <input
                     onBlur={setBlurEmail}
                     onChange={handleChangeEmail}
                     value={email}
                     type="email"
                     name="email"
                     autoComplete="username"
                     required
                     className={`auth__input ${(blurEmail && emailError) && 'auth__input_invalid'}`}
                     placeholder=""
                  />
                  {(blurEmail && emailError) && <div className='auth__error'>{ emailError }</div>}                  
               </div>
               <div className='auth__input-container'>
                  <label className = {`auth__placeholder ${isChangedPass && 'auth__placeholder_active'}`}>Пароль</label>
                  <input
                     onBlur={setBlurPass}
                     onChange={handleChangePass}
                     value={password}
                     type="password"
                     name="password"
                     autoComplete="current-password"
                     required
                     className={`auth__input ${(blurPass && passError) && 'auth__input_invalid'}`}
                     placeholder=""
                  />
                  {(blurPass && passError) && <div className='auth__error'>{ passError }</div>}                  
               </div>
               {error !== '' && <p className='auth__server-error'>{ error }</p>}
               <button type="submit" className="auth__button" disabled={disableButton}>{btnName}</button>
            </form>
            <div className='auth__epilog'>
               <p className='auth__question'>Ещё не зарегистрированы?</p>
               <Link to={'/signup'} className='auth__link'>Регистрация</Link>               
            </div>

         </section>
      </main>
   )
}

export default Login;