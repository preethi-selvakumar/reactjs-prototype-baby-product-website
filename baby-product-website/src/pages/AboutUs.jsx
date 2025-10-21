import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import heroImage from '../assets/images/mother-and-baby-hero.jpg';
import locationMapImage from '../assets/images/city-location-map.png';

const AboutUs = () => {
    return (
        <>
            <Navbar />

            {/* Main Page Content */}
            <div className="about-us-page">
                <div className="container">

                    {/* Main Title Row */}
                    <div className="row">
                        <div className="col-12">
                            <h1 className="about-us-heading text-center">About Us</h1>
                        </div>
                    </div>

                    {/* Content Row: Left Content and Right Image */}
                    <div className="row my-5 align-items-start about-us-section">

                        {/* Left Content Area (Mission and Vision) */}
                        <div className="col-md-7 about-us-content-left">
                            <h2 className="about-us-title">Our Mission</h2>
                            <p className="about-us-description">
                                "To empower parents by providing thoughtfully designed, safe, and sustainable baby essentials that
                                make childcare easier and more enjoyable for every family." "To be the go-to online store for parents
                                seeking reliable, expertly curated baby products, ensuring peace of mind with every purchase." "To
                                offer innovative, high quality baby gear and apparel that promote infant comfort, safety, and healthy
                                development from day one."
                            </p>

                            <h2 className="about-us-title mt-5">Our Vision</h2>
                            <p className="about-us-description">
                                "To create a world where every new parent has access to the best resources and products, fostering a
                                generation of healthy, happy, and thriving children." "To become the most beloved and trusted global
                                community for parents, known for our commitment to quality, innovation, and family well-being." "To
                                revolutionize the way families shop for baby products, setting the standard for sustainability,
                                transparency, and personalized support in the industry."
                            </p>
                        </div>

                        {/* Right Image Corner with Pink Circle */}
                        <div className="col-md-5 about-us-image-right d-none d-md-flex justify-content-center">

                            {/* 1.pink circle */}
                            <div className="pink-circle"></div>

                            {/* 2. baby image */}
                            <img
                                src={heroImage}
                                alt="Mother and Baby"
                                className="about-us-hero-image"
                            />
                        </div>

                    </div>

                    {/* Map Image Row */}
                    <div className="row my-5">
                        <div className="col-12">
                            <div className="location-map-container">
                                <img
                                    src={locationMapImage}
                                    alt="Location Map"
                                    className="location-map-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default AboutUs;