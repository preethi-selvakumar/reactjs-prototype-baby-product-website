import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSearch, FaMicrophone, FaAngleDown, FaShoppingCart, FaBars } from 'react-icons/fa';
import { categoryDropdownData } from '../data/dropdownData';
import offerIcon from '../assets/images/offer-icon.png';
import autumnIcon from '../assets/images/autumn-icon.png';
import logoImage from '../assets/images/babyzone-logo.png';
// context hook: added isUserLoggedIn and logoutUser
import { useAppContext } from '../context/AppContext';

const renderMegaDropdownContent = (data, categoryName, isMobile) => {
    if (!data || data.type !== 'mega') return null;

    const customClass = `${categoryName
        .replace(/ & /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/-+/g, '-')
        .toLowerCase()}-mega`;

    const isThreeColumnLayout = (
        categoryName === 'Baby fashion' ||
        categoryName === 'Footwear & Accessories' ||
        categoryName === 'Furniture & Bedding'
    );

    const columnClass = isMobile ? 'col-12' : (isThreeColumnLayout ? 'col-lg-4 col-md-6 col-sm-6' : 'col-lg-3 col-md-6 col-sm-6');
    const rowClasses = isThreeColumnLayout ? 'row mega-dropdown-content justify-content-center' : 'row mega-dropdown-content';
    const WrapperComponent = isMobile ? 'div' : 'div';
    const containerClass = isMobile ? "mobile-category-dropdown-content" : (isThreeColumnLayout ? "" : "container");

    return (
        <div className={`mega-dropdown-placeholder ${customClass} ${isMobile ? 'is-mobile' : ''}`} id={`${categoryName.replace(/\s/g, '-')}-menu`}>
            <WrapperComponent className={containerClass}>
                <div className={isMobile ? "row" : rowClasses}>
                    {data.columns.map((column, colIndex) => (
                        <div key={colIndex} className={`${columnClass} category-column`}>
                            <h5 className="category-column-title">{column.title}</h5>
                            <ul className="category-link-list">
                                {column.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <span className="category-dropdown-text-item">
                                            {link.name}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {column.subSections && column.subSections.map((sub, subIndex) => (
                                <React.Fragment key={subIndex}>
                                    <h5 className="category-column-title sub-section-title">{sub.title}</h5>
                                    <ul className="category-link-list">
                                        {sub.links.map((link, subLinkIndex) => (
                                            <li key={subLinkIndex}>
                                                <span className="category-dropdown-text-item">
                                                    {link.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </React.Fragment>
                            ))}
                        </div>
                    ))}
                </div>
            </WrapperComponent>
        </div>
    );
};

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // modified context hook: added isUserLoggedIn and logoutUser
    const {
        cartCount,
        openLoginModal,
        openRegisterModal,
        isUserLoggedIn, // login status
        logoutUser      // logout function (with alert)
    } = useAppContext();

    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isAskInputVisible, setIsAskInputVisible] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileAccountDropdownOpen, setIsMobileAccountDropdownOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState(null);

    const rotatingTexts = [
        {
            icon: offerIcon,
            content: 'Get Rs.250 additional off on cart value of Rs.2999 and above',
        },
        {
            icon: autumnIcon,
            content: 'Autumn winter 2025 is here! Dress your little one in soft, breathable fabrics for ultimate comfort and style!',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % rotatingTexts.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [rotatingTexts.length]);

    const currentDisplay = rotatingTexts[currentTextIndex];

    const toggleAskInput = () => {
        setIsAskInputVisible(prev => !prev);
    };

    const toggleAccountDropdown = () => {
        setIsAccountDropdownOpen(prev => !prev);
    };

    const toggleMobileAccountDropdown = () => {
        setIsMobileAccountDropdownOpen(prev => !prev);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
        if (prev) {
            setOpenCategory(null);
        }
    };

    const toggleCategoryDropdown = (categoryName, event) => {
        if (event) event.preventDefault();
        setOpenCategory(prev => prev === categoryName ? null : categoryName);
    };

    // logout function (for both desktop and mobile)
    const handleLogoutClick = () => {
        logoutUser(); // call the context function to show alert and log out
        setIsAccountDropdownOpen(false); // close desktop dropdown
        setIsMobileAccountDropdownOpen(false); // close mobile dropdown
    }

    // function to open login modal
    const handleLoginClick = () => {
        openLoginModal();
        setIsAccountDropdownOpen(false);
        setIsMobileAccountDropdownOpen(false);
    }

    // function to open register modal
    const handleRegisterClick = (e) => {
        e.preventDefault();
        openRegisterModal();
        setIsAccountDropdownOpen(false);
        setIsMobileAccountDropdownOpen(false);
    }

    // helper function to render a category link with/without dropdown
    const renderCategoryLink = (categoryName, isMobile = false) => {
        const data = categoryDropdownData[categoryName];
        if (!data) return null;

        const isOpen = openCategory === categoryName;
        const isCategoryActive = currentPath === data.mainUrl;

        const linkClass = isMobile ? "mobile-category-link" : "pink-category-link";
        const combinedLinkClass = `${linkClass} ${isOpen || isCategoryActive ? 'active-category' : ''}`;

        if (data.hasDropdown) {
            return (
                <div className={`category-dropdown-wrapper ${isMobile ? 'mobile-category-wrapper' : ''}`} key={categoryName}>

                    {isMobile ? (
                        <div className="mobile-category-link-row">
                            <Link
                                to={data.mainUrl}
                                className={combinedLinkClass}
                            >
                                {categoryName}
                            </Link>
                            <button
                                className={`category-dropdown-toggle-icon ${isOpen ? 'active-icon' : ''}`}
                                onClick={(e) => toggleCategoryDropdown(categoryName, e)}
                                aria-expanded={isOpen}
                                aria-controls={`${categoryName.replace(/\s/g, '-')}-menu`}
                            >
                                <FaAngleDown className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to={data.mainUrl}
                                className={combinedLinkClass}
                            >
                                {categoryName}
                            </Link>
                            <button
                                className={`category-dropdown-toggle-icon ${isOpen || isCategoryActive ? 'active-icon' : ''}`}
                                onClick={(e) => toggleCategoryDropdown(categoryName, e)}
                                aria-expanded={isOpen}
                                aria-controls={`${categoryName.replace(/\s/g, '-')}-menu`}
                            >
                                <FaAngleDown className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} />
                            </button>
                        </>
                    )}

                    {isOpen && isMobile &&
                        renderMegaDropdownContent(data, categoryName, true)
                    }
                </div>
            );
        }

        return (
            <Link key={categoryName} to={data.mainUrl} className={`${linkClass} ${isCategoryActive ? 'active-category' : ''}`}>
                {categoryName}
            </Link>
        );
    };

    const openCategoryData = openCategory ? categoryDropdownData[openCategory] : null;

    // helper function for applying active link class
    const getNavLinkClass = (path) => {
        let isActive = currentPath === path;

        if (path === '/') {
            isActive = currentPath === '/' || currentPath === '/home';
        }

        return `nav-link-item ${isActive ? 'active-link' : ''}`;
    };

    return (
        <div style={{ overflowX: 'hidden' }}>
            <nav className="navbar-container">
                {/* top rotating strip */}
                <div className="navbar-top-strip container-fluid">
                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="navbar-strip-content">
                                {currentDisplay.icon && (
                                    <img src={currentDisplay.icon} alt="icon" className="navbar-strip-icon" />
                                )}
                                {currentDisplay.content}
                            </p>
                        </div>
                    </div>
                </div>

                {/* main navigation bar */}
                <div className="navbar-main container-fluid">
                    <div className="row navbar-row-flex">
                        <div className="col-auto navbar-logo-col">
                            <Link to="/" className="navbar-logo-link">
                                <img src={logoImage} alt="Baby Store Logo" className="navbar-logo-img" />
                            </Link>
                        </div>
                        <div className="col-lg-5 col-md-6 col-sm-7 navbar-search-ask-col">
                            <div className="search-input-wrapper">
                                <FaSearch className="search-icon" />
                                <input type="text" placeholder="Search here" className="search-input" />
                            </div>
                            <button
                                className={`voice-ask-toggle-btn ${isAskInputVisible ? 'ask-mode-active' : ''}`}
                                onClick={toggleAskInput}
                            >
                                <FaMicrophone className="voice-icon" />
                            </button>
                            {isAskInputVisible && (
                                <input
                                    type="text"
                                    placeholder="Ask something..."
                                    className="ask-input"
                                    aria-label="Ask something input"
                                />
                            )}
                        </div>
                        <div className="col-auto navbar-links-cart-col">
                            <div className="navbar-links-flex">
                                <Link to="/" className={getNavLinkClass('/')}>Home</Link>
                                <Link to="/about" className={getNavLinkClass('/about')}>About</Link>
                                <Link to="/contact" className={getNavLinkClass('/contact')}>Contact</Link>
                                <Link to="/forum" className={getNavLinkClass('/forum')}>Forum</Link>
                                <Link to="/parenting-classes" className={getNavLinkClass('/parenting-classes')}>Parenting classes</Link>

                                <div className="nav-dropdown-wrapper">
                                    <button
                                        className={`nav-link-item nav-dropdown-toggle ${isAccountDropdownOpen ? 'active-link' : ''}`}
                                        onClick={toggleAccountDropdown}
                                    >
                                        Account <FaAngleDown className={`dropdown-arrow ${isAccountDropdownOpen ? 'rotated' : ''}`} />
                                    </button>
                                    {isAccountDropdownOpen && (
                                        <div className="nav-dropdown-menu">
                                            {/* logic change (desktop): if user is logged in, show logout */}
                                            {isUserLoggedIn ? (
                                                <button
                                                    onClick={handleLogoutClick} // logout function
                                                    className="dropdown-item nav-logout-btn"
                                                >
                                                    Log Out
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={handleLoginClick}
                                                        className="dropdown-item nav-login-btn"
                                                    >
                                                        Log In
                                                    </button>
                                                    <button
                                                        onClick={handleRegisterClick}
                                                        className={`dropdown-item ${currentPath === '/register' ? 'active-link' : ''}`}
                                                    >
                                                        Register
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="hamburger-btn" onClick={toggleMobileMenu} aria-label="Toggle Navigation Menu">
                                <FaBars className="hamburger-icon" />
                            </button>
                            <Link to="/cart" className="cart-link-flex">
                                <span className={getNavLinkClass('/cart')}>Cart</span>
                                <FaShoppingCart className="cart-icon" />
                                {/* display cart count from context */}
                                <span className="cart-count">{cartCount}</span>
                            </Link>
                        </div>
                    </div>

                    {/* collapsible mobile menu container */}
                    {isMobileMenuOpen && (
                        <div className="mobile-menu-dropdown">
                            {/* (mobile search and voice ask) */}
                            <div className="mobile-search-ask-wrapper">
                                <div className="search-input-wrapper mobile-search-input">
                                    <FaSearch className="search-icon" />
                                    <input type="text" placeholder="Search here" className="search-input" />
                                </div>
                                <div className="mobile-ask-voice-row">
                                    <button
                                        className={`voice-ask-toggle-btn mobile-voice-btn ${isAskInputVisible ? 'ask-mode-active' : ''}`}
                                        onClick={toggleAskInput}
                                    >
                                        <FaMicrophone className="voice-icon" />
                                    </button>
                                    {isAskInputVisible && (
                                        <input
                                            type="text"
                                            placeholder="Ask something..."
                                            className="ask-input mobile-ask-input"
                                            aria-label="Ask something input"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* mobile main links */}
                            <div className="mobile-nav-links">
                                <Link to="/" className={`mobile-nav-link ${currentPath === '/' || currentPath === '/home' ? 'active-link' : ''}`}>Home</Link>
                                <Link to="/about" className={`mobile-nav-link ${currentPath === '/about' ? 'active-link' : ''}`}>About</Link>
                                <Link to="/contact" className={`mobile-nav-link ${currentPath === '/contact' ? 'active-link' : ''}`}>Contact</Link>
                                <Link to="/forum" className={`mobile-nav-link ${currentPath === '/forum' ? 'active-link' : ''}`}>Forum</Link>
                                <Link to="/parenting-classes" className={`mobile-nav-link ${currentPath === '/parenting-classes' ? 'active-link' : ''}`}>Parenting classes</Link>

                                <div className="mobile-dropdown-wrapper">
                                    <button
                                        className={`mobile-nav-link mobile-dropdown-toggle ${isMobileAccountDropdownOpen ? 'active-link' : ''}`}
                                        onClick={toggleMobileAccountDropdown}
                                    >
                                        Account <FaAngleDown className={`dropdown-arrow ${isMobileAccountDropdownOpen ? 'rotated' : ''}`} />
                                    </button>
                                    {isMobileAccountDropdownOpen && (
                                        <div className="mobile-dropdown-menu">
                                            {/* logic change (mobile): if user is logged in, show logout */}
                                            {isUserLoggedIn ? (
                                                <button
                                                    onClick={handleLogoutClick}
                                                    className="mobile-dropdown-item mobile-nav-logout-btn"
                                                >
                                                    Log Out
                                                </button>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={handleLoginClick}
                                                        className="mobile-dropdown-item mobile-nav-login-btn"
                                                    >
                                                        Log In
                                                    </button>
                                                    <button
                                                        onClick={handleRegisterClick}
                                                        className={`mobile-dropdown-item ${currentPath === '/register' ? 'active-link' : ''}`}
                                                    >
                                                        Register
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mobile-category-menu">
                                {categoryDropdownData.menuOrder.map(categoryName => renderCategoryLink(categoryName, true))}
                            </div>
                        </div>
                    )}
                </div>

                {/* category navigation bar (pink strip) */}
                <div className="pink-category position-relative">
                    <div className="navbar-categories-flex">
                        {categoryDropdownData.menuOrder.map(categoryName => renderCategoryLink(categoryName))}
                    </div>
                </div>

                {/* render the mega dropdown content here */}
                {!isMobileMenuOpen && openCategory && openCategoryData && openCategoryData.hasDropdown &&
                    renderMegaDropdownContent(openCategoryData, openCategory, false)
                }

            </nav>
        </div>
    );
};

export default Navbar;
