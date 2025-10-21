import React from 'react';
import Navbar from '../components/Navbar';
import Categories from '../components/Categories';
import NewArrivals from '../components/NewArrivals';
import ProductCarousel from '../components/ProductCarousel';
import TopBrands from '../components/TopBrands';
import CustomerReviews from '../components/CustomerReviews';
import Footer from '../components/Footer';
import HomeBanner from '../components/HomeBanner';

const Home = () => {
    return (
        <div>
            <Navbar />
            <HomeBanner />
            <Categories />
            <NewArrivals />
            <ProductCarousel />
            <TopBrands />
            <CustomerReviews />
            <Footer />
        </div>
    );
};

export default Home;