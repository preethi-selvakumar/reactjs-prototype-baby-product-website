import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import ToysProductListing from '../components/ToysProductListing';

const Toys = () => {
    // Unified State for all filters is managed here.
    // The filter structure remains the same as it manages general filters (brand, price, etc.)
    const [filterState, setFilterState] = useState({
        gender: '',
        ageGroup: '',
        brands: [],
        colors: [],
        discount: '',
        price: '',
        collection: '',
        showPremium: false,
    });

    // Function to clear all filters
    const handleClearFilters = () => {
        setFilterState({
            gender: '',
            ageGroup: '',
            brands: [],
            colors: [],
            discount: '',
            price: '',
            collection: '',
            showPremium: false,
        });
    };

    return (
        <div className="toys-page">

            <Navbar />

            {/*  Main Content Area (Filter Sidebar + Product Listing) */}
            <div className="container-fluid py-4">
                <div className="row">

                    {/* Filter Sidebar Column */}
                    <div className="col-lg-3 col-md-4">
                        {/* Pass filterState, setFilterState, and the clear function */}
                        <FilterSidebar
                            filterState={filterState}
                            setFilterState={setFilterState}
                            onClearFilters={handleClearFilters} // Clear function is correctly passed
                        />
                    </div>

                    {/* Product Listing Column */}
                    <div className="col-lg-9 col-md-8">
                        {/* Passing filterState to the Toys specific Listing component */}
                        <ToysProductListing
                            filterState={filterState}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Toys;