import React from 'react';
import { Link } from 'react-router-dom';

import babyZoneLogo from '../assets/images/babyzone-logo.png';
import facebookIcon from '../assets/images/facebook-icon.png';
import instagramIcon from '../assets/images/instagram-icon.png';
import twitterIcon from '../assets/images/twitter.png';
import youtubeIcon from '../assets/images/youtube.png';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="container-fluid py-4 footer-content-wrapper">
                <div className="row footer-main-row">

                    {/* Column 1: Logo and Address */}
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-4 footer-col-info">
                        <img src={babyZoneLogo} alt="BabyZone Logo" className="footer-logo mb-3" />
                        <p className="footer-address">
                            4th street, pallavaram,
                            <br />
                            Near bus stand
                            <br />
                            Madurai-234367
                        </p>
                    </div>

                    {/* Column 2: Top categories (Links updated to React Router Links) */}
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-4 footer-col">
                        <h5 className="footer-heading">Top categories</h5>
                        <ul className="footer-list">
                            <li><Link to="/baby-fashion-link" className="footer-link">Baby Fashion</Link></li>
                            <li><Link to="/toys-link" className="footer-link">Toys</Link></li>
                            <li><Link to="/footwear-accessories-link" className="footer-link">Footwear & Accessories</Link></li>
                            <li><Link to="/moms-baby-care" className="footer-link">Moms & Baby care</Link></li>
                            <li><Link to="/furniture-bedding" className="footer-link">Furniture & Bedding</Link></li>
                            <li><Link to="/rental-services-link" className="footer-link">Rental services</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Customer support (Links) */}
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-4 footer-col">
                        <h5 className="footer-heading">Customer support</h5>
                        <ul className="footer-list">
                            <li><a href="#" className="footer-link">Help & contact us</a></li>
                            <li><a href="#" className="footer-link">Delivery information</a></li>
                            <li><a href="#" className="footer-link">Track your order</a></li>
                            <li><a href="#" className="footer-link">Returns & exchange</a></li>
                            <li><a href="#" className="footer-link">Promotion Terms & conditions</a></li>
                            <li><a href="#" className="footer-link">Terms & conditions</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Useful Links (Links) */}
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-4 footer-col">
                        <h5 className="footer-heading">Useful Links</h5>
                        <ul className="footer-list">
                            <li><a href="#" className="footer-link">Store finder</a></li>
                            <li><a href="#" className="footer-link">Sitemap</a></li>
                            <li><a href="#" className="footer-link">Fees and payments policy</a></li>
                        </ul>
                    </div>

                    {/* Column 5: About BabyZone (Links) */}
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-4 footer-col">
                        <h5 className="footer-heading">About BabyZone</h5>
                        <ul className="footer-list">
                            <li><a href="#" className="footer-link">Privacy Policy</a></li>
                            <li><a href="#" className="footer-link">Terms & conditions</a></li>
                        </ul>
                    </div>

                    {/* Column 6: Social Media Icons */}
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-4 footer-col footer-social-col">
                        <h5 className="footer-heading">Social Media</h5>
                        <div className="social-icons">
                            <a href="#" className="social-link"><img src={facebookIcon} alt="Facebook" className="social-icon" /></a>
                            <a href="#" className="social-link"><img src={instagramIcon} alt="Instagram" className="social-icon" /></a>
                            <a href="#" className="social-link"><img src={twitterIcon} alt="Twitter" className="social-icon" /></a>
                            <a href="#" className="social-link"><img src={youtubeIcon} alt="YouTube" className="social-icon" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
