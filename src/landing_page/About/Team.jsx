import React from 'react';

function Team() {
    return ( 
        <div>
            <div className="container Team-Content">
                <h3 className='text-center'>People</h3>
                <div className="row gx-5 justify-content-center Team-row">
                    <div className="col-3 text-center">
                        <img className='ceo-image  mx-auto img-thumbnail' src="\Media\images\me.jpg" alt="CEO image" />
                        <h5 className='mt-3'>Omkar Shelke</h5>
                        <p className='mt-2'>Founder, CEO</p>
                    </div>
                    <div className="col-5 Team-image-content">
                        <p className='mt-3'>Nithin bootstrapped and founded Zerodha in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, Zerodha has changed the landscape of the Indian broking industry.</p>
                        <p className='mt-3'>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC).</p>
                        <p className='mt-3'>Playing basketball is his zen.</p>
                        <p className='mt-3'>Connect on <a style={{textDecoration:"none" , color:"#387ed1"}} href="#">Homepage</a> / <a style={{textDecoration:"none" , color:"#387ed1"}} href="#">TradingQnA</a> / <a style={{textDecoration:"none" , color:"#387ed1"}} href="#">Twitter</a></p>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Team;