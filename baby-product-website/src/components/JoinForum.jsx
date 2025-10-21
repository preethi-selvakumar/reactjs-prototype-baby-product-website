import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import pregnancyImage from '../assets/images/pregnancy.png';
import parentingImage from '../assets/images/parenting.png';
import childcareImage from '../assets/images/childcare.png';
import productReviewsImage from '../assets/images/product-reviews.png';

const JoinModal = ({ isOpen, onClose }) => {
    // use useNavigate hook here
    const navigate = useNavigate();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // state to hold input values
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    // state to hold validation errors
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        // clear error as the user types
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    // validation logic
    const validate = () => {
        let newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // password validation rules
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

        // stronger password validation
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
            // success: form is valid

            // close modal
            onClose();

            // navigate to /forum/chat path
            navigate('/forum/chat');

            // reset form data after successful submission
            setFormData({ name: '', email: '', password: '' });
        } else {
            // failure: validation failed
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

                                {/* input field: name */}
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

                                {/* input field: email */}
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

                                {/* input field: password with eye icon */}
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

                                {/* forgot password link */}
                                <div className="text-right mb-4">
                                    <a href="#" className="forgot-password-link">Forgot password?</a>
                                </div>

                            </div>
                        </div>

                        {/* action buttons */}
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

const ForumCard = ({ title, imageSrc, onJoinClick }) => (
    <div className="col-lg-3 col-md-6 mb-4">
        <div className="forum-card">
            <div className="forum-card-image-wrapper">
                <img src={imageSrc} alt={title} className="forum-card-image" />
                <div className="forum-card-overlay"></div>
                <div className="forum-card-content-wrapper">
                    <div className="forum-card-content">
                        <h3 className="forum-card-title">{title}</h3>
                        <p className="forum-card-description">Join forum to ask or share something</p>
                    </div>
                    <div className="forum-card-actions">
                        <button className="forum-card-join-btn" onClick={onJoinClick}>Join</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const JoinForum = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="join-forum-section">
            <div className="container-fluid py-5">
                {/* top button section (opens modal) */}
                <div className="row justify-content-start mb-5">
                    <div className="col-auto">
                        <button className="join-forum-top-btn" onClick={openModal}>Join Forum</button>
                    </div>
                </div>

                {/* forum cards section (each card button opens modal) */}
                <div className="row forum-cards-row px-3 justify-content-center">

                    <ForumCard
                        title="Pregnancy"
                        imageSrc={pregnancyImage}
                        onJoinClick={openModal}
                    />
                    <ForumCard
                        title="Parenting"
                        imageSrc={parentingImage}
                        onJoinClick={openModal}
                    />
                    <ForumCard
                        title="Childcare"
                        imageSrc={childcareImage}
                        onJoinClick={openModal}
                    />
                    <ForumCard
                        title="Product Reviews"
                        imageSrc={productReviewsImage}
                        onJoinClick={openModal}
                    />
                </div>
            </div>

            {/* modal component is rendered here */}
            {/* since joinmodal is used inside a router, it can use useNavigate hook */}
            <JoinModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default JoinForum;
