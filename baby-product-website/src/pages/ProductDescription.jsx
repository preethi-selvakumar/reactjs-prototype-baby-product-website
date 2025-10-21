import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductDetailsSection from '../components/ProductDetailsSection';
import ProductTabsSection from '../components/ProductTabsSection';
import Review from '../components/Review';
import MightLike from '../components/MightLike';

const ProductDescription = () => {
    // 1. getting the id from the url
    const { id } = useParams();

    return (
        <>
            <Navbar />

            {/* main content area */}
            <div className="product-description-page container-fluid p-0">

                {/* product details section */}
                <ProductDetailsSection />

                {/* product tabs section & review component */}
                <div className="content-sections px-3">
                    {/* product tabs section */}
                    <ProductTabsSection />

                    {/* review component */}
                    <Review />
                </div>

                {/* mightlike component */}
                <div className="might-like-section-wrapper px-3">
                    <MightLike />
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ProductDescription;