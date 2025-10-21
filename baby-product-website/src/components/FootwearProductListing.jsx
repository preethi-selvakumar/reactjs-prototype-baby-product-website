import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import products from '../data/footwearData';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const FootwearProductListing = ({ filterState }) => {
    const [sortBy, setSortBy] = useState('New arrivals');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const sortOptions = ['New arrivals', 'Top selling', 'Price (Low - High)', 'Price (High - Low)', 'Offers'];

    const handleSortChange = (option) => {
        setSortBy(option);
        setIsDropdownOpen(false);
    };

    // sort and filter logic using useMemo
    const sortedProducts = useMemo(() => {
        // start with filtering
        let filteredList = products.filter(product => {
            const { gender, ageGroup, brands, colors, discount, price, collection, showPremium } = filterState;
            const productName = product.name.toLowerCase();

            const productColor = product.colorName ? product.colorName : '';
            const productDiscount = product.discountRate ? product.discountRate : 0;

            // function to check if a product has a discount within a range
            const checkDiscount = (rate, option) => {
                if (option === 'Upto 10%') return rate >= 1 && rate <= 10;
                if (option === '10%-20%') return rate > 10 && rate <= 20;
                if (option === '20%-30%') return rate > 20 && rate <= 30;
                if (option === '30%-40%') return rate > 30 && rate <= 40;
                return true;
            };

            // gender filter
            if (gender) {
                if (gender === 'Boy') {
                    const boyKeywords = ['boy', 'boys', 'male', 'sandal', 'shoe', 'keppi', 'mitts', 'beanie', 'rocket', 'dinosaur'];
                    const isBoyProduct = boyKeywords.some(keyword => productName.includes(keyword));
                    if (!isBoyProduct) return false;
                }

                if (gender === 'Girl') {
                    const girlKeywords = ['girl', 'girls', 'female', 'clogs', 'hat', 'beanie', 'socktop', 'frock'];
                    const isGirlProduct = girlKeywords.some(keyword => productName.includes(keyword));
                    if (!isGirlProduct) return false;
                }
            }

            // brands filter
            if (brands.length > 0) {
                const matchesBrand = brands.some(brand => productName.includes(brand.toLowerCase().split('\'')[0]));
                if (!matchesBrand) return false;
            }

            // color filter
            if (colors.length > 0) {
                if (!colors.includes(productColor)) return false;
            }

            // discount filter
            if (discount) {
                if (!checkDiscount(productDiscount, discount)) return false;
            }

            // price filter
            if (price) {
                const priceRange = price.match(/\d+/g).map(Number);
                const [minPrice, maxPrice] = priceRange.length === 1 ? [priceRange[0], 99999] : priceRange;
                if (product.price < minPrice || product.price > maxPrice) return false;
            }

            // age filter
            if (ageGroup) {
                if (!product.age.includes(ageGroup.split(' ')[0].replace('-', ''))) return false;
            }

            // premium filter
            if (showPremium && product.isPremium !== true) {
                return false;
            }

            // collection filter
            if (collection) {
                if (collection === 'Trending now' && !product.isTrending) return false;
                if (collection === 'Fast moving' && !product.isFastMoving) return false;
                if (collection === 'Extra warm' && !productName.includes('knitted') && !productName.includes('warm')) return false;
            }

            return true;
        });

        // continue with sorting on the filtered list
        const sortableProducts = [...filteredList];

        switch (sortBy) {
            case 'Price (Low - High)':
                return sortableProducts.sort((a, b) => a.price - b.price);
            case 'Price (High - Low)':
                return sortableProducts.sort((a, b) => b.price - a.price);
            case 'New arrivals':
            case 'Offers':
                return sortableProducts.sort((a, b) => a.id - b.id);
            case 'Top selling':
                return sortableProducts.sort((a, b) => b.id - a.id);
            default:
                return sortableProducts.sort((a, b) => a.id - b.id);
        }
    }, [sortBy, filterState]);

    return (
        <div className="product-listing-area">

            {/* sort by and heading section */}
            <div className="row align-items-center mb-4 product-listing-header">

                {/* heading */}
                <div className="col-auto">
                    <h1 className="product-listing-heading m-0">Footwear & Accessories</h1>
                </div>

                {/* sort by dropdown */}
                <div className="col-auto ms-auto d-flex align-items-center">
                    <span className="sort-by-label me-3 d-none d-sm-inline">Sort by</span>

                    <div className={`dropdown d-inline-block sort-dropdown-container ${isDropdownOpen ? 'show' : ''}`}>
                        <button
                            className="btn btn-sm sort-by-btn-custom"
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            aria-expanded={isDropdownOpen}
                        >
                            {sortBy}
                            {isDropdownOpen ? <FaAngleUp className="ms-2" /> : <FaAngleDown className="ms-2" />}
                        </button>

                        <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`}>
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
                {sortedProducts.map((product) => (
                    <div key={product.id} className="col-lg-4 col-md-6 col-sm-12">
                        <div className="product-card-wrapper mx-auto">
                            <ProductCard product={product} />
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

export default FootwearProductListing;
