import React from 'react';
import './Home.css';
import Openaccount from '../Openaccount';

function Hero() {
    return ( 
        <div>
            <div className="container">
                <div className="row HeroContainer mt-5 mb-5">
                    <img className='HeroImg' src="/Media/images/homeHero.png" alt="Home Hero image" />
                </div>
                <Openaccount heading={"Invest in everything"} description={"Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more."}/>
            </div>
        </div>
     );
}

export default Hero;