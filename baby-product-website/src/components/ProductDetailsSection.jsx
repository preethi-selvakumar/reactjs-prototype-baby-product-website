import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import mergedProducts from '../data/mergedProducts';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

const ProductDetailsSection = () => {
    const { id: urlId } = useParams();
    const productId = parseInt(urlId);

    const navigate = useNavigate();
    const { addToCart } = useAppContext();

    const [product, setProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedAge, setSelectedAge] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(null);
    const [pincode, setPincode] = useState('');

    const [isMainImageZoomed, setIsMainImageZoomed] = useState(false);

    // rental period
    const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
    // check if the product is explicitly marked as rental
    const isRentalProduct = product && product.isRental === true;

    // find the product data using the id
    useEffect(() => {
        // find in merged products. fallback removed as rental products are now merged.
        const foundProduct = mergedProducts.find(p => p.id === productId);

        if (foundProduct) {
            setProduct(foundProduct);
            setSelectedColor(foundProduct.colors && foundProduct.colors.length > 0 ? foundProduct.colors[0] : null);
            const availableAges = foundProduct.age ? foundProduct.age.split(',').map(a => a.trim()) : ['n/a'];
            setSelectedAge(availableAges[0]);
            setMainImage(foundProduct.image);
            setIsMainImageZoomed(false);
            setQuantity(1);

            // set default period if it's a rental product
            if (foundProduct.isRental) {
                setSelectedPeriod('Monthly');
            }
        } else {
            setProduct(null);
            console.error(`product with id ${productId} not found.`);
        }
    }, [productId]);


    // calculate dynamic price based on rental period
    const getCalculatedPrice = () => {
        if (!product) return 0;

        // use monthlyprice for rental products, falling back to base price if monthlyprice isn't set
        const basePrice = product.monthlyPrice || product.price;

        if (isRentalProduct) {
            switch (selectedPeriod) {
                case 'Monthly':
                    // monthly price * quantity
                    return basePrice * quantity;
                case 'Weekly':
                    // weekly price is ~25% of monthly price (baseprice * 0.25) * quantity
                    return Math.round(basePrice * 0.25) * quantity;
                case 'Daily':
                    // daily price is ~8% of monthly price (baseprice * 0.08) * quantity
                    return Math.round(basePrice * 0.08) * quantity;
                default:
                    return basePrice * quantity; // default to monthly if period is unknown
            }
        }
        // normal purchase logic
        return product.price * quantity;
    };
    const displayPrice = getCalculatedPrice();

    if (!product) {
        return <div className="product-detail-loading text-center py-5">product not found or loading...</div>;
    }

    const ageOptions = product.age ? product.age.split(',').map(a => a.trim()) : [];

    const handleQuantityChange = (type) => {
        if (type === 'inc') {
            setQuantity(prev => prev + 1);
        } else if (type === 'dec' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    // handle thumbnail click
    const handleThumbnailClick = (type, url) => {
        setMainImage(url);
        setIsMainImageZoomed(type === 'zoomed');
    };

    // handle pincode check
    const handlePincodeCheck = () => {
        if (pincode.length === 6) {
            alert("product available for delivery, please proceed.");
            setPincode('');
        } else {
            alert("please enter a valid 6-digit pincode.");
        }
    };

    // add to cart/bag
    const handleAddToCart = () => {
        if (!product || !selectedAge || !selectedColor) {
            alert("please select color and age before adding to cart.");
            return;
        }

        // add rental period and use the calculated display price
        const rentalDetails = isRentalProduct ? {
            rentalPeriod: selectedPeriod,
            displayPrice: displayPrice / quantity // price per unit/period
        } : {};

        const itemToAdd = {
            id: product.id,
            productName: product.name,
            price: isRentalProduct ? (displayPrice / quantity) : product.price, // use calculated unit price
            quantity: quantity,
            selectedAge: selectedAge,
            selectedColor: selectedColor,
            image: product.image,
            ...rentalDetails, // add rental period here
        };

        addToCart(itemToAdd);
        setQuantity(1);
        alert(`${product.name} added to cart successfully!`);
    };

    // buy now / book now - navigates to checkout
    const handleBuyNow = () => {
        // validation check
        if (!product || !selectedAge || !selectedColor) {
            alert("please select color and age before proceeding.");
            return;
        }

        const rentalDetails = isRentalProduct ? {
            rentalPeriod: selectedPeriod,
            displayPrice: displayPrice / quantity
        } : {};

        const itemToPurchase = {
            id: product.id,
            productName: product.name,
            price: isRentalProduct ? (displayPrice / quantity) : product.price,
            quantity: quantity,
            selectedAge: selectedAge,
            selectedColor: selectedColor,
            image: product.image,
            ...rentalDetails, // add rental period here
        };

        // add the item to the cart 
        addToCart(itemToPurchase);

        //  navigate to the checkout page directly. 
        navigate('/checkout');
    };

    const thumbnails = [
        { type: 'normal', url: product.image, alt: 'normal view' },
        { type: 'zoomed', url: product.image, alt: 'zoomed view' }
    ];

    // define button labels conditionally
    const buyButtonLabel = isRentalProduct ? 'book now' : 'buy now';
    const cartButtonLabel = 'add to cart';

    return (
        <div className="product-detail-section container my-5">
            <div className="row">

                {/* left column: image gallery */}
                <div className="col-md-6">
                    {/* main image */}
                    <div className="product-detail-main-image-box">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className={`product-detail-main-image ${isMainImageZoomed ? 'product-detail-main-image-zoomed' : ''}`}
                        />
                    </div>

                    {/* thumbnail gallery */}
                    <div className="product-detail-thumbnail-gallery">
                        {thumbnails.map((thumb, index) => (
                            <div
                                key={index}
                                className={`product-detail-thumbnail-box ${(index === 0 && !isMainImageZoomed) || (index === 1 && isMainImageZoomed) ? 'active' : ''
                                    }`}
                                onClick={() => handleThumbnailClick(thumb.type, thumb.url)}
                            >
                                <img
                                    src={thumb.url}
                                    alt={thumb.alt}
                                    className={`product-detail-thumbnail-img ${thumb.type === 'zoomed' ? 'product-detail-thumbnail-zoomed' : ''}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>


                {/* right column: product information & controls */}
                <div className="col-md-6 product-detail-info-area">

                    {/* product name */}
                    <h1 className="product-detail-name">
                        {product.name}
                    </h1>

                    {/* price section */}
                    <div className="product-detail-price-section">
                        <span className="product-detail-mrp">
                            mrp: ₹{displayPrice.toLocaleString('en-in')}
                        </span>
                        {quantity > 1 && (
                            <span className="product-detail-unit-price">
                                (₹{(displayPrice / quantity).toLocaleString('en-in')} per {isRentalProduct ? selectedPeriod : 'unit'})
                            </span>
                        )}
                        <p className="product-detail-taxes">price inclusive of all taxes</p>
                    </div>

                    {/* rental period selector (visible only for rental products) */}
                    {isRentalProduct && (
                        <div className="product-detail-option-group">
                            <span className="product-detail-label">period</span>
                            <div className="product-detail-age-selector">
                                {['monthly', 'weekly', 'daily'].map(period => (
                                    <button
                                        key={period}
                                        className={`product-detail-age-btn ${selectedPeriod === period ? 'active' : ''}`}
                                        onClick={() => setSelectedPeriod(period)}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* color selector */}
                    <div className="product-detail-option-group">
                        <span className="product-detail-label">color</span>
                        <div className="product-detail-color-selector">
                            {product.colors && product.colors.map(color => (
                                <div
                                    key={color}
                                    className={`product-detail-color-swatch ${selectedColor === color ? 'active' : ''}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setSelectedColor(color)}
                                ></div>
                            ))}
                        </div>
                        {!selectedColor && <p className="selection-error">please select a color</p>}
                    </div>

                    {/* age group selector */}
                    <div className="product-detail-option-group">
                        <span className="product-detail-label">age group</span>
                        <div className="product-detail-age-selector">
                            {ageOptions.length > 0 ? (
                                ageOptions.map(age => (
                                    <button
                                        key={age}
                                        className={`product-detail-age-btn ${selectedAge === age ? 'active' : ''}`}
                                        onClick={() => setSelectedAge(age)}
                                    >
                                        {age}
                                    </button>
                                ))
                            ) : (
                                <span className="text-muted">no age options available</span>
                            )}
                        </div>
                        {!selectedAge && <p className="selection-error">please select an age group</p>}
                    </div>

                    {/* quantity control */}
                    <div className="product-detail-option-group">
                        <span className="product-detail-label">quantity</span>
                        <div className="product-detail-quantity-control">
                            <button className="product-detail-qty-btn" onClick={() => handleQuantityChange('dec')}>
                                <FaMinus size={12} />
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                readOnly
                                className="product-detail-qty-input"
                            />
                            <button className="product-detail-qty-btn" onClick={() => handleQuantityChange('inc')}>
                                <FaPlus size={12} />
                            </button>
                        </div>
                    </div>

                    {/* action buttons */}
                    <div className="product-detail-action-buttons">
                        <button
                            className="product-detail-add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={!selectedColor || !selectedAge}
                        >
                            {cartButtonLabel}
                        </button>
                        <button
                            className="product-detail-buy-now-btn"
                            onClick={handleBuyNow}
                            disabled={!selectedColor || !selectedAge}
                        >
                            {/* conditional label here */}
                            {buyButtonLabel}
                        </button>
                    </div>

                    {/* pincode checker */}
                    <div className="product-detail-option-group mt-4">
                        <span className="product-detail-pincode-label">check pincode</span>
                        <div className="product-detail-pincode-checker">
                            <input
                                type="text"
                                placeholder="enter pincode"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="product-detail-pincode-input"
                                maxLength={6}
                            />
                            <button
                                className="product-detail-pincode-check-btn"
                                onClick={handlePincodeCheck}
                            >
                                check
                            </button>
                        </div>
                    </div>

                </div> {/* end of right column */}
            </div> {/* end of row */}
        </div>
    );
};

export default ProductDetailsSection;