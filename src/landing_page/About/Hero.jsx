import React from 'react';
import './style.css';

function Hero() {
    return ( 
        <div>
            <div className="container">
            <div className="container  Hero-heading text-center ">
                <h3>We pioneered the discount broking model in India.</h3>
                <h3>Now, we are breaking ground with our technology.</h3>
            </div>
            <hr />
            <div className="row gx-5 justify-content-center Hero-content">
                <div className="col-4">
                    <p>We kick-started operations on the 15th of August, 2010 with the goal of breaking all barriers that traders and investors face in India in terms of cost, support, and technology. We named the company Zerodha, a combination of Zero and "Rodha", the Sanskrit word for barrier.</p>
                    <p>Today, our disruptive pricing models and in-house technology have made us the biggest stock broker in India.</p>
                    <p>Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment platforms, contributing over 15% of all Indian retail trading volumes.</p>
                </div>
                <div className="col-4">
                    <p>In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.</p>
                    <p><a style={{textDecoration:"none" , color:"#387ed1"}} href="#">Rainmatter</a>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.</p>
                    <p>And yet, we are always up to something new every day. Catch up on the latest updates on our <a style={{textDecoration:"none" , color:"#387ed1"}} href="#">blog</a> or see what the media is <a style={{textDecoration:"none" , color:"#387ed1"}} href="#">saying about us</a> or learn more about our business and product <a style={{textDecoration:"none" , color:"#387ed1"}} href="#">philosophies</a>.</p>
                </div>
            </div>
            </div>
        </div>
     );
}

export default Hero;