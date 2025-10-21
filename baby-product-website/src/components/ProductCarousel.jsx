import React, { useState } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

import stroller1 from '../assets/images/stroller1.png';
import stroller2 from '../assets/images/stroller2.png';
import sandal from '../assets/images/sandal.png';
import dough from '../assets/images/dough.png';
import tricycle1 from '../assets/images/tricycle1.png';
import tricycle2 from '../assets/images/tricycle2.png';
import carseat1 from '../assets/images/carseat1.png';
import carseat2 from '../assets/images/carseat2.png';

const productsPage1 = [
    { id: 1, image: stroller1, name: 'Cocoon Stroller Mosquito Net & Reversible Handle' },
    { id: 2, image: stroller2, name: 'Comfy Ride Stroller With Reversible Handle' },
    { id: 3, image: sandal, name: 'Cute Walk by Babyhug' },
    { id: 4, image: dough, name: 'My Fun Dough Jumbo Return Gift Set Tub' },
];

const productsPage2 = [
    { id: 5, image: tricycle1, name: 'Little Olive Kids Premium Tricycle' },
    { id: 6, image: tricycle2, name: 'Baybee Blaze 4-in-1 Baby Tricycle for Kids' },
    { id: 7, image: carseat1, name: 'Expedition 3 in 1 Convertible Car Seat with Recliner' },
    { id: 8, image: carseat2, name: 'Jack N Jill Grand Isofix Baby Car Seat' },
];

const ProductCarousel = () => {
    const [currentPage, setCurrentPage] = useState(0); // 0 for page 1, 1 for page 2

    const handleNext = () => {
        setCurrentPage((prevPage) => (prevPage === 0 ? 1 : 0));
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => (prevPage === 1 ? 0 : 1));
    };

    const currentProducts = currentPage === 0 ? productsPage1 : productsPage2;

    return (
        <div className="carousel-main-container">
            <h3 className="carousel-title">Top selling</h3>
            <div className="carousel-wrapper container-fluid">
                {currentPage === 1 && (
                    <button className="carousel-arrow left-arrow" onClick={handlePrev}>
                        <IoIosArrowBack />
                    </button>
                )}
                <div className="row carousel-row">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="col-6 col-md-3 carousel-col-item">

                            {/* Image Container */}
                            <div className="card-image-container">
                                <img src={product.image} alt={product.name} className="product1-image" />
                            </div>

                            {/* Details Container */}
                            <div className="card-details-standalone">
                                <p className="product1-name">{product.name}</p>
                                <button className="shop1-now-btn">Shop Now</button>
                            </div>

                        </div>
                    ))}
                </div>
                {currentPage === 0 && (
                    <button className="carousel-arrow right-arrow" onClick={handleNext}>
                        <IoIosArrowForward />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCarousel;