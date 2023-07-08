import React from 'react';
import './Preloader.css';
import { MagnifyingGlass } from 'react-loader-spinner';

function Preloader() {

   return (
      <div className='preloader'>
         <MagnifyingGlass
            visible={true}
            height="150"
            width="150"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor = 'transparent'
            color = '#4285f4'
         />
      </div>
   )
}

export default Preloader;