import { useState, useEffect } from 'react';

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [isChangedValue, setIsChangedValue] = useState(false);
  const [blurValue, setBlurValue] = useState(false);

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  const refreshValue = (onDefault) => {
    setValues(onDefault);
    setBlurValue(false);
    setIsChangedValue(false);
  }

   useEffect(() => {
      if (values === '') {
         setIsChangedValue(false)
      } else{ setIsChangedValue(true)}
   }, [values]);    

  return [values, handleChange, isChangedValue, blurValue, setBlurValue, refreshValue];
}