import React, { useState } from 'react';

const ProductTabsSection = () => {

    // State to manage the active tab
    const [activeTab, setActiveTab] = useState('description');

    // Function to render content based on activeTab
    const renderContent = () => {
        switch (activeTab) {
            case 'description':
                return (
                    // Description Container
                    <div className="product-tab-description-container">
                        <div className="product-tab-content-grid">
                            <div className="product-tab-content-block">
                                <h3 className="product-tab-content-heading">AT A GLANCE</h3>
                                <p className="product-tab-content-text">
                                    This sporty polo is made from responsibly sourced cotton which
                                    makes it cool, airy and perfect for playtime.
                                </p>
                            </div>
                            <div className="product-tab-content-block">
                                <h3 className="product-tab-content-heading">FEATURES AND BENEFITS</h3>
                                <ul className="product-tab-content-list">
                                    <li>100% responsibly sourced cotton</li>
                                    <li>Sports style V-neck collar for comfort during play</li>
                                    <li>Covered back-neck seams to prevent irritation</li>
                                </ul>
                            </div>
                            <div className="product-tab-content-block">
                                <h3 className="product-tab-content-heading">CARE INSTRUCTION</h3>
                                <p className="product-tab-content-text">Machine Wash</p>
                            </div>
                        </div>
                    </div>
                );
            case 'specification':
                return (
                    // Specification Table Container
                    <div className="product-tab-spec-table-container">
                        <div className="product-tab-spec-column">
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Age Group:</span> Kids</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Gender:</span> Boys</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Occasion:</span> Casual</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Primary Colour:</span> Blue</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Primary Material:</span> Cotton Blend</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Material:</span> Body 100% Cotton Trim 100% Cotton</p>
                        </div>
                        <div className="product-tab-spec-column">
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Pattern:</span> Striped</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Technique:</span> Printed</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Product Fit:</span> Regular</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Neck Type:</span> Polo Collar</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Sleeve Type:</span> Short</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Sleeve Length:</span> Short</p>
                            <p className="product-tab-spec-item"><span className="product-tab-spec-key">Closure Type:</span> Slip On</p>
                        </div>
                    </div>
                );
            case 'expert-advice':
                return (
                    // Expert Advice Container (Full Width)
                    <div className="product-tab-content-full-width product-tab-expert-advice-layout">
                        <p className="product-tab-content-text-large product-tab-advice-intro">
                            For babies, stripped polo t-shirts are a great choice! They're comfy and breathable and adorable. Polo shirts are made of materials that are
                            breathable, like cotton and polyester, so baby's stay cool and comfortable even when it's hot outside.
                        </p>
                        <div className="product-tab-expert-advice-blocks">
                            <div className="product-tab-advice-block">
                                <h3 className="product-tab-content-heading">Comfortable</h3>
                                <p className="product-tab-content-text-small">Soft fabrics and gentle on baby's skin</p>
                            </div>
                            <div className="product-tab-advice-block">
                                <h3 className="product-tab-content-heading">Practical</h3>
                                <p className="product-tab-content-text-small">Easy to care for, machine washable and durable</p>
                            </div>
                            <div className="product-tab-advice-block">
                                <h3 className="product-tab-content-heading">Versatile</h3>
                                <p className="product-tab-content-text-small">Suitable for daily wear, outings, or special</p>
                            </div>
                        </div>
                    </div>
                );
            case 'delivery-return':
                return (
                    // Delivery & Return Container (Full Width)
                    <div className="product-tab-content-full-width">
                        <p className="product-tab-content-text-large">
                            This product is applicable for a 30 days return.
                        </p>
                        <p className="product-tab-content-text-large">
                            <a href="/returns-policy" className="product-tab-return-policy-link">click here</a> for information on our hassle free returns policy.
                        </p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="product-tab-section">
            <div className="product-tab-header">
                {/* Description Tab Header */}
                <div
                    className={`product-tab-header-item ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </div>
                {/* Specification Tab Header */}
                <div
                    className={`product-tab-header-item ${activeTab === 'specification' ? 'active' : ''}`}
                    onClick={() => setActiveTab('specification')}
                >
                    Specification
                </div>
                {/* Expert Advice Tab Header */}
                <div
                    className={`product-tab-header-item ${activeTab === 'expert-advice' ? 'active' : ''}`}
                    onClick={() => setActiveTab('expert-advice')}
                >
                    Expert advice
                </div>
                {/* Delivery & Return Tab Header */}
                <div
                    className={`product-tab-header-item ${activeTab === 'delivery-return' ? 'active' : ''}`}
                    onClick={() => setActiveTab('delivery-return')}
                >
                    Delivery & return
                </div>
            </div>

            {/* Content Area */}
            <div className="product-tab-content-box">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProductTabsSection;