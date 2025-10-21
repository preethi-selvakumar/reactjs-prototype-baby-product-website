import React, { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import registerImage from '../assets/images/mother-and-baby-hero.jpg';

const RegisterModal = () => {
    // using useNavigate hook (for redirecting to home page)
    const navigate = useNavigate();

    // taking registerAndLoginUser from context
    const {
        isRegisterModalOpen,
        closeRegisterModal,
        openLoginModal,
        registerAndLoginUser
    } = useAppContext();

    const [showPassword, setShowPassword] = useState(false);

    // form state and error state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [formErrors, setFormErrors] = useState({});

    if (!isRegisterModalOpen) {
        return null;
    }

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const handleLoginClick = (e) => {
        e.preventDefault();
        closeRegisterModal(); // close the register modal
        openLoginModal();     // open the login modal
    };

    // input change handler
    const handleChange = (e) => {
        const { id, value } = e.target;
        const fieldName = id.replace('register', '').toLowerCase();

        setFormData(prev => ({
            ...prev,
            [fieldName]: value,
        }));
        // while typing, clear the error for that field
        setFormErrors(prev => ({
            ...prev,
            [fieldName]: '',
        }));
    };

    // validation logic (initial validation before api/context check)
    const validateForm = () => {
        let errors = {};
        let isValid = true;
        const { name, email, password } = formData;

        // name validation: required, minimum 3 characters
        if (!name.trim()) {
            errors.name = 'Name is required.';
            isValid = false;
        } else if (name.trim().length < 3) {
            errors.name = 'Name must be at least 3 characters.';
            isValid = false;
        }

        // email validation: required, valid format
        if (!email.trim()) {
            errors.email = 'Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email address is invalid.';
            isValid = false;
        }

        // password validation: required, min 8 chars, 1 uppercase, 1 lowercase, 1 number
        if (!password) {
            errors.password = 'Password is required.';
            isValid = false;
        } else if (password.length < 8) {
            errors.password = 'Password must be at least 8 characters.';
            isValid = false;
        } else if (!/(?=.*[a-z])/.test(password)) {
            errors.password = 'Must contain at least one lowercase letter.';
            isValid = false;
        } else if (!/(?=.*[A-Z])/.test(password)) {
            errors.password = 'Must contain at least one uppercase letter.';
            isValid = false;
        } else if (!/(?=.*\d)/.test(password)) {
            errors.password = 'Must contain at least one number.';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    // handle register submit logic with context result check
    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        // client-side validation
        if (validateForm()) {

            // context (server-side simulation) validation - email check
            const result = registerAndLoginUser(formData.email, formData.password);

            if (result.success) {
                // success logic
                console.log("Registration successful! Form Data:", formData);

                // alert user
                alert("Registration Successful! Welcome to BabyZone.");

                // close modal and navigate
                closeRegisterModal();
                navigate('/');
            } else {
                // registration failed (email already exists)
                console.error("Registration failed:", result.message);

                // alert user with the specific error message
                alert(`Registration Failed: ${result.message}`);

                // set error message to the email field
                setFormErrors(prev => ({ ...prev, email: result.message }));

                // optionally clear password field for security
                setFormData(prev => ({ ...prev, password: '' }));
            }
        } else {
            console.log("Form validation failed. Showing errors.");
        }
    };

    // helper function to check for error class and apply 'input-error'
    const getInputClass = (fieldName) => {
        const baseClass = "login-form-input";
        return formErrors[fieldName] ? `${baseClass} input-error` : baseClass;
    };

    return (
        // we are using the same login modal class names here in the register modal so that the same styling applied there will also be applied here.
        <div className="login-modal-overlay">
            <div className="login-modal-container">

                <button className="login-modal-close-btn" onClick={closeRegisterModal} aria-label="Close register modal">
                    <FaTimes />
                </button>

                <div className="row login-modal-content-row">

                    <h2 className="login-modal-title">Register</h2>

                    {/* left column - image */}
                    <div className="col-md-6 d-none d-md-flex">
                        <div className="login-modal-image-col">
                            <img
                                src={registerImage}
                                alt="Mom playing with baby"
                                className="login-modal-image"
                            />
                        </div>
                    </div>

                    {/* right column - form */}
                    <div className="col-md-6 login-modal-form-col">

                        <form className="login-form" onSubmit={handleRegisterSubmit}>

                            {/* name input with validation and error class */}
                            <div className="form-group-custom">
                                <label htmlFor="registerName" className="login-form-label">Name</label>
                                <input
                                    type="text"
                                    id="registerName"
                                    placeholder="Your name"
                                    className={getInputClass('name')}
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                {formErrors.name && (
                                    <p className="login-error-message">{formErrors.name}</p>
                                )}
                            </div>

                            {/* email input with validation and error class */}
                            <div className="form-group-custom">
                                <label htmlFor="registerEmail" className="login-form-label">Email</label>
                                <input
                                    type="email"
                                    id="registerEmail"
                                    placeholder="Email"
                                    className={getInputClass('email')}
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {/* this is where the 'this email is already registered' message appears */}
                                {formErrors.email && (
                                    <p className="login-error-message">{formErrors.email}</p>
                                )}
                            </div>

                            {/* password input with validation and error class */}
                            <div className="form-group-custom">
                                <label htmlFor="registerPassword" className="login-form-label">Password</label>
                                <div className="login-password-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="registerPassword"
                                        placeholder="Password"
                                        className={getInputClass('password')}
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span
                                        className="login-password-toggle-icon"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {formErrors.password && (
                                    <p className="login-error-message">{formErrors.password}</p>
                                )}
                            </div>

                            {/* main register button */}
                            <button type="submit" className="login-submit-btn">
                                Register
                            </button>
                        </form>

                        {/* already have an account? log in link */}
                        <p className="login-toggle-text">
                            Already have an account?
                            <a href="#" className="login-toggle-link" onClick={handleLoginClick}>
                                Log In
                            </a>
                        </p>

                        {/* divider */}
                        <div className="login-divider-or">
                            <span>Or</span>
                        </div>

                        {/* social login buttons */}
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

export default RegisterModal;
