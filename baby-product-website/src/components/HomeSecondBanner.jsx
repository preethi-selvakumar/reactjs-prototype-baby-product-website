import React from 'react';
import DiscountBgImage from '../assets/images/diagonal-box.png';

const HomeSecondBanner = ({ bannerData }) => {
    const { images, textContent } = bannerData;

    return (
        <div className="row home-banner-row-flex">

            {/* Left Image Column */}
            <div className="col-lg-5 col-md-4 col-sm-4 home-second-images-col">
                <div className="home-second-images-flex">
                    <div className="home-second-image-wrapper">
                        <img
                            src={images[0]}
                            alt="Baby Bed"
                            className="home-second-image"
                        />
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div className="col-lg-2 col-md-4 col-sm-4 home-second-text-col">
                <div className="home-second-text-content">

                    <img
                        src={DiscountBgImage}
                        alt="Discount Background"
                        className="home-second-discount-bg-img"
                    />

                    <div className="home-second-discount-text">
                        {textContent.discount}
                    </div>

                    <h3 className="home-second-tagline">
                        {textContent.tagline}
                    </h3>
                    <p className="home-second-description">
                        {textContent.description}
                    </p>
                    <a href={textContent.shopLink} className="home-banner-shop-btn">
                        Shop Now
                    </a>
                </div>
            </div>

            {/* Right Image Column */}
            <div className="col-lg-5 col-md-4 col-sm-4 home-second-images-col">
                <div className="home-second-images-flex">
                    <div className="home-second-image-wrapper">
                        <img
                            src={images[1]}
                            alt="Accessories"
                            className="home-second-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeSecondBanner;