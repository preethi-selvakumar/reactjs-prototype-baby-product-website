import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FilterSidebar from '../components/FilterSidebar';
import BabyProductListing from '../components/BabyProductListing';

const BabyFashion = () => {
    // unified state for all filters is now managed here
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

    // function to clear all filters
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
        <div className="baby-fashion-page">

            <Navbar />

            {/* main content area (filter sidebar + product listing) */}
            <div className="container-fluid py-4">
                <div className="row">

                    {/* filter sidebar column */}
                    <div className="col-lg-3 col-md-4">
                        {/* pass filterstate, setfilterstate, and the handleclearfilters function as props */}
                        <FilterSidebar
                            filterState={filterState}
                            setFilterState={setFilterState}
                            onClearFilters={handleClearFilters}
                        />
                    </div>

                    {/* product listing column */}
                    <div className="col-lg-9 col-md-8">
                        {/* pass filterstate to the listing component */}
                        <BabyProductListing
                            filterState={filterState}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default BabyFashion;
