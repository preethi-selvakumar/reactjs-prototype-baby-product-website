import React from 'react';

const FilterSidebar = ({
    filterState, // object containing all selected filter values from the parent
    setFilterState, // function to update the filter state in the parent
}) => {

    // helper function to handle the change and update the state in the parent
    const handleCheckboxChange = (key, value, currentValues) => {
        let newValue;

        if (Array.isArray(currentValues)) {
            // logic for multi-select checkboxes (brands, colors)
            if (currentValues.includes(value)) {
                newValue = currentValues.filter((item) => item !== value);
            } else {
                newValue = [...currentValues, value];
            }
        } else {
            // logic for single-select checkboxes (gender, agegroup, price, discount, collection)
            // selecting an option again clears it ('')
            newValue = currentValues === value ? '' : value;
        }

        // update the parent state using the key and the new value
        setFilterState(prev => ({
            ...prev,
            [key]: newValue
        }));
    };

    // destructuring state from the parent prop for cleaner use in jsx
    const {
        gender, ageGroup, brands, colors, discount, price, collection, showPremium
    } = filterState;

    const allBrands = [
        'Babyhug', 'Babyoye', 'Kookie Kids', 'Carter\'s', 'Dapper Dudes',
        'Honeyshop', 'Kiwi', 'Pampers', 'Plum Tree', 'Rotnas',
        'Tango', 'UCB'
    ];

    const allColors = [
        { name: 'Blue', code: '#007bff' },
        { name: 'White', code: '#ffffff' },
        { name: 'Red', code: '#dc3545' },
        { name: 'Multicolor', code: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)' },
        { name: 'Yellow', code: '#ffc107' },
        { name: 'Green', code: '#28a745' },
        { name: 'Orange', code: '#fd7e14' },
        { name: 'Pink', code: '#e83e8c' },
        { name: 'Brown', code: '#6c757d' },
        { name: 'Sky blue', code: '#87CEEB' },
        { name: 'Peach', code: '#FFDAB9' },
        { name: 'Navy blue', code: '#000080' },
    ];

    return (
        <div className="filter-sidebar-container p-3">
            <h3 className="filter-sidebar-heading mb-4">filters</h3>

            {/* gender filter */}
            <div className="filter-section mb-4">
                <h5 className="filter-subheading mb-2">gender</h5>
                <div className="filter-option form-check">
                    <input
                        className="form-check-input filter-checkbox"
                        type="checkbox"
                        id="genderBoy"
                        checked={gender === 'Boy'}
                        onChange={() => handleCheckboxChange('gender', 'Boy', gender)}
                    />
                    <label className="form-check-label filter-label" htmlFor="genderBoy">boy</label>
                </div>
                <div className="filter-option form-check">
                    <input
                        className="form-check-input filter-checkbox"
                        type="checkbox"
                        id="genderGirl"
                        checked={gender === 'Girl'}
                        onChange={() => handleCheckboxChange('gender', 'Girl', gender)}
                    />
                    <label className="form-check-label filter-label" htmlFor="genderGirl">girl</label>
                </div>
            </div>

            {/* age group filter */}
            <div className="filter-section mb-4">
                <h5 className="filter-subheading mb-2">age group</h5>
                {['0-6 months', '7-12 months', 'Kids', 'Adults'].map(age => (
                    <div className="filter-option form-check" key={age}>
                        <input
                            className="form-check-input filter-checkbox"
                            type="checkbox"
                            id={`age${age.replace(/\s+/g, '')}`}
                            checked={ageGroup === age}
                            onChange={() => handleCheckboxChange('ageGroup', age, ageGroup)}
                        />
                        <label className="form-check-label filter-label" htmlFor={`age${age.replace(/\s+/g, '')}`}>
                            {age}
                        </label>
                    </div>
                ))}
            </div>

            {/* brands filter */}
            <div className="filter-section filter-scroll-box mb-4 p-2">
                <h5 className="filter-subheading mb-2">brands</h5>
                <div className="filter-scroll-content">
                    {allBrands.map((brand) => (
                        <div className="filter-option form-check" key={brand}>
                            <input
                                className="form-check-input filter-checkbox"
                                type="checkbox"
                                id={`brand${brand.replace(/\s+/g, '')}`}
                                checked={brands.includes(brand)}
                                onChange={() => handleCheckboxChange('brands', brand, brands)}
                            />
                            <label className="form-check-label filter-label" htmlFor={`brand${brand.replace(/\s+/g, '')}`}>
                                {brand}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* color filter */}
            <div className="filter-section filter-scroll-box mb-4 p-2">
                <h5 className="filter-subheading mb-2">color</h5>
                <div className="filter-scroll-content">
                    {allColors.map((color) => (
                        <div className="filter-option form-check d-flex align-items-center" key={color.name}>
                            <input
                                className="form-check-input filter-checkbox"
                                type="checkbox"
                                id={`color${color.name.replace(/\s+/g, '')}`}
                                checked={colors.includes(color.name)}
                                onChange={() => handleCheckboxChange('colors', color.name, colors)}
                            />
                            <span
                                className="color-dot me-2"
                                style={{ background: color.code, border: color.name === 'White' ? '1px solid #ccc' : 'none' }}
                            ></span>
                            <label className="form-check-label filter-label" htmlFor={`color${color.name.replace(/\s+/g, '')}`}>
                                {color.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* discount filter */}
            <div className="filter-section mb-4">
                <h5 className="filter-subheading mb-2">discount</h5>
                {['Upto 10%', '10%-20%', '20%-30%', '30%-40%'].map((discountOption) => (
                    <div className="filter-option form-check" key={discountOption}>
                        <input
                            className="form-check-input filter-checkbox"
                            type="checkbox"
                            id={`discount${discountOption.replace(/[^a-zA-Z0-9]/g, '')}`}
                            checked={discount === discountOption}
                            onChange={() => handleCheckboxChange('discount', discountOption, discount)}
                        />
                        <label className="form-check-label filter-label" htmlFor={`discount${discountOption.replace(/[^a-zA-Z0-9]/g, '')}`}>
                            {discountOption}
                        </label>
                    </div>
                ))}
            </div>

            {/* price filter */}
            <div className="filter-section mb-4">
                <h5 className="filter-subheading mb-2">price</h5>
                {['₹ 0-250', '₹ 250-1000', '₹ 1000-3000', '₹ 3000-5000'].map((priceOption) => (
                    <div className="filter-option form-check" key={priceOption}>
                        <input
                            className="form-check-input filter-checkbox"
                            type="checkbox"
                            id={`price${priceOption.replace(/[^a-zA-Z0-9]/g, '')}`}
                            checked={price === priceOption}
                            onChange={() => handleCheckboxChange('price', priceOption, price)}
                        />
                        <label className="form-check-label filter-label" htmlFor={`price${priceOption.replace(/[^a-zA-Z0-9]/g, '')}`}>
                            {priceOption}
                        </label>
                    </div>
                ))}
            </div>

            {/* curated collection filter */}
            <div className="filter-section mb-4">
                <h5 className="filter-subheading mb-2">curated collection</h5>
                {['Trending now', 'Fast moving', 'Extra warm'].map((collectionOption) => (
                    <div className="filter-option form-check" key={collectionOption}>
                        <input
                            className="form-check-input filter-checkbox"
                            type="checkbox"
                            id={`collection${collectionOption.replace(/\s+/g, '')}`}
                            checked={collection === collectionOption}
                            onChange={() => handleCheckboxChange('collection', collectionOption, collection)}
                        />
                        <label className="form-check-label filter-label" htmlFor={`collection${collectionOption.replace(/\s+/g, '')}`}>
                            {collectionOption}
                        </label>
                    </div>
                ))}
            </div>

            {/* premium filter */}
            <div className="filter-section mb-4">
                <h5 className="filter-subheading mb-2">premium</h5>
                <div className="filter-option form-check">
                    <input
                        className="form-check-input filter-checkbox"
                        type="checkbox"
                        id="showPremium"
                        checked={showPremium}
                        // directly update the showpremium boolean in the parent state
                        onChange={() => setFilterState(prev => ({ ...prev, showPremium: !prev.showPremium }))}
                    />
                    <label className="form-check-label filter-label" htmlFor="showPremium">
                        show premium products
                    </label>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
