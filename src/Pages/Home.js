import React from "react";
import Blog from "../Components/Blogs/Blog";
import Banner from "../Components/Home/Banner";
import BusinessSummary from "../Components/Home/BusinessSummary";
import ContactUs from "../Components/Home/ContactUs";
import Frequency from "../Components/Home/Frequescy";
import GoogleLocationMap from "../Components/Home/GoogleLocationMap";
import InfoFooter from "../Components/Home/InfoFooter";
import OfferDateline from "../Components/Home/OfferDateline";
import Products from "../Components/Home/Products";
import Review from "../Components/Home/Review";
import Subscribe from "../Components/Home/Subscribe";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
import PageTitle from "../Components/Shared/PageTitle";
// import Hero from "../Components/Home/Hero";

const Home = () => {
  return (
    <div className="mt-7 pt-6">
      <PageTitle title="Home"></PageTitle>
      {/* <Hero /> */}
      <Banner />
      {/* <LoginCopy /> */}
      <Products />
      <BusinessSummary />
      <Review />
      <WhyChooseUs />
      <OfferDateline />
      <Frequency />
      <Blog />
      <Subscribe />
      <GoogleLocationMap />
      <ContactUs />
      <InfoFooter />
    </div>
  );
};

export default Home;
