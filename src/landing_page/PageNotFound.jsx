import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div>
            <div className="pageNotFound">
                <h3>404</h3>
                <h2>We couldn’t find the page you were looking for.</h2>
                <p> Visit <Link to="/" className='pageNotFoundLink'>Zerodha’s home page</Link></p>
            </div> 
        </div>
      );
}

export default PageNotFound;