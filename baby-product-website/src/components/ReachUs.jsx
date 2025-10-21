import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import Chatbot from './Chatbot';

import trackOrderImage from '../assets/images/track.png';
import exchangeRefundImage from '../assets/images/exchange.png';

const ReachUs = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    // start of change: form state variables
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        queries: ''
    });

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    // updates input values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // handles form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // prevents automatic page reload on form submit

        console.log("Form Data Submitted:", formData);

        // show alert message
        alert(`Thank you for reaching out, ${formData.name}! Your message has been received. We will contact you soon.`);

        // clear form fields after alert ok
        setFormData({
            name: '',
            email: '',
            phone: '',
            queries: ''
        });
    };

    return (
        <div className="reach-us-page-wrapper">
            <div className="container-fluid py-5">
                <div className="row reach-us-content-row">

                    {/* left section: reach us info & buttons */}
                    <div className="col-lg-5 col-md-6 mb-4 mb-md-0">
                        <div className="reach-us-section">
                            <h2 className="reach-us-heading">Reach Us</h2>

                            {/* contact info box (1st box) */}
                            <div className="contact-info-box">
                                <p><FaPhoneAlt className="contact-icon" /> +123-456-7890</p>
                                <p><FaEnvelope className="contact-icon" /> support@babyzone.com</p>
                            </div>

                            {/* action buttons (2nd & 3rd box) */}
                            <a href="#" className="action-button">
                                <img src={trackOrderImage} alt="Track Order" className="action-button-icon" />
                                <span>Track order & <br />Cancel order</span>
                            </a>

                            <a href="#" className="action-button">
                                <img src={exchangeRefundImage} alt="Exchange and Refund" className="action-button-icon" />
                                <span>Exchange and <br />refund policy</span>
                            </a>

                            {/* live chat button */}
                            <button className="live-chat-button" onClick={toggleChat}>
                                Live Chat
                            </button>
                        </div>
                    </div>

                    {/* right section: contact form */}
                    <div className="col-lg-6 offset-lg-1 col-md-6">
                        <h2 className="contact-form-heading">Contact Form</h2>
                        <div className="contact-form-section">
                            {/* onsubmit event added */}
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    {/* value and onchange added */}
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    {/* value and onchange added */}
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Email Id"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone" className="form-label">Phone Number</label>
                                    {/* value and onchange added */}
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        placeholder="Phone Number"
                                        className="form-control"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="queries" className="form-label">Queries</label>
                                    {/* value and onchange added */}
                                    <textarea
                                        id="queries"
                                        name="queries"
                                        placeholder="Your Message..."
                                        rows="4"
                                        className="form-control"
                                        value={formData.queries}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="send-button">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* live chat modal - only show if ischatopen is true */}
            {isChatOpen && (
                <Chatbot isOpen={isChatOpen} onClose={toggleChat} />
            )}
        </div>
    );
};

export default ReachUs;
