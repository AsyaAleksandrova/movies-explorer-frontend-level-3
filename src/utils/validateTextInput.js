import { useState } from 'react';

export function ValidateTextInput(minLingth, maxLength, typeInput) {
   const [error, setError] = useState('Поле не может быть пустым');

   const checkError = (input) => {
      if (input !== '') {
         if (typeInput === 'email') {
            const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(input) === false) {
               setError('Некорректнный Email')
            } else setError('')         
         } else {
            const reg2 = /[^a-zа-яё-\s]/gi;
            if (input.length < minLingth) {
               setError(`Поле не может быть меньше ${minLingth} символов`);
            } else if (input.length > maxLength) {
               setError(`Поле не может быть больше ${maxLength} символов`);
            } else if ((typeInput === 'name') && (input.search(reg2) !== (-1))) {
               setError(`Поле должно содержать только буквы, пробел или дефис`);
            } else {
               setError('');
            }               
         }
      }
      else {
         setError('Поле не может быть пустым');
      }        
   }

  return [error, checkError];
}