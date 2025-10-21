import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const WISHLIST_KEY = 'myWishlistItems';

// add rentalPeriod prop
const ProductCard = ({ product, isRental = false, rentalPeriod = 'Monthly' }) => {
    const navigate = useNavigate();

    // calculate price based on period (copied from sort logic)
    const getProductPriceByPeriod = (product, period) => {
        const basePrice = product.monthlyPrice || product.price || 0;
        switch (period) {
            case 'Monthly':
                return basePrice;
            case 'Weekly':
                return Math.round(basePrice * 0.25);
            case 'Daily':
                return Math.round(basePrice * 0.08);
            default:
                return basePrice;
        }
    };

    // calculate the display price
    const displayPrice = getProductPriceByPeriod(product, rentalPeriod);

    // initial state (read from localStorage)
    const [isWishlisted, setIsWishlisted] = useState(() => {
        try {
            const storedWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
            return storedWishlist.includes(product.id);
        } catch (error) {
            console.error("Error reading localStorage:", error);
            return false;
        }
    });

    const handleBuyNow = (e) => {
        e.stopPropagation();
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        navigate(`/product/${product.id}`);
    };

    const handleWishlistToggle = (e) => {
        e.stopPropagation();
        const newState = !isWishlisted;
        setIsWishlisted(newState);

        try {
            const storedWishlist = JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
            let updatedWishlist;

            if (newState) {
                updatedWishlist = [...new Set([...storedWishlist, product.id])];
                alert(`${product.name} added to Wishlist! ❤️`);
            } else {
                updatedWishlist = storedWishlist.filter(id => id !== product.id);
                alert(`${product.name} removed from Wishlist! 💔`);
            }
            localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedWishlist));
        } catch (error) {
            console.error("Error updating localStorage:", error);
        }
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="product-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="product-card-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
            </div>

            <div className="product-card-details p-2">
                <div className="name-and-wishlist d-flex justify-content-between align-items-start">
                    <p className="product-name mb-1">{product.name}</p>
                    <div className="wishlist-icon-details" onClick={handleWishlistToggle}>
                        {isWishlisted ? <FaHeart color="#dc3545" /> : <FaRegHeart />}
                    </div>
                </div>

                {/* show dynamic price based on rentalPeriod */}
                <div className="price-section mb-1">
                    <span className="current-price">
                        Price : ₹ {displayPrice}
                        {isRental && <span className="period-text"> / {rentalPeriod.slice(0, 3)}</span>}
                    </span>
                </div>

                <p className="product-age mb-1">
                    <span className="product-info-label">Age: </span>
                    {product.age}
                </p>

                <div className="color-options mb-3 d-flex align-items-center">
                    <span className="product-info-label me-2">Color:</span>
                    {product.colors.map((color, index) => (
                        <span
                            key={index}
                            className="color-dot-small"
                            style={{ backgroundColor: color }}
                        ></span>
                    ))}
                </div>

                <div className="button-row d-flex justify-content-between">
                    <button className="btn-yellow me-1" onClick={handleBuyNow}>
                        {isRental ? 'Book Now' : 'Buy Now'}
                    </button>
                    <button className="btn-yellow ms-1" onClick={handleAddToCart}>
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
