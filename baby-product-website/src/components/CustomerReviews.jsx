import React from 'react';

import { FaStar } from 'react-icons/fa';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';

import boskyProfile from '../assets/images/profile-bosky.jpg';
import tulipProfile from '../assets/images/profile-tulip.jpg';
import deepaProfile from '../assets/images/profile-deepa.jpg';
import moshinProfile from '../assets/images/profile-moshin.png';

const CustomerReviews = () => {
    const reviews = [
        {
            id: 1,
            name: 'Bosky',
            image: boskyProfile,
            rating: 5,
            comment: 'Very fast service and products are genuine. Definitely I am satisfied !',
            likes: 0,
            dislikes: 5
        },
        {
            id: 2,
            name: 'Tulip',
            image: tulipProfile,
            rating: 5,
            comment: 'Amazing products. Reasonable prices. Great customer service. Cheers !!!!',
            likes: 0,
            dislikes: 5
        },
        {
            id: 3,
            name: 'Deepa',
            image: deepaProfile,
            rating: 5,
            comment: 'Great range of products right from new-born essentials... Excellent product quality and delivery',
            likes: 0,
            dislikes: 5
        },
        {
            id: 4,
            name: 'Moshin',
            image: moshinProfile,
            rating: 5,
            comment: 'Great site for baby product. I\'m shopping here since 2012. The quality of product and services is never changed. Keep it up',
            likes: 0,
            dislikes: 5
        },
    ];

    return (
        <div className="customer-reviews-section">
            <div className="container-fluid customer-reviews-container">
                <h2 className="section-heading text-center">Our happy customer</h2>

                <div className="row reviews-grid">
                    {reviews.map(review => (
                        <div key={review.id} className="col-lg-3 col-md-6 col-sm-12 mb-4 review-column">
                            <div className="review-card">
                                <div className="profile-area">
                                    <div className="profile-image-wrapper">
                                        <img src={review.image} alt={review.name} className="profile-image" />
                                    </div>
                                    <h3 className="customer-name">{review.name}</h3>
                                </div>
                                <div className="rating-stars">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <FaStar key={i} className="star-icon" />
                                    ))}
                                </div>
                                <p className="customer-comment">{review.comment}</p>
                                <div className="feedback-actions">
                                    <div className="feedback-item">
                                        <AiOutlineLike className="like-icon" />
                                        <span className="feedback-count">{review.likes}</span>
                                    </div>
                                    <div className="feedback-item">
                                        <AiOutlineDislike className="dislike-icon" />
                                        <span className="feedback-count">{review.dislikes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="view-more-wrapper">
                    <button className="view-more-button">View More</button>
                </div>
            </div>
        </div>
    );
};

export default CustomerReviews;
