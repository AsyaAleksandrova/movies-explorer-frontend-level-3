/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';
import logoPath from '../../images/logo.svg';
import { useForm } from '../../utils/useForm';
import { ValidateTextInput } from '../../utils/validateTextInput';

function Register({ onSubmit, error, setError }) {
   const [btnName, setBtnName] = useState('Зарегистрироваться');
   const [disableButton, setDisableButton] = useState(true);
   const [name, handleChangeName, isChangedName, blurName, setBlurName, refreshName] = useForm('');
   const [nameError, checkNameError] = ValidateTextInput(2, 30, 'name');
   const [email, handleChangeEmail, isChangedEmail, blurEmail, setBlurEmail, refreshEmail] = useForm('');
   const [emailError, checkEmailError] = ValidateTextInput(0, 200, 'email');
   const [password, handleChangePass, isChangedPass, blurPass, setBlurPass, refreshPass] = useForm('');
   const [passError, checkPassError] = ValidateTextInput(8, 30, 'text');

   useEffect(() => {
      refreshName('');
      refreshEmail('');
      refreshPass('');
      setError('');
   }, []);

   useEffect(() => { checkNameError(name) }, [name]);
   useEffect(() => { checkEmailError(email) }, [email]);
   useEffect(() => { checkPassError(password) }, [password]);   
   useEffect(() => { checkButton() }, [nameError, emailError, passError])

   function checkButton() {
      if (nameError==='' && emailError==='' && passError==='') {
         setDisableButton(false)
      } else {
         setDisableButton(true);
      }
   }

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Проверяем...');
      onSubmit({ name, email, password })
        .finally(() => {
         setBtnName('Зарегистрироваться');
        });
   }   

   return (
      <main className='main'>
         <section className='auth'>
            <Link to={'/'}><img src={logoPath} alt='Логотип' className='auth__logo' /></Link>
            <h1 className='auth__title'>Добро пожаловать!</h1>
            <form className='auth__form' onSubmit={handleSubmit} name='register'>
               <div className='auth__input-container'>
                  <label className = {`auth__placeholder ${isChangedName && 'auth__placeholder_active'}`}>Имя</label>
                  <input
                     onBlur={setBlurName}
                     onChange={handleChangeName}
                     value={name}
                     type="text"
                     name="name"
                     required
                     minLength="2"
                     maxLength="30"
                     className={`auth__input ${(blurName && nameError) && 'auth__input_invalid'}`}
                     placeholder=""
                  />
                  {(blurName && nameError) && <div className='auth__error'>{ nameError }</div>}                  
               </div>
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
                     autoComplete="new-password"
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
               <p className='auth__question'>Уже зарегистрированы?</p>
               <Link to={'/signin'} className='auth__link'>Войти</Link>               
            </div>
         </section>
      </main>
   )
}

export default Register;