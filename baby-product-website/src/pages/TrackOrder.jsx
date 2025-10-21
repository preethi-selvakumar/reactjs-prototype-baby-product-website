import React, { useEffect } from 'react';
// useparams is kept assuming your route is still /track-order/:orderId
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { FaShoppingBasket, FaTruck, FaHome, FaThumbsUp, FaArrowLeft } from 'react-icons/fa';

// to get icon based on status title
const getStatusIcon = (title) => {
    // icons chosen to better match the look/context
    switch (title) {
        case 'Order Placed':
            return <FaShoppingBasket size={20} />;
        case 'Order Dispatched':
            return <FaHome size={20} />; // using home icon for dispatch/warehouse status
        case 'Order in transit':
            return <FaTruck size={20} />;
        case 'Delivered successfully':
            return <FaThumbsUp size={20} />; // using thumbsup icon
        default:
            return null;
    }
};

const TrackOrder = () => {
    // retrieve lastorder from context and the id from the url
    const { lastOrder } = useAppContext();
    const { orderId } = useParams();
    const navigate = useNavigate();

    // find the current order (assuming /track-order/:orderId route)
    const order = lastOrder && lastOrder.id === orderId ? lastOrder : null;

    // navigate to the home page
    const handleGoBack = () => {
        navigate('/');
    };

    // redirect logic: if no matching order is found, go to the home page or a history page.
    useEffect(() => {
        if (!order) {
            // alert('order not found or session expired. redirecting to home.');
            navigate('/');
        }
    }, [order, navigate]);

    if (!order) {
        return (
            <>
                <Navbar />
                <div className="track-order-container container py-5 text-center">
                    <h2 className="track-heading">order tracking</h2>
                    <p className="lead">loading order details or order not found...</p>
                </div>
                <Footer />
            </>
        );
    }

    // get all products
    const orderedProducts = order.products;
    // use the first product for the delivery date and primary info
    const mainProduct = orderedProducts[0];

    // static values mimicking the data structure, derived from the order object
    const displayOrderID = order.id || '2345CD67890227';
    const displayPayment = order.paymentMethod.includes('Cash') ? 'Cash on Delivery' : 'Online Payment';
    const displayTotal = order.priceSummary.total.toFixed(2);
    const displayDeliveryDate = `Exp : Delivery by ${mainProduct.expDeliveryDate || 'Sun, Aug 31'}`;

    // status history from the order object
    const statusHistory = order.statusHistory || [];

    return (
        <>
            <Navbar />
            <div className="track-order-container container py-5">
                {/* header with back arrow */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <FaArrowLeft
                        size={24}
                        style={{ cursor: 'pointer', marginRight: '15px', color: '#333' }}
                        onClick={handleGoBack}
                    />
                    <h1 className="track-heading" style={{ margin: '0 auto', fontSize: '2rem' }}>Track Order</h1>
                </div>
                {/* ----------------------------------- */}

                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-10 col-sm-12 track-main-box">

                        <h2 className="track-main-title">Your Order</h2>

                        {/* product header */}
                        <div className="track-product-header">

                            {/* container for multiple images */}
                            <div className="track-multiple-images-box">
                                {orderedProducts.map((item, index) => (
                                    // use a small wrapper for each image
                                    <div key={index} className="track-image-single-wrapper">
                                        <img
                                            src={item.image}
                                            alt={item.productName}
                                            className="track-product-image"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="track-info-header-summary">
                                {/* order no and payment */}
                                <div className="track-order-detail-row">
                                    <span className="track-order-no">Order no #**{displayOrderID}**</span>
                                    <span className="track-payment-method">{displayPayment} ₹{displayTotal}</span>
                                </div>

                                {/* displaying all product names here */}
                                {orderedProducts.map((item, index) => (
                                    <p key={index} className="track-product-name-summary">
                                        {item.productName} (Qty: {item.quantity})
                                    </p>
                                ))}

                                {/* estimated delivery date */}
                                <p className="track-delivery-est-summary">{displayDeliveryDate}</p>
                            </div>
                        </div>

                        {/* status timeline wrapper */}
                        <div className="track-timeline-wrapper-inner">
                            {statusHistory.map((status, index) => {
                                const isLast = index === statusHistory.length - 1;
                                const isComplete = index <= 1; // assuming first two steps are complete
                                const isActive = index === 2; // assuming the third step is active

                                return (
                                    <div
                                        key={index}
                                        className={`track-timeline-item ${isComplete ? 'is-complete' : ''} ${isActive ? 'is-active' : ''}`}
                                    >

                                        {/* status icon/bullet container */}
                                        <div className="track-status-bullet-container">
                                            <div className="track-status-bullet">
                                                {getStatusIcon(status.title)}
                                            </div>
                                            {/* vertical line connector */}
                                            {!isLast && (
                                                <div
                                                    className={`track-status-line ${isComplete ? 'line-complete' : 'line-pending'}`}
                                                ></div>
                                            )}
                                        </div>

                                        {/* status details */}
                                        <div className="track-status-details">
                                            <p className="track-status-title">{status.title}</p>

                                            {/* date/time */}
                                            {status.date && status.time && index < 2 && (
                                                <p className="track-status-time">
                                                    {status.date} | {status.time}
                                                </p>
                                            )}

                                            {/* location/details */}
                                            {status.location && (index === 2) && (
                                                <p className="track-status-location">{status.location}</p>
                                            )}

                                            {/* not delivered yet (for the last step) */}
                                            {isLast && !isComplete && (
                                                <p className="track-status-not-delivered">Not delivered yet</p>
                                            )}

                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TrackOrder;