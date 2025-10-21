import React, { useState, useEffect } from 'react';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa';

import HomeSecondBanner from './HomeSecondBanner';

import strollerBannerImage1 from '../assets/images/stroller3.png';
import strollerBannerImage2 from '../assets/images/stroller4.png';
import carseatBannerImage from '../assets/images/carseat.png';
import bedsBannerImage from '../assets/images/beds1.png';
import backpackBannerImage from '../assets/images/accessories1.png';


const HomeBanner = () => {
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

    const banners = [
        {
            id: 1,
            images: [strollerBannerImage1, strollerBannerImage2, carseatBannerImage],
            textContent: {
                discount: 'Flat 30% Off',
                tagline: 'New launch',
                description: 'Strollers, car seats & Much more',
                shopLink: '/shop/new-launch'
            },
        },
        {
            id: 2,
            images: [bedsBannerImage, backpackBannerImage],
            textContent: {
                discount: 'Flat 30% Off',
                tagline: 'Baby beds &',
                description: 'Accessories',
                shopLink: '/shop/baby-beds'
            },
        },
    ];

    const totalBanners = banners.length;
    const currentBanner = banners[currentBannerIndex];
    const AUTOPLAY_INTERVAL = 5000;

    // Automatic Slider Logic (Looping)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentBannerIndex(prevIndex => (prevIndex + 1) % totalBanners);
        }, AUTOPLAY_INTERVAL);

        return () => clearInterval(intervalId);
    }, [totalBanners]);


    // Arrow Click Handlers (Non-Looping - Original Functionality)
    const goToNextBanner = () => {
        if (currentBannerIndex < totalBanners - 1) {
            setCurrentBannerIndex(currentBannerIndex + 1);
        }
    };

    const goToPrevBanner = () => {
        if (currentBannerIndex > 0) {
            setCurrentBannerIndex(currentBannerIndex - 1);
        }
    };

    // Conditional Rendering Logic
    const showLeftArrow = currentBannerIndex > 0;
    const showRightArrow = currentBannerIndex < totalBanners - 1;

    // Banner wrapper class
    const wrapperClasses = `home-banner-wrapper ${currentBannerIndex === 1 ? 'banner-style-2' : ''}`;


    // Banner content rendering logic
    const renderBannerContent = () => {
        if (currentBanner.id === 1) {
            return (
                <div className="row home-banner-row-flex">
                    {/* Banner 1 Content */}
                    <div className="col-lg-7 col-md-6 col-sm-12 home-banner-images-col">
                        <div className="home-banner-images-flex">
                            {currentBanner.images.map((imgSrc, index) => (
                                <div key={index} className="home-banner-image-wrapper">
                                    <img
                                        src={imgSrc}
                                        alt={`Banner item ${index + 1}`}
                                        className="home-banner-image"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-6 col-sm-12 home-banner-text-col">
                        <div className="home-banner-text-content">
                            <div className="home-banner-discount-box">
                                {currentBanner.textContent.discount}
                            </div>
                            <h3 className="home-banner-tagline">
                                {currentBanner.textContent.tagline}
                            </h3>
                            <p className="home-banner-description">
                                {currentBanner.textContent.description}
                            </p>
                            <a href={currentBanner.textContent.shopLink} className="home-banner-shop-btn">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        if (currentBanner.id === 2) {
            return <HomeSecondBanner bannerData={currentBanner} />;
        }
        return null;
    };

    // New state to handle transition class
    const [transitionClass, setTransitionClass] = useState('fade-in');

    // useEffect to handle the transition logic
    useEffect(() => {
        // When index changes, fade out and then fade in
        setTransitionClass('fade-out');
        const timer = setTimeout(() => {
            setTransitionClass('fade-in');
        }, 300); // 300ms is the duration of fade-out

        // Cleanup timer
        return () => clearTimeout(timer);
    }, [currentBannerIndex]);


    return (
        // Main container
        <div className="home-banner-section">
            <div className={wrapperClasses}>

                {/* Transition Wrapper: This wraps the banner content */}
                <div key={currentBannerIndex} className={`banner-content-wrapper ${transitionClass}`}>
                    {renderBannerContent()}
                </div>

                {/* Navigation Arrows (Conditional Rendering) */}
                {totalBanners > 1 && (
                    <>
                        {/* Left Arrow: Visible only for second banner */}
                        {showLeftArrow && (
                            <button
                                className="home-banner-nav-arrow home-banner-arrow-left"
                                onClick={goToPrevBanner}
                                aria-label="Previous banner"
                            >
                                <FaAngleLeft />
                            </button>
                        )}

                        {/* Right Arrow: Visible only for first banner */}
                        {showRightArrow && (
                            <button
                                className="home-banner-nav-arrow home-banner-arrow-right"
                                onClick={goToNextBanner}
                                aria-label="Next banner"
                            >
                                <FaAngleRight />
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HomeBanner;
