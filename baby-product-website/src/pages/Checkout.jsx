import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import paymentOptions from '../assets/images/payment-options.png';
import CheckmarkImage from '../assets/images/checkmark.png';

// function to calculates price details
const getOrderCalculations = (cartItems) => {
    const SHIPPING_FEE = 99.00;
    const subTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const calculatedSubtotal = subTotal;
    const calculatedShipping = SHIPPING_FEE;
    const finalTotal = subTotal + SHIPPING_FEE;
    const taxPerComponent = 251.62;
    return { subTotal: calculatedSubtotal, shipping: calculatedShipping, total: finalTotal, taxPerComponent };
};

// order now button handler
const handleOrderNow = (cartCount, paymentMethod, setErrors, onConfirm) => {
    if (cartCount === 0) {
        alert('your cart is empty!');
        return;
    }
    setErrors(prev => ({ ...prev, form: '' }));
    const isConfirmed = window.confirm(
        `confirm order using ${paymentMethod === 'secure' ? 'secure online transaction' : 'cash on delivery'}?`
    );
    if (isConfirmed) {
        onConfirm();
    }
};

// ordersummary component
const OrderSummary = ({ cartItems }) => {
    const { subTotal, shipping, total, taxPerComponent } = getOrderCalculations(cartItems);

    return (
        <div className="checkout-order-summary-box">
            <h3 className="checkout-summary-heading">order summary</h3>
            {/* product list */}
            {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedAge}-${item.selectedColor}-${item.rentalPeriod || 'buy'}`} className="checkout-summary-item-row">
                    <div className="checkout-summary-item-image-box">
                        <img src={item.image} alt={item.productName} className="checkout-summary-item-image" />
                    </div>
                    <div className="checkout-summary-item-details">
                        <p className="checkout-summary-item-name">{item.productName} - {item.selectedColor || 'n/a'}</p>
                        <p className="checkout-summary-item-info">qty: {item.quantity}</p>
                        <p className="checkout-summary-item-info">age: {item.selectedAge}</p>
                        {/* display rental period if present */}
                        {item.rentalPeriod && (
                            <p className="checkout-summary-item-info checkout-rental-period">period: {item.rentalPeriod}</p>
                        )}
                        <p className="checkout-summary-item-info checkout-summary-item-price">price: ₹{(item.price * item.quantity).toLocaleString('en-in')}</p>
                    </div>
                </div>
            ))}
            <div className="checkout-discount-input-container">
                <input type="text" placeholder="discount code or gift card" className="checkout-discount-input" />
            </div>
            {/* price breakdown */}
            <div className="checkout-summary-price-breakdown">
                <div className="checkout-breakdown-row"><span>sub total</span><span className="checkout-price-value">₹{subTotal.toLocaleString('en-in')}</span></div>
                <hr className="checkout-breakdown-separator" />
                <div className="checkout-breakdown-row"><span>shipping</span><span className="checkout-price-value">flat rate : ₹{shipping.toFixed(2)}</span></div>
                <div className="checkout-breakdown-row checkout-shipping-detail"><span></span><span>shipping to madhya pradesh.</span></div>
                <hr className="checkout-breakdown-separator" />
                <div className="checkout-breakdown-row checkout-total-row"><span>total</span><span className="checkout-price-value checkout-total-price">₹{total.toLocaleString('en-in')}</span></div>
                <div className="checkout-breakdown-row checkout-tax-detail">
                    <span className="checkout-tax-info">(includes ₹{taxPerComponent.toFixed(2)} cgst, ₹{taxPerComponent.toFixed(2)} sgst)</span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

// normal purchase modal
const OrderConfirmationModal = ({ navigate, orderID }) => {
    const handleBackToHome = () => { navigate('/'); };
    return (
        <div className="order-modal-overlay">
            <div className="order-modal-box">
                <h2 className="order-modal-title">your order is confirmed</h2>
                <div className="order-modal-checkmark-container">
                    <img src={CheckmarkImage} alt="order confirmed checkmark" className="order-modal-checkmark" />
                </div>
                <p className="order-modal-thankyou">thank you for shopping with us</p>
                <div className="order-modal-details">
                    <p className="order-modal-info">your order will be delivered at **7 working days**</p>
                    <p className="order-modal-info">your order id: **{orderID}**</p>
                </div>
                <div className="order-modal-actions">
                    <Link to={`/track-order/${orderID}`} className="order-modal-btn order-modal-track-btn">track order</Link>
                    <button onClick={handleBackToHome} className="order-modal-btn order-modal-back-btn">back</button>
                </div>
            </div>
        </div>
    );
};

// rental service modal
const RentalConfirmationModal = ({ navigate, orderID, rentalPeriodStart, rentalPeriodEnd }) => {
    const handleBackToHome = () => { navigate('/'); };
    return (
        <div className="order-modal-overlay">
            <div className="order-modal-box">
                <h2 className="order-modal-title">your rental service product booking is confirmed</h2>
                <div className="order-modal-checkmark-container">
                    <img src={CheckmarkImage} alt="booking confirmed checkmark" className="order-modal-checkmark" />
                </div>
                <p className="order-modal-thankyou">thank you for booking this services</p>
                <div className="order-modal-details">
                    <p className="order-modal-info">your rental service period: **{rentalPeriodStart} to {rentalPeriodEnd}**</p>
                    <p className="order-modal-info">your order id: **{orderID}**</p>
                </div>
                <div className="order-modal-actions">
                    <Link to={`/track-order/${orderID}`} className="order-modal-btn order-modal-track-btn">track order</Link>
                    <button onClick={handleBackToHome} className="order-modal-btn order-modal-back-btn">back</button>
                </div>
            </div>
        </div>
    );
};

const Checkout = () => {
    const { cartItems, cartCount, clearCart, setLastOrder } = useAppContext();
    const navigate = useNavigate();

    // check for rental items
    const hasRentalItems = cartItems.some(item => item.rentalPeriod);

    const [showModal, setShowModal] = useState(false);
    const [currentOrderID, setCurrentOrderID] = useState(null);
    const [isRentalOrder, setIsRentalOrder] = useState(false); // new state to determine which modal to show

    // rental dates
    const rentalDates = {
        from: '01/09/2025',
        to: '30/09/2025',
        returnDate: '01/10/2025'
    };

    // state for form data
    const [formData, setFormData] = useState({
        email: '',
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
    });
    // state for errors
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '', form: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        const requiredFields = ['email', 'country', 'firstName', 'lastName', 'address', 'city', 'state', 'pincode', 'phone'];

        requiredFields.forEach(field => {
            // check for undefined (due to incomplete initialization) or empty string
            if (!formData[field] || !formData[field].trim()) {
                newErrors[field] = 'this field is required.';
                isValid = false;
            }
        });

        if (formData.email && !formData.email.includes('@')) { newErrors.email = 'please enter a valid email address.'; isValid = false; }
        if (formData.phone && !/^\d{10,}$/.test(formData.phone)) { newErrors.phone = 'phone must be at least 10 digits.'; isValid = false; }
        setErrors(newErrors);
        return isValid;
    };

    // submit handler
    const handleCheckout = () => {
        const isValid = validateForm();
        if (isValid) {

            const now = new Date();
            const orderID = (hasRentalItems ? '2345cd6789022' : 'id') + now.getTime().toString().slice(-10);
            const { subTotal, shipping, total, taxPerComponent } = getOrderCalculations(cartItems);

            // status history array added here
            const initialStatusHistory = [
                {
                    title: 'order placed',
                    date: now.toLocaleDateString('en-in', { month: 'short', day: 'numeric' }),
                    time: now.toLocaleTimeString('en-in', { hour: '2-digit', minute: '2-digit' }),
                    location: null,
                },
                {
                    title: 'order dispatched',
                    date: 'oct 17',
                    time: '12:30 pm',
                    location: null,
                },
                {
                    title: 'order in transit',
                    date: null,
                    time: null,
                    location: 'madhya pradesh warehouse, india',
                },
                {
                    title: 'delivered successfully',
                    date: null,
                    time: null,
                    location: null,
                },
            ];

            const newOrder = {
                id: orderID,
                date: now.toLocaleString('en-in', { dateStyle: 'medium', timeStyle: 'short' }),
                paymentMethod: paymentMethod === 'secure' ? 'secure online transaction' : 'cash on delivery',
                deliveryDays: 7,
                products: cartItems,
                billingAddress: formData,
                priceSummary: { subTotal, shipping, total, taxPerComponent },
                isRentalOrder: hasRentalItems, // save the type of order
                rentalDates: hasRentalItems ? rentalDates : null, // save rental dates if applicable
                statusHistory: initialStatusHistory, // fix applied here
            };

            const onConfirm = () => {
                setLastOrder(newOrder);
                clearCart();
                setCurrentOrderID(orderID);
                setIsRentalOrder(hasRentalItems); // set the flag for modal selection
                setShowModal(true);
            };

            handleOrderNow(cartCount, paymentMethod, setErrors, onConfirm);
        } else {
            setErrors(prev => ({ ...prev, form: "please review the form and fill all required fields." }));
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        if (cartCount === 0 && !showModal) {
            navigate('/cart');
        }
    }, [cartCount, navigate, showModal]);

    const [paymentMethod, setPaymentMethod] = useState('secure');

    if (cartCount === 0 && !showModal) return null;

    const renderError = (field) => {
        return errors[field] ? (
            <div className="text-danger checkout-error-message mt-1 mb-3">{errors[field]}</div>
        ) : null;
    };

    return (
        <>
            <Navbar />

            <div className={`checkout-page-wrapper ${showModal ? 'modal-open' : ''}`}>
                <div className="checkout-container container py-5">
                    <h1 className="checkout-heading text-center mb-5">checkout</h1>

                    {errors.form && (
                        <div className="alert alert-danger text-center mb-4">{errors.form}</div>
                    )}

                    <div className="row g-5">
                        {/* left column: contact and delivery form */}
                        <div className="col-lg-7">
                            <div className="checkout-form-section">
                                {/* contact section form inputs */}
                                <h3 className="checkout-section-title">contact</h3>
                                <input type="email" placeholder="email (for order updates) *" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} />
                                {renderError('email')}
                                <div className="form-check mb-5">
                                    <input className="form-check-input" type="checkbox" id="orderUpdates" />
                                    <label className="form-check-label checkout-form-check-label" htmlFor="orderUpdates">
                                        send me order updates, news and offers on email and whatsapp
                                    </label>
                                </div>

                                {/* delivery address section */}
                                <h3 className="checkout-section-title">delivery address</h3>
                                <div className="row g-3 mb-3">
                                    <div className="col-12"><input type="text" placeholder="country/region *" className={`form-control ${errors.country ? 'is-invalid' : ''}`} name="country" value={formData.country} onChange={handleChange} />{renderError('country')}</div>
                                    <div className="col-md-6"><input type="text" placeholder="first name *" className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} name="firstName" value={formData.firstName} onChange={handleChange} />{renderError('firstName')}</div>
                                    <div className="col-md-6"><input type="text" placeholder="last name *" className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} name="lastName" value={formData.lastName} onChange={handleChange} />{renderError('lastName')}</div>
                                    <div className="col-12"><input type="text" placeholder="address *" className={`form-control ${errors.address ? 'is-invalid' : ''}`} name="address" value={formData.address} onChange={handleChange} />{renderError('address')}</div>
                                    <div className="col-md-4"><input type="text" placeholder="city *" className={`form-control ${errors.city ? 'is-invalid' : ''}`} name="city" value={formData.city} onChange={handleChange} />{renderError('city')}</div>
                                    <div className="col-md-4"><input type="text" placeholder="state *" className={`form-control ${errors.state ? 'is-invalid' : ''}`} name="state" value={formData.state} onChange={handleChange} />{renderError('state')}</div>
                                    <div className="col-md-4"><input type="text" placeholder="pincode *" className={`form-control ${errors.pincode ? 'is-invalid' : ''}`} name="pincode" value={formData.pincode} onChange={handleChange} />{renderError('pincode')}</div>
                                </div>
                                <input type="text" placeholder="phone number *" className={`form-control mb-4 ${errors.phone ? 'is-invalid' : ''}`} name="phone" value={formData.phone} onChange={handleChange} />
                                {renderError('phone')}
                                <div className="form-check mb-5">
                                    <input className="form-check-input" type="checkbox" id="saveInfo" />
                                    <label className="form-check-label checkout-form-check-label" htmlFor="saveInfo">
                                        save this information for next time
                                    </label>
                                </div>

                                {/* payment method section */}
                                <h3 className="checkout-section-title">choose your payment method</h3>
                                <div className={`checkout-payment-option-box ${paymentMethod === 'secure' ? 'checkout-selected' : ''}`} onClick={() => setPaymentMethod('secure')}>
                                    <input type="radio" id="securePayment" name="payment" value="secure" checked={paymentMethod === 'secure'} onChange={() => setPaymentMethod('secure')} className="checkout-payment-radio" />
                                    <label htmlFor="securePayment" className="checkout-payment-label">secure transaction(upi, cards, wallets, net banking)</label>
                                    <div className="checkout-payment-image-wrapper">
                                        <img src={paymentOptions} alt="payment options" className="checkout-payment-logos" />
                                    </div>
                                </div>
                                <div className={`checkout-payment-option-box ${paymentMethod === 'cash' ? 'checkout-selected' : ''}`} onClick={() => setPaymentMethod('cash')}>
                                    <input type="radio" id="cashOnDelivery" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="checkout-payment-radio" />
                                    <label htmlFor="cashOnDelivery" className="checkout-payment-label">cash on delivery</label>
                                </div>

                                {/* return status section (block layout) */}
                                {hasRentalItems && (
                                    <div className="checkout-payment-option-box rental-return-status mt-4">

                                        {/* title - full width block */}
                                        <h4 className="rental-return-title-block mb-3">return status</h4>

                                        {/* from and to fields - d-flex (one line) */}
                                        <div className="rental-dates-wrapper-block d-flex align-items-center mb-3">

                                            {/* from field group */}
                                            <div className="d-flex align-items-center me-4">
                                                <span className="rental-date-label-block me-2">from</span>
                                                <input
                                                    type="text"
                                                    value={rentalDates.from}
                                                    readOnly
                                                    className="form-control rental-date-input-block"
                                                />
                                            </div>

                                            {/* to field group */}
                                            <div className="d-flex align-items-center">
                                                <span className="rental-date-label-block me-2">to</span>
                                                <input
                                                    type="text"
                                                    value={rentalDates.to}
                                                    readOnly
                                                    className="form-control rental-date-input-block"
                                                />
                                            </div>
                                        </div>

                                        {/* instruction text - full width block */}
                                        <p className="rental-return-info-block">
                                            at **{rentalDates.returnDate}**, our staff will conduct you to return the product
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* right column: order summary */}
                        <div className="col-lg-5">
                            <OrderSummary cartItems={cartItems} />

                            <button
                                className="checkout-order-now-btn"
                                onClick={handleCheckout}
                            >
                                order now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* conditional modal rendering */}
            {showModal && currentOrderID && (
                isRentalOrder ? (
                    <RentalConfirmationModal
                        navigate={navigate}
                        orderID={currentOrderID}
                        rentalPeriodStart={rentalDates.from}
                        rentalPeriodEnd={rentalDates.to}
                    />
                ) : (
                    <OrderConfirmationModal
                        navigate={navigate}
                        orderID={currentOrderID}
                    />
                )
            )}
        </>
    );
};

export default Checkout;