import React, { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';

import sleepingBabyImage from '../assets/images/baby-sleeping.png';

const LoginModal = () => {
    const {
        isLoginModalOpen,
        closeLoginModal,
        openRegisterModal,
        loginUser
    } = useAppContext();

    const [showPassword, setShowPassword] = useState(false);

    // Form state for Login (input values)
    const [loginFormData, setLoginFormData] = useState({
        email: '',
        password: '',
    });

    // Error state for Login (invalid credentials, etc.)
    const [loginError, setLoginError] = useState('');


    if (!isLoginModalOpen) {
        return null;
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        closeLoginModal();      // Close the Login modal
        openRegisterModal();    // Open the Register modal
    };

    // Input change handler for Login
    const handleLoginChange = (e) => {
        const { id, value } = e.target;
        setLoginFormData(prev => ({
            ...prev,
            // Remove 'login' from id and convert to lowercase before saving in state
            [id.replace('login', '').toLowerCase()]: value,
        }));
        setLoginError(''); // Clear error message while typing
    };

    // Login Form Submit Logic
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoginError(''); // Clear old errors before submitting

        const { email, password } = loginFormData;

        // Basic empty input check
        if (!email || !password) {
            setLoginError('Please enter both email and password.');
            return;
        }

        // Call loginUser function from context to check credentials
        const result = loginUser(email, password);

        if (result.success) {
            console.log(result.message);
            // Close the modal after successful login
            closeLoginModal();

            // Success alert (optional for demo)
            alert("Login Successful!");
        } else {
            console.error(result.message);
            // Show the error message
            setLoginError(result.message);
        }
    };

    // Helper function to apply error class for Login (based on global loginError state)
    const getLoginInputClass = (fieldName) => {
        const baseClass = "login-form-input";

        // If loginError exists, apply 'input-error' to email and password fields
        const isError = loginError && (fieldName === 'email' || fieldName === 'password');
        return isError ? `${baseClass} input-error` : baseClass;
    };

    return (
        <div className="login-modal-overlay">
            <div className="login-modal-container">
                <button className="login-modal-close-btn" onClick={closeLoginModal} aria-label="Close login modal">
                    <FaTimes />
                </button>

                <div className="row login-modal-content-row">
                    <h2 className="login-modal-title">Log In</h2>
                    {/* Left Column - Image */}
                    <div className="col-md-6 d-none d-md-flex">
                        <div className="login-modal-image-col">
                            <img
                                src={sleepingBabyImage}
                                alt="Baby sleeping peacefully"
                                className="login-modal-image"
                            />
                        </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="col-md-6 login-modal-form-col">

                        <form className="login-form" onSubmit={handleLoginSubmit}>
                            {/* Email Input */}
                            <div className="form-group-custom">
                                <label htmlFor="loginEmail" className="login-form-label">Email</label>
                                <input
                                    type="email"
                                    id="loginEmail"
                                    placeholder="Email"
                                    // Dynamic class
                                    className={getLoginInputClass('email')}
                                    value={loginFormData.email}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="form-group-custom">
                                <label htmlFor="loginPassword" className="login-form-label">Password</label>
                                <div className="login-password-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="loginPassword"
                                        placeholder="Password"
                                        // Dynamic class
                                        className={getLoginInputClass('password')}
                                        value={loginFormData.password}
                                        onChange={handleLoginChange}
                                        required
                                    />
                                    <span
                                        className="login-password-toggle-icon"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>

                            {/* Global Error Message for Login */}
                            {loginError && (
                                <p className="login-error-message login-global-error">{loginError}</p>
                            )}

                            {/* Forget Password Link */}
                            <p className="login-forget-password-text">
                                <a href="#" className="login-forget-password-link">Forget password?</a>
                            </p>

                            {/* Main Login Button */}
                            <button type="submit" className="login-submit-btn">
                                Log In
                            </button>
                        </form>

                        {/* Don't have an account? Register link */}
                        <p className="login-toggle-text">
                            Don't have an account?
                            <a href="#" className="login-toggle-link" onClick={handleRegisterClick}>
                                Register
                            </a>
                        </p>

                        {/* Divider */}
                        <div className="login-divider-or">
                            <span>Or</span>
                        </div>

                        {/* Social Login Buttons */}
                        <div className="login-social-section">
                            <button className="login-social-btn login-google-btn">
                                Continue with Google <FcGoogle className="login-social-icon" />
                            </button>
                            <button className="login-social-btn login-facebook-btn">
                                Continue with Facebook <FaFacebookF className="login-social-icon login-facebook-icon" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
