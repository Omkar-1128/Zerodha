import React from 'react';
import Hero from './Hero';
import Charges from './Charges';
import Pricing from './Prices';
import Brokerage from './Brokerage';

function PricingPage() {
    return ( 
        <>
            <Hero />
            <Pricing />
            <Brokerage />
            <Charges /> 
        </>
     );
}

export default PricingPage;