import React from 'react';
import Banner from '../Banner/Banner';
import Services from '../Services/Services';
import Company from '../Company/Company';

const Home = () => {
    return (
        <div>
            <Banner></Banner>                            
            <Services></Services>
            <Company></Company>
        </div>
    );
};

export default Home;