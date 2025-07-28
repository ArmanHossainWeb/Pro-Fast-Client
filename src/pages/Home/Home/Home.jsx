import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Company from '../Company/Company';
import Benefit from '../Benifits/Benefit';
import BeMerchant from '../Merchant/BeMerchant';

const Home = () => {
    return (
        <div>
            <Banner></Banner>                            
            <Services></Services>
            <Company></Company>
            <Benefit></Benefit>
            <BeMerchant></BeMerchant>
        </div>
    );
};

export default Home;