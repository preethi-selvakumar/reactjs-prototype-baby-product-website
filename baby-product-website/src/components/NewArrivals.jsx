import React from 'react';

import image1 from '../assets/images/cotton-dress.png';
import image2 from '../assets/images/sandal.png';
import image3 from '../assets/images/disney-slippers.png';
import image4 from '../assets/images/bath-toys.png';
import image5 from '../assets/images/diapers.png';
import image6 from '../assets/images/stroller2.png';
import image7 from '../assets/images/stroller-cabin.png';
import image8 from '../assets/images/stroller1.png';


const products = [
    {
        id: 1,
        image: image1,
        title: 'Cotton Seersucker Frill Dress',
        mrp: '2,099',
    },
    {
        id: 2,
        image: image2,
        title: 'Cute walk by Babyhug',
        mrp: '936',
    },
    {
        id: 3,
        image: image3,
        title: 'Babyoye Disney',
        mrp: '590',
    },
    {
        id: 4,
        image: image4,
        title: 'Bath Squeeze Toys',
        mrp: '237',
    },
    {
        id: 5,
        image: image5,
        title: 'Advanced Pant Style Diapers Extra Large (XL)',
        mrp: '1,185',
    },
    {
        id: 6,
        image: image6,
        title: 'Comfy Ride Stroller With Reversible Handle',
        mrp: '3,180',
    },
    {
        id: 7,
        image: image7,
        title: 'Runway Cabin Stroller in Linen Fabric',
        mrp: '9,730',
    },
    {
        id: 8,
        image: image8,
        title: 'Cocoon Stroller Mosquito Net & Reversible Handle',
        mrp: '3,190',
    },
];

const NewArrivals = () => {
    return (
        <div className="new-arrivals-section container-fluid">
            <h2 className="new-arrivals-heading">New Arrivals</h2>
            <div className="row new-arrivals-row">
                {products.slice(0, 4).map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={product.id}>
                        <div className="new-arrivals-card">
                            <div className="new-arrivals-image-container">
                                <img src={product.image} alt={product.title} className="new-arrivals-product-image" />
                            </div>
                            <div className="new-arrivals-info">
                                <p className="new-arrivals-product-title">{product.title}</p>
                                <div className="new-arrivals-price-action">
                                    <p className="new-arrivals-product-mrp">MRP: ₹ {product.mrp}</p>
                                    <button className="new-arrivals-buy-button">Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row new-arrivals-row">
                {products.slice(4, 8).map((product) => (
                    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4" key={product.id}>
                        <div className="new-arrivals-card">
                            <div className="new-arrivals-image-container">
                                <img src={product.image} alt={product.title} className="new-arrivals-product-image" />
                            </div>
                            <div className="new-arrivals-info">
                                <p className="new-arrivals-product-title">{product.title}</p>
                                <div className="new-arrivals-price-action">
                                    <p className="new-arrivals-product-mrp">MRP: ₹ {product.mrp}</p>
                                    <button className="new-arrivals-buy-button">Buy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;