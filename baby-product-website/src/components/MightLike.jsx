import React, { useRef, useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import mightLikeProducts from '../data/mightLikeProductsData';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MightLike = () => {

    const scrollContainerRef = useRef(null);

    //  State to track scroll position for conditional rendering
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true); // Always show right arrow initially

    //  Function to check scroll limits and update arrow visibility
    const updateArrowVisibility = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

            setShowLeftArrow(scrollLeft > 5);
            setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
        }
    };

    // Attach scroll listener on mount ---
    useEffect(() => {
        const currentRef = scrollContainerRef.current;
        if (currentRef) {
            // Check initial visibility after render (important for initial state)
            updateArrowVisibility();

            // Add scroll event listener
            currentRef.addEventListener('scroll', updateArrowVisibility);

            // Clean up the event listener on component unmount
            return () => {
                currentRef.removeEventListener('scroll', updateArrowVisibility);
            };
        }
    }, []); // Run only once on mount

    //Scroll Handler updated to call updateArrowVisibility
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300;
            if (direction === 'left') {
                scrollContainerRef.current.scrollLeft -= scrollAmount * 4;
            } else {
                scrollContainerRef.current.scrollLeft += scrollAmount * 4;
            }
            setTimeout(updateArrowVisibility, 300); // Small delay to allow scroll to complete
        }
    };

    return (
        <div className="might-like-section container-fluid px-0">
            <h2 className="might-like-heading">You might also like</h2>

            <div className="might-like-product-carousel-wrapper">

                {/* Conditional Left Arrow Rendering */}
                {showLeftArrow && (
                    <div
                        className="might-like-carousel-arrow might-like-left-arrow"
                        onClick={() => scroll('left')}
                    >
                        <FaChevronLeft size={20} />
                    </div>
                )}

                <div
                    className="might-like-product-card-container d-flex flex-nowrap"
                    ref={scrollContainerRef}
                >
                    {mightLikeProducts.map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-4 col-6 might-like-product-card-col">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Conditional Right Arrow Rendering */}
                {showRightArrow && (
                    <div
                        className="might-like-carousel-arrow might-like-right-arrow"
                        onClick={() => scroll('right')}
                    >
                        <FaChevronRight size={20} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MightLike;