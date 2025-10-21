import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

import profileImg1 from '../assets/images/profile1.jpg';
import profileImg2 from '../assets/images/profile-moshin.png';
import profileImg3 from '../assets/images/profile-deepa.jpg';

const Review = () => {
    //  State to hold the textarea value
    const [reviewText, setReviewText] = useState('');

    const reviewsData = [
        {
            id: 1,
            name: "Arya",
            rating: 5,
            content: "Really amazing and best shirt for hot weather.",
            profileImg: profileImg1,
        },
        {
            id: 2,
            name: "Marsha",
            rating: 5,
            content: "Amazing product and great quality...delivered product before time.",
            profileImg: profileImg2,
        },
        {
            id: 3,
            name: "Snehal Lad",
            rating: 4,
            content: "Best Fashion store for my Little boy. we luv to shop from Finstery...",
            profileImg: profileImg3,
        },
    ];

    // Submit Handler function updated to clear state
    const handleSubmit = () => {
        if (!reviewText.trim()) {
            alert('Please write a review before submitting.');
            return;
        }

        // Show the alert
        alert('Review Added!');

        // Clear the textarea by resetting the state
        setReviewText('');
    };

    return (
        <div className="review1-section-container row mx-0">

            {/* Left Panel: Reviews List */}
            <div className="reviews1-left-panel col-lg-9 col-md-12 px-0">
                <h2 className="reviews1-heading">Reviews</h2>

                <div className="rose1-box">
                    {reviewsData.map((review) => (
                        <div className="review1-card" key={review.id}>
                            <div className="profile1-info">
                                <img src={review.profileImg} alt={review.name} className="profile1-image" />
                                <span className="reviewer1-name">{review.name}</span>
                            </div>

                            <div className="review1-rating-star">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className="review1-star-icon"
                                        color="#ffc107"
                                    />
                                ))}
                            </div>
                            <p className="review1-content">{review.content}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel: Write Review - Outside the rose box */}
            <div className="write-review-right-panel col-lg-3 col-md-12 px-0">
                <h2 className="write-review-heading">Write Review</h2>

                {/* Textarea remains inside the white box */}
                <div className="write-review-box">
                    {/* Bind value and onChange to the state */}
                    <textarea
                        className="review1-textarea"
                        placeholder="Type here..."
                        value={reviewText} // Controlled component: display the state value
                        onChange={(e) => setReviewText(e.target.value)} // Update state on change
                    ></textarea>
                </div>

                {/* New container for the button, placed outside the white box */}
                <div className="submit-btn-container">
                    <button
                        className="review-submit-btn"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Review;