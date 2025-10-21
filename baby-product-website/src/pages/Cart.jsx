import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MightLike from '../components/MightLike';

// function to convert hex code to a display name (words)
const getColorName = (hexCode) => {
    const colorMap = {
        '#FF69B4': 'Pink',
        '#0000FF': 'Blue',
        '#FF0000': 'Red',
        '#FFFFFF': 'White',
        '#000000': 'Black',
        '#008000': 'Green',
        '#FFA500': 'Orange',
        '#800080': 'Purple',
        '#DC3545': 'Red',
        '#28A745': 'Green',
        '#17A2B8': 'Cyan',
        '#FFC107': 'Yellow',
        '#6C757D': 'Gray',
    };

    // normalize the hex code (uppercase) and search the map
    const normalizedHex = (hexCode || '').toUpperCase();

    // return the name if found in the map, otherwise return the hex code itself
    // since you preferred 'red', '#dc3545' -> 'red'.
    return colorMap[normalizedHex] || normalizedHex;
};


const Cart = () => {
    const { cartItems, cartCount, removeFromCart } = useAppContext();
    const navigate = useNavigate();

    // remove item handler
    const handleRemoveItem = (item) => {
        const isConfirmed = window.confirm(
            `are you sure you want to remove "${item.productName}" from the cart?`
        );

        if (isConfirmed) {
            // calling the context function.
            removeFromCart(item.id, item.selectedAge);
        }
    };

    // new checkout navigation handler
    const handleProceedToCheckout = () => {
        if (cartCount > 0) {
            navigate('/checkout'); // direct navigation to the checkout page
        } else {
            alert("your cart is empty! please add items before checking out.");
        }
    };

    // cart empty screen
    if (cartCount === 0) {
        return (
            <>
                <Navbar />
                <div className="cart-container container py-5 text-center">
                    <h2 className="cart-heading mb-4">cart</h2>
                    <div className="cart-empty-message">
                        <p className="lead">your cart is empty. let's find something for your little one! 👶</p>
                    </div>
                </div>

                {/* mightlike is placed here */}
                <MightLike />

                {/* 'continue shopping' button when cart is empty - placed below mightlike */}
                <div className="container py-4 text-center">
                    <Link to="/" className="continue-shopping-btn">
                        continue shopping
                    </Link>
                </div>

                <Footer />
            </>
        );
    }

    // cart items display (cartcount > 0)
    return (
        <>
            <Navbar />
            <div className="cart-container container py-5">
                <h2 className="cart-heading text-center mb-5">cart</h2>

                {/* cart header row */}
                <div className="row cart-header-row g-0 d-none d-md-flex">
                    <div className="col-5 cart-header-col cart-name-header">name</div>
                    <div className="col-2 cart-header-col text-center">qty</div>
                    <div className="col-2 cart-header-col text-center">age</div>
                    <div className="col-2 cart-header-col text-right">price</div>
                    <div className="col-1 cart-header-col text-center"></div> {/* for remove icon */}
                </div>

                <hr className="cart-separator d-none d-md-block" />

                {/* cart items list */}
                {cartItems.map((item, index) => (
                    <React.Fragment key={`${item.id}-${item.selectedAge}-${item.selectedColor}`}>
                        <div className="row cart-item-row align-items-center g-0">

                            {/* name and image */}
                            <div className="col-12 col-md-5 cart-item-detail d-flex align-items-center">
                                <div className="cart-item-image-box">
                                    <img
                                        src={item.image}
                                        alt={item.productName}
                                        className="cart-item-image"
                                    />
                                </div>
                                <div className="ms-3">
                                    <span className="cart-item-label d-md-none">name:</span>
                                    <span className="cart-item-name">{item.productName}</span>
                                    {/* color display: using the getcolorname function to convert hex code to name */}
                                    <div className="cart-item-sub-info">
                                        color: {getColorName(item.selectedColor)}
                                    </div>
                                    {/* rental period display */}
                                    {item.rentalPeriod && (
                                        <div className="cart-item-sub-info cart-item-rental-period">
                                            rental period: {item.rentalPeriod}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* quantity */}
                            <div className="col-3 col-md-2 cart-item-col text-center">
                                <span className="cart-item-label d-md-none">qty</span>
                                <span className="cart-item-value">{item.quantity}</span>
                            </div>

                            {/* age */}
                            <div className="col-3 col-md-2 cart-item-col text-center">
                                <span className="cart-item-label d-md-none">age</span>
                                <span className="cart-item-value">{item.selectedAge}</span>
                            </div>

                            {/* price */}
                            <div className="col-4 col-md-2 cart-item-col text-right">
                                <span className="cart-item-label d-md-none">price</span>
                                <span className="cart-item-price">₹{(item.price * item.quantity).toLocaleString('en-in')}</span>
                            </div>

                            {/* remove */}
                            <div className="col-2 col-md-1 cart-item-col text-center">
                                <span className="cart-item-label d-md-none">remove</span>
                                <button
                                    className="cart-remove-btn"
                                    onClick={() => handleRemoveItem(item)}
                                    aria-label={`remove ${item.productName}`}
                                >
                                    <FaTrashAlt size={16} color="#d9534f" />
                                </button>
                            </div>
                        </div>
                        <hr className="cart-separator" />
                    </React.Fragment>
                ))}

                {/* checkout button - now navigates to /checkout */}
                <div className="row cart-checkout-row justify-content-end mt-4">
                    <div className="col-12 col-md-4 text-end">
                        <button
                            className="checkout-btn"
                            onClick={handleProceedToCheckout} // changed to navigate to checkout
                        >
                            checkout
                        </button>
                    </div>
                </div>
            </div>

            {/* mightlike component */}
            <MightLike />

            {/* 'continue shopping' button */}
            <div className="container text-center mb-5 mt-4">
                <Link to="/" className="continue-shopping-btn">
                    continue shopping
                </Link>
            </div>

            <Footer />
        </>
    );
};

export default Cart;