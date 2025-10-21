import React, { useState } from 'react';
// Importing useNavigate and React Icons for JoinModal
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import professionalImage1 from '../assets/images/professional_childcare.jpg';
import professionalImage2 from '../assets/images/professional_first_step.jpg';
import professionalImage3 from '../assets/images/professional_baby_handling.jpg';

import registerBannerImage from '../assets/images/mother_baby_register_banner.jpg';

// JoinModal Component (Registration Popup)
const JoinModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const minLength = 8;
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if (!formData.name) {
            newErrors.name = "Name is required.";
        }
        if (!formData.email) {
            newErrors.email = "Email is required.";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }
        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else if (formData.password.length < minLength) {
            newErrors.password = `Password must be at least ${minLength} characters long.`;
        } else if (!uppercaseRegex.test(formData.password)) {
            newErrors.password = "Must contain at least one uppercase letter.";
        } else if (!lowercaseRegex.test(formData.password)) {
            newErrors.password = "Must contain at least one lowercase letter.";
        } else if (!numberRegex.test(formData.password)) {
            newErrors.password = "Must contain at least one number.";
        } else if (!specialCharRegex.test(formData.password)) {
            newErrors.password = "Must contain at least one special character (!@#$%...).";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (validate()) {
            onClose();
            navigate('/forum/chat');
            setFormData({ name: '', email: '', password: '' });
        } else {
            console.log("Validation failed.");
        }
    };

    return (
        <div className="join-modal-overlay">
            <div className="join-modal-content">
                <h2 className="modal-heading text-center mb-4">Sign in to Join</h2>
                <form onSubmit={handleRegister}>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-12">
                                <div className="form-group mb-3">
                                    <label htmlFor="name" className="modal-form-label">Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className={`form-control modal-input ${errors.name ? 'is-invalid' : ''}`}
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.name && <div className="error-message">{errors.name}</div>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="email" className="modal-form-label">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`form-control modal-input ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder="Email Id"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.email && <div className="error-message">{errors.email}</div>}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="password" className="modal-form-label">Password *</label>
                                    <div className="password-input-group">
                                        <input
                                            type={isPasswordVisible ? "text" : "password"}
                                            id="password"
                                            className={`form-control modal-input ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="password-toggle-btn"
                                        >
                                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                    {errors.password && <div className="error-message">{errors.password}</div>}
                                </div>
                                <div className="text-right mb-4">
                                    <a href="#" className="forgot-password-link">Forgot password?</a>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                            <div className="col-12 d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn modal-action-btn modal-back-btn"
                                    onClick={onClose}
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    className="btn modal-action-btn modal-register-btn"
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Workshop Card Component
const WorkshopCard = ({ title, conductor, date, time, imageSrc, onRegisterClick }) => {
    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="workshop-card">
                <div className="workshop-card-img-wrapper">
                    <img src={imageSrc} alt={title} className="workshop-card-image" />
                </div>
                <div className="workshop-card-content">
                    <h4 className="workshop-title">{title}</h4>
                    <p className="workshop-details">
                        <span className="workshop-detail-label">Conducted by</span> {conductor}
                    </p>
                    <p className="workshop-details">
                        <span className="workshop-detail-label">Senior Doctor</span>
                    </p>
                    <p className="workshop-details workshop-date">
                        {date}
                    </p>
                    <p className="workshop-details workshop-time">
                        Time: {time}
                    </p>
                    <button
                        className="btn workshop-register-btn modal-register-btn"
                        onClick={onRegisterClick}
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
};

// Bottom Register Banner Component
const RegisterBanner = ({ imageSrc, onRegisterClick }) => {
    return (
        <div className="register-banner-section">
            <div className="container-fluid register-banner-inner-container">
                <div className="row g-0 align-items-center">
                    <div className="col-12 col-md-8 d-flex flex-column justify-content-center align-items-center register-banner-content-col">
                        <p className="register-banner-text">
                            Free sign in to Join classes and Workshop now
                        </p>
                        <button
                            className="btn workshop-register-btn modal-register-btn register-banner-btn"
                            onClick={onRegisterClick}
                        >
                            Register
                        </button>
                    </div>
                    <div className="col-4 d-none d-md-block register-banner-img-col">
                        <img src={imageSrc} alt="Mother and Baby" className="register-banner-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Main Workshops Component
const Workshops = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const workshopData = [
        {
            title: "Child care",
            conductor: "James doe",
            image: professionalImage1,
            date: "Wed, 28 Aug, 2025",
            time: "10.00 Am - 1.00Pm"
        },
        {
            title: "First step with baby",
            conductor: "James doe",
            image: professionalImage2,
            date: "Thu, 29 Aug, 2025",
            time: "11.00 Am - 2.00Pm"
        },
        {
            title: "The Art of Baby Handling",
            conductor: "James doe",
            image: professionalImage3,
            date: "Fri, 30 Aug, 2025",
            time: "9.00 Am - 12.00Pm"
        },
    ];

    return (
        <>
            <div className="workshops-page-section container-fluid py-5">

                {/* Header */}
                <h2 className="workshops-heading mb-4">Workshops</h2>

                {/* Workshop Cards Grid */}
                <div className="row workshops-grid justify-content-start">
                    {workshopData.map((workshop, index) => (
                        <WorkshopCard
                            key={index}
                            title={workshop.title}
                            conductor={workshop.conductor}
                            date={workshop.date}
                            time={workshop.time}
                            imageSrc={workshop.image}
                            onRegisterClick={openModal}
                        />
                    ))}
                </div>
            </div>

            {/* Free Sign In Banner Section: This section is placed outside the Workshops page content.
               That ensures it renders in full width. */}
            <RegisterBanner
                imageSrc={registerBannerImage}
                onRegisterClick={openModal}
            />

            {/* Modal Component */}
            <JoinModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    );
};

export default Workshops;
