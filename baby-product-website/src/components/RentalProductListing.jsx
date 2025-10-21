import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import products from '../data/rentalData';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const RentalProductListing = ({ filterState, rentalPeriod, setRentalPeriod }) => {
    // changing the initial value to 'price (low - high)' instead of 'new arrivals'
    const [sortBy, setSortBy] = useState('Price (Low - High)');

    const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false); // changed state name
    // new state: for period dropdown
    const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);

    const sortOptions = ['New arrivals', 'Top selling', 'Price (Low - High)', 'Price (High - Low)', 'Offers'];
    const rentalPeriods = ['Monthly', 'Weekly', 'Daily']; // specific rental periods

    const handleSortChange = (option) => {
        setSortBy(option);
        setIsSortDropdownOpen(false); // close dropdown after selection
    };

    // new handler: for rental period change
    const handlePeriodChange = (period) => {
        setRentalPeriod(period);
        setIsPeriodDropdownOpen(false);
    };

    // calculate price based on period
    const getProductPriceByPeriod = (product, period) => {
        // baseprice is the monthlyprice
        const basePrice = product.monthlyPrice || product.price || 0;

        switch (period) {
            case 'Monthly':
                return basePrice; // 100% of basePrice
            case 'Weekly':
                // example: weekly is 25% of monthly
                return Math.round(basePrice * 0.25);
            case 'Daily':
                // example: daily is 8% of monthly
                return Math.round(basePrice * 0.08);
            default:
                return basePrice;
        }
    };

    // sort & filter logic using usememo
    const sortedProducts = useMemo(() => {
        // start with filtering (using the same logic structure as before)
        let filteredList = products.filter(product => {
            const { ageGroup, price } = filterState;

            // price filter (actual logic)
            if (price) {
                // filter based on the current *rental period's price*
                const priceRange = price.match(/\d+/g).map(Number);
                const [minPrice, maxPrice] = priceRange.length === 1 ? [priceRange[0], 99999] : priceRange;

                // use the calculated price for filtering
                const currentProductPrice = getProductPriceByPeriod(product, rentalPeriod);

                if (currentProductPrice < minPrice || currentProductPrice > maxPrice) return false;
            }

            // age filter
            if (ageGroup && ageGroup !== 'Maternity') {
                if (!product.age.includes(ageGroup.split(' ')[0].replace('-', ''))) {
                    return false;
                }
            }

            return true;
        });

        // continue with sorting on the filtered list
        const sortableProducts = [...filteredList];

        switch (sortBy) {
            case 'Price (Low - High)':
                // use the calculated price for sorting based on selected rental period
                return sortableProducts.sort((a, b) =>
                    getProductPriceByPeriod(a, rentalPeriod) - getProductPriceByPeriod(b, rentalPeriod)
                );
            case 'Price (High - Low)':
                // use the calculated price for sorting based on selected rental period
                return sortableProducts.sort((a, b) =>
                    getProductPriceByPeriod(b, rentalPeriod) - getProductPriceByPeriod(a, rentalPeriod)
                );
            case 'New arrivals':
            case 'Offers':
            case 'Top selling':
            default:
                return sortableProducts.sort((a, b) => a.id - b.id);
        }

        // key change: add rentalperiod to the dependency array
    }, [sortBy, filterState, rentalPeriod]);
    // end of sort & filter logic

    return (
        <div className="product-listing-area">

            {/* sort by and heading section (with bottom line) */}
            <div className="row align-items-center mb-4 product-listing-header">

                {/* heading */}
                <div className="col-auto">
                    <h1 className="product-listing-heading m-0">Rental services</h1>
                </div>

                {/* rental period dropdown */}
                <div className="col-auto d-flex align-items-center me-3 rental-period-selector">
                    <span className="sort-by-label me-3 d-none d-sm-inline">Period</span>

                    <div className={`dropdown d-inline-block sort-dropdown-container ${isPeriodDropdownOpen ? 'show' : ''}`}>
                        <button
                            className="btn btn-sm sort-by-btn-custom" // same classname as sort by button
                            type="button"
                            onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
                            aria-expanded={isPeriodDropdownOpen}
                        >
                            {/* display the currently selected period */}
                            {rentalPeriod}
                            {isPeriodDropdownOpen ? <FaAngleUp className="ms-2" /> : <FaAngleDown className="ms-2" />}
                        </button>

                        {/* dropdown menu for period */}
                        <ul className={`dropdown-menu dropdown-menu-end ${isPeriodDropdownOpen ? 'show' : ''}`}>
                            {rentalPeriods.map(period => (
                                <li key={period}>
                                    <a
                                        className={`dropdown-item sort-dropdown-item ${rentalPeriod === period ? 'sort-item-active' : ''}`} // same classname as sort options
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); handlePeriodChange(period); }}
                                    >
                                        {period}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                {/* sort by dropdown */}
                <div className="col-auto ms-auto d-flex align-items-center">
                    <span className="sort-by-label me-3 d-none d-sm-inline">Sort by</span>

                    <div className={`dropdown d-inline-block sort-dropdown-container ${isSortDropdownOpen ? 'show' : ''}`}>
                        <button
                            className="btn btn-sm sort-by-btn-custom"
                            type="button"
                            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                            aria-expanded={isSortDropdownOpen}
                        >
                            {/* icon changes based on state */}
                            {sortBy}
                            {isSortDropdownOpen ? <FaAngleUp className="ms-2" /> : <FaAngleDown className="ms-2" />}
                        </button>

                        {/* dropdown menu */}
                        <ul className={`dropdown-menu dropdown-menu-end ${isSortDropdownOpen ? 'show' : ''}`}>
                            {sortOptions.map(option => (
                                <li key={option}>
                                    <a
                                        className={`dropdown-item sort-dropdown-item ${sortBy === option ? 'sort-item-active' : ''}`}
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); handleSortChange(option); }}
                                    >
                                        {option}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* product cards grid */}
            <div className="row g-4">
                {/* pass isrental={true} to productcard */}
                {sortedProducts.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
                        {/* wrapper for controlling card width and centering */}
                        <div className="product-card-wrapper mx-auto">
                            <ProductCard product={product} isRental={true} rentalPeriod={rentalPeriod} />
                        </div>
                    </div>
                ))}
            </div>
            {/* message if no products match the filters */}
            {sortedProducts.length === 0 && (
                <div className="col-12 text-center py-5">
                    <p className="lead text-muted">No products match the selected filters.</p>
                </div>
            )}
        </div>
    );
};

export default RentalProductListing;