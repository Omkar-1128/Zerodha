import React from 'react';
import './styles.css'

function Openaccount({heading , description}) {
    return ( 
        <div className='container text-center'>
            <h2 className='accountHeading'>{heading}</h2>
            <p className='accountDescription'>{description}</p>
            <button className='mt-3 btn btn-primary accountButton'><b>Sign up for free</b></button>
        </div>
     );
}

export default Openaccount;