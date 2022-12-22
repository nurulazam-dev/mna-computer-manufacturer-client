import React from 'react';
import Banner from '../Components/Home/Banner';
import BusinessSummary from '../Components/Home/BusinessSummary';
import ContactUs from '../Components/Home/ContactUs';
import Frequescy from '../Components/Home/Frequescy';
import GoogleLocationMap from '../Components/Home/GoogleLocationMap';
import InfoFooter from '../Components/Home/InfoFooter';
import OfferDateline from '../Components/Home/OfferDateline';
import OurStock from '../Components/Home/OurStock';
import Products from '../Components/Home/Products';
import Review from '../Components/Home/Review';
import Subscribe from '../Components/Home/Subscribe';
import WhyChooseUs from '../Components/Home/WhyChooseUs';

const Home = () => {
    return (
        <div className='mt-8 pt-8'>
            <Banner />
            <Products />
            <BusinessSummary />
            <Review />
            <WhyChooseUs />
            <OfferDateline />
            <Frequescy />
            <OurStock />
            <ContactUs />
            <Subscribe />
            <GoogleLocationMap />
            <InfoFooter />
        </div>
    );
};

export default Home;