import React from 'react';

import rainbowBabyImage from '../assets/images/rainbow_baby.jpg';
import babyDrySkinImage from '../assets/images/baby_dry_skin.jpg';
import raisinsForBabiesImage from '../assets/images/raisins.jpg';
import herniaInBabiesImage from '../assets/images/hernia.webp';

// Blog Card Component
const BlogCard = ({ title, content, imageSrc }) => {
    return (
        <div className="col-lg-6 mb-4">
            <div className="blog-card-container">
                <div className="row g-0 blog-card-row">
                    {/* Left side: Image */}
                    <div className="col-md-4">
                        <img src={imageSrc} className="blog-card-img" alt={title} />
                    </div>
                    {/* Right side: Content and Button */}
                    <div className="col-md-8">
                        <div className="blog-card-body">
                            <h5 className="blog-card-title">{title}</h5>
                            <p className="blog-card-text">{content}</p>

                            {/* Read More button: Uses the class name of the Join button inside ForumCard */}
                            <button className="btn forum-card-join-btn blog-read-more-btn">
                                Read more
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
// End Blog Card Component

// Main Blogs
const Blogs = () => {
    const blogData = [
        {
            title: "The Story of My Rainbow Baby",
            content: "What does it mean when I say that my daughter is my 'Rainbow Baby'? A 'Rainbow Baby' is a baby that is born following a miscarriage or an infant loss. Just like a beautiful and...",
            image: rainbowBabyImage,
        },
        {
            title: "Baby Dry Skin: Symptoms, Causes and Treatment",
            content: "For a parent, their baby's health is of utmost importance. This means taking care of their internal health by ensuring the right kind of nutrition and choosing products that not only secure their well-being but also their comfort...",
            image: babyDrySkinImage,
        },
        {
            title: "Raisins for babies - Health benefits and risks",
            content: "Many of us love a good old raisin- they are small, wrinkled packets of energy that have been around since medieval times and are famous for being a natural source of minerals, vitamins, and carbohydrates...",
            image: raisinsForBabiesImage,
        },
        {
            title: "Hernia in Babies - Types, Causes, Signs and Treatment",
            content: "A hernia is a lump that develops under the skin, in the tummy or groin region, and in variable sizes. When the muscles across the tummy area and the pelvic region weaken or develop a gap, it can lead to the protrusion of organs...",
            image: herniaInBabiesImage,
        },
    ];

    return (
        <div className="container-fluid blogs-section">
            <div className="row blogs-header mb-4">
                {/* Left Side: Blogs Button (Uses the same class name as the main Join Forum button) */}
                <div className="col-6 d-flex align-items-center">
                    <button className="join-forum-top-btn">Blogs</button>
                </div>
                {/* Right Side: View More Text */}
                <div className="col-6 d-flex justify-content-end align-items-center">
                    <span className="blogs-view-more-text">View more</span>
                </div>
            </div>

            {/* Blog Cards Grid */}
            <div className="row blogs-grid">
                {blogData.map((blog, index) => (
                    <BlogCard
                        key={index}
                        title={blog.title}
                        content={blog.content}
                        imageSrc={blog.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Blogs;