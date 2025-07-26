import React from 'react';
import './Home.css';

function Education() {
    return ( 
        <div>
            <div className="container">
                <div className="row justify-content-evenly align-items-center EducationContainer">
                    <div className="col-md-4">
                        <img className='EducationImage' src="/Media/images/education.svg" alt="" />
                    </div>
                    <div className="col-md-5">
                        <div className='PricingContent'>
                            <h3>Free and open market education</h3>
                            <p className='mt-3'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                            <a href="#"> Varsity <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                        <div className='PricingContent mt-5'>
                            <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                            <a href="#"> TradingQ&A  <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>   
        </div>
     );
}

export default Education;