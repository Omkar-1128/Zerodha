import React from 'react';
import './Home.css'

function Pricing() {
    return ( 
        <div>
            <div className="container PricingContainer">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <div className='PricingContent'>
                            <h3>Unbeatable pricing</h3>
                            <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                            <a href="#"> See pricing  <i class="fa-solid fa-arrow-right"></i></a>
                        </div>
                    </div>
                    <div className="col-2">
                        <p className='PricingRupee'>₹0</p>
                        <p className='text-center'> Free account opening</p>
                    </div>
                    <div className="col-2">
                        <p className='PricingRupee'>₹0</p>
                        <p className='text-center'> Free equity delivery and direct mutual funds</p>
                    </div>
                    <div className="col-2">
                        <p className='PricingRupee'>₹20</p>
                        <p className='text-center'> Intraday and F&O</p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Pricing;