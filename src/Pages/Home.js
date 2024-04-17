import React from "react";
import Blog from "../Components/Blogs/Blog";
import Banner from "../Components/Home/Banner";
import BusinessSummary from "../Components/Home/BusinessSummary";
import ContactUs from "../Components/Home/ContactUs";
import Frequescy from "../Components/Home/Frequescy";
import GoogleLocationMap from "../Components/Home/GoogleLocationMap";
import InfoFooter from "../Components/Home/InfoFooter";
import OfferDateline from "../Components/Home/OfferDateline";
import Products from "../Components/Home/Products";
import Review from "../Components/Home/Review";
import Subscribe from "../Components/Home/Subscribe";
import WhyChooseUs from "../Components/Home/WhyChooseUs";
import PageTitle from "../Components/Shared/PageTitle";

const Home = () => {
  return (
    <div className="mt-8 pt-8">
      <PageTitle title="Home"></PageTitle>
      <Banner />
      <Products />
      <BusinessSummary />
      <Review />
      <WhyChooseUs />
      <OfferDateline />
      <Frequescy />
      <Blog />
      <ContactUs />
      <Subscribe />
      <GoogleLocationMap />
      <InfoFooter />
    </div>
  );
};

export default Home;
