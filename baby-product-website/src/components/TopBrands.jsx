import React from 'react';

import johnsonBabyLogo from '../assets/images/johnson-baby-logo.jpg';
import pampersLogo from '../assets/images/pampers-logo.png';
import babykingLogo from '../assets/images/babyking-logo.png';
import kidlonLogo from '../assets/images/kidlon-logo.png';
import fancyFluffLogo from '../assets/images/fancyfluff-logo.jpg';

const TopBrands = () => {
    const brandLogos = [
        { id: 1, src: johnsonBabyLogo, alt: 'Johnson\'s Baby' },
        { id: 2, src: pampersLogo, alt: 'Pampers' },
        { id: 3, src: babykingLogo, alt: 'Babyking' },
        { id: 4, src: kidlonLogo, alt: 'Kidlon' },
        { id: 5, src: fancyFluffLogo, alt: 'Fancy Fluff' },
        // Add the same logos again to create a seamless loop for animation
        { id: 6, src: johnsonBabyLogo, alt: 'Johnson\'s Baby' },
        { id: 7, src: pampersLogo, alt: 'Pampers' },
        { id: 8, src: babykingLogo, alt: 'Babyking' },
        { id: 9, src: kidlonLogo, alt: 'Kidlon' },
        { id: 10, src: fancyFluffLogo, alt: 'Fancy Fluff' },
    ];

    return (
        <div className="top-brands-section container-fluid">
            <div className="row">
                <div className="col-12 text-center">
                    <h2 className="top-brands-heading">Top Brands</h2>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 top-brands-carousel-wrapper">
                    <div className="top-brands-carousel-container">
                        <div className="top-brands-carousel-inner">
                            {brandLogos.map(logo => (
                                <div key={logo.id} className="top-brands-logo-box">
                                    <img src={logo.src} alt={logo.alt} className="top-brands-logo-img" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBrands;