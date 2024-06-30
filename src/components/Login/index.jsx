import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../lib/redux/features/users/loginApiSlice";
import { useRegisterMutation } from "../../lib/redux/features/users/registerApiSlice";
import { loginSuccess, loginFailure, logout } from "../../lib/redux/reducers/authReducer";
import { motion, AnimatePresence } from "framer-motion";
import Popup from "../Common/Popup/Popup";
import './index.css';
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../lib/redux/reducers/cartReducer";

const pageVariants = {
    initial: { opacity: 0, x: -100 }, 
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 } 
  };

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

const Login = () => {
    const [login, { isLoading: loginLoading }] = useLoginMutation();
    const [register, { isLoading: registerLoading }] = useRegisterMutation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [popupIconType, setPopupIconType] = useState("");
    const [currentStep, setCurrentStep] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
         dispatch(logout())
         dispatch(clearCart())
    }, [])

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const validatePassword = (password) => password.length >= 6;

    const showErrorPopup = (message) => {
        setPopupMessage(message);
        setPopupIconType("error");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    const showSuccessPopup = (message) => {
        setPopupMessage(message);
        setPopupIconType("success");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 6 characters long.");
            return;
        }
        try {
            await register({ name, email, password }).unwrap();
            showSuccessPopup("Registration successful!");
            setCurrentStep(1);
        } catch (error) {
            showErrorPopup("Registration failed: " + error.data.message);
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 6 characters long.");
            return;
        }
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(loginSuccess({
                token: result.data.token,
                user: result.data.user,
            }));
            showSuccessPopup("Login successful!");
            setTimeout(() => {
                navigate('/dashboard')
            }, 2500)
        } catch (error) {
            dispatch(loginFailure({ error: error.data.message }));
            showErrorPopup("Login failed: " + error.data.message);
        }
    };

    const handleRegister = () => setCurrentStep(2);
    const handleLogin = () => setCurrentStep(1);

    return (
        <div className="main-container">
            {showPopup && <Popup message={popupMessage} iconType={popupIconType} onClose={() => setShowPopup(false)} />}
            <div className="container">
                <div className="left-pane">
                    <img src="/Login_face.png" alt="Login illustration" />
                </div>
                <div className="right-pane">
                    <div className="header">
                        {currentStep === 1 ? (
                            <>
                                <p className="header-title">Welcome Back!</p>
                                <p className="header-subtitle">
                                    <span>Don’t have an account? </span>
                                    <span className="register" onClick={handleRegister}>Register</span>
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="header-title">Create an account</p>
                                <p className="header-subtitle">
                                    <span>Already have an account? </span>
                                    <span className="register" onClick={handleLogin}>Login</span>
                                </p>
                            </>
                        )}
                    </div>
                    <AnimatePresence mode="wait">
                        {currentStep === 1 ? (
                            <motion.form
                                key="login-form"
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                                className="input-group"
                                onSubmit={handleLoginSubmit}
                            >
                                <div className="input-field">
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        <path
                                            d="M4.66659 23.3333C4.02492 23.3333 3.47561 23.1048 3.01867 22.6479C2.56172 22.191 2.33325 21.6417 2.33325 21V6.99999C2.33325 6.35832 2.56172 5.80902 3.01867 5.35207C3.47561 4.89513 4.02492 4.66666 4.66659 4.66666H23.3333C23.9749 4.66666 24.5242 4.89513 24.9812 5.35207C25.4381 5.80902 25.6666 6.35832 25.6666 6.99999V21C25.6666 21.6417 25.4381 22.191 24.9812 22.6479C24.5242 23.1048 23.9749 23.3333 23.3333 23.3333H4.66659ZM13.9999 15.1667L4.66659 9.33332V21H23.3333V9.33332L13.9999 15.1667ZM13.9999 12.8333L23.3333 6.99999H4.66659L13.9999 12.8333ZM4.66659 9.33332V6.99999V21V9.33332Z"
                                            fill="#98A2B3"
                                        ></path>
                                    </svg>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="input-field-inner"
                                    />
                                    {emailError && <p className="error-text">{emailError}</p>}
                                </div>
                                <div className="input-field">
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        <path
                                            d="M7.00008 25.6667C6.35841 25.6667 5.80911 25.4382 5.35216 24.9813C4.89522 24.5243 4.66675 23.975 4.66675 23.3334V11.6667C4.66675 11.025 4.89522 10.4757 5.35216 10.0188C5.80911 9.56183 6.35841 9.33335 7.00008 9.33335H8.16675V7.00002C8.16675 5.38613 8.7355 3.9825 9.87299 2.78918C11.0105 1.59587 12.4184 1.00002 14.0967 1.00002C15.7751 1.00002 17.183 1.59587 18.3205 2.78918C19.458 3.9825 20.0267 5.38613 20.0267 7.00002V9.33335H21.1934C21.8351 9.33335 22.3844 9.56183 22.8413 10.0188C23.2983 10.4757 23.5267 11.025 23.5267 11.6667V23.3334C23.5267 23.975 23.2983 24.5243 22.8413 24.9813C22.3844 25.4382 21.8351 25.6667 21.1934 25.6667H7.00008ZM7.00008 23.3334H21.1934V11.6667H7.00008V23.3334ZM10.3834 9.33335H17.8101V7.00002C17.8101 5.80279 17.4097 4.76491 16.6089 3.88635C15.808 3.00778 14.7924 2.56851 13.5617 2.56851C12.3309 2.56851 11.3153 3.00778 10.5144 3.88635C9.71359 4.76491 9.31318 5.80279 9.31318 7.00002V9.33335H10.3834ZM7.00008 11.6667V23.3334V11.6667Z"
                                            fill="#98A2B3"
                                        ></path>
                                    </svg>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="input-field-inner"
                                    />
                                    {passwordError && <p className="error-text">{passwordError}</p>}
                                </div>
                                <div className="button-group">
                                    <button type="submit" className="login-button">
                                        {loginLoading ? "Logging in..." : "Log in"}
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="register-form"
                                initial="initial"
                                animate="in"
                                exit="out"
                                variants={pageVariants}
                                transition={pageTransition}
                                className="input-group"
                                onSubmit={handleRegisterSubmit}
                            >
                                <div className="input-field">
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        <path
                                            d="M4.66659 23.3333C4.02492 23.3333 3.47561 23.1048 3.01867 22.6479C2.56172 22.191 2.33325 21.6417 2.33325 21V6.99999C2.33325 6.35832 2.56172 5.80902 3.01867 5.35207C3.47561 4.89513 4.02492 4.66666 4.66659 4.66666H23.3333C23.9749 4.66666 24.5242 4.89513 24.9812 5.35207C25.4381 5.80902 25.6666 6.35832 25.6666 6.99999V21C25.6666 21.6417 25.4381 22.191 24.9812 22.6479C24.5242 23.1048 23.9749 23.3333 23.3333 23.3333H4.66659ZM13.9999 15.1667L4.66659 9.33332V21H23.3333V9.33332L13.9999 15.1667ZM13.9999 12.8333L23.3333 6.99999H4.66659L13.9999 12.8333ZM4.66659 9.33332V6.99999V21V9.33332Z"
                                            fill="#98A2B3"
                                        ></path>
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="input-field-inner"
                                    />
                                </div>
                                <div className="input-field">
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        <path
                                            d="M7.00008 25.6667C6.35841 25.6667 5.80911 25.4382 5.35216 24.9813C4.89522 24.5243 4.66675 23.975 4.66675 23.3334V11.6667C4.66675 11.025 4.89522 10.4757 5.35216 10.0188C5.80911 9.56183 6.35841 9.33335 7.00008 9.33335H8.16675V7.00002C8.16675 5.38613 8.7355 3.9825 9.87299 2.78918C11.0105 1.59587 12.4184 1.00002 14.0967 1.00002C15.7751 1.00002 17.183 1.59587 18.3205 2.78918C19.458 3.9825 20.0267 5.38613 20.0267 7.00002V9.33335H21.1934C21.8351 9.33335 22.3844 9.56183 22.8413 10.0188C23.2983 10.4757 23.5267 11.025 23.5267 11.6667V23.3334C23.5267 23.975 23.2983 24.5243 22.8413 24.9813C22.3844 25.4382 21.8351 25.6667 21.1934 25.6667H7.00008ZM7.00008 23.3334H21.1934V11.6667H7.00008V23.3334ZM10.3834 9.33335H17.8101V7.00002C17.8101 5.80279 17.4097 4.76491 16.6089 3.88635C15.808 3.00778 14.7924 2.56851 13.5617 2.56851C12.3309 2.56851 11.3153 3.00778 10.5144 3.88635C9.71359 4.76491 9.31318 5.80279 9.31318 7.00002V9.33335H10.3834ZM7.00008 11.6667V23.3334V11.6667Z"
                                            fill="#98A2B3"
                                        ></path>
                                    </svg>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="input-field-inner"
                                    />
                                    {emailError && <p className="error-text">{emailError}</p>}
                                </div>
                                <div className="input-field">
                                    <svg
                                        width="28"
                                        height="28"
                                        viewBox="0 0 28 28"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        preserveAspectRatio="xMidYMid meet"
                                    >
                                        <path
                                            d="M7.00008 25.6667C6.35841 25.6667 5.80911 25.4382 5.35216 24.9813C4.89522 24.5243 4.66675 23.975 4.66675 23.3334V11.6667C4.66675 11.025 4.89522 10.4757 5.35216 10.0188C5.80911 9.56183 6.35841 9.33335 7.00008 9.33335H8.16675V7.00002C8.16675 5.38613 8.7355 3.9825 9.87299 2.78918C11.0105 1.59587 12.4184 1.00002 14.0967 1.00002C15.7751 1.00002 17.183 1.59587 18.3205 2.78918C19.458 3.9825 20.0267 5.38613 20.0267 7.00002V9.33335H21.1934C21.8351 9.33335 22.3844 9.56183 22.8413 10.0188C23.2983 10.4757 23.5267 11.025 23.5267 11.6667V23.3334C23.5267 23.975 23.2983 24.5243 22.8413 24.9813C22.3844 25.4382 21.8351 25.6667 21.1934 25.6667H7.00008ZM7.00008 23.3334H21.1934V11.6667H7.00008V23.3334ZM10.3834 9.33335H17.8101V7.00002C17.8101 5.80279 17.4097 4.76491 16.6089 3.88635C15.808 3.00778 14.7924 2.56851 13.5617 2.56851C12.3309 2.56851 11.3153 3.00778 10.5144 3.88635C9.71359 4.76491 9.31318 5.80279 9.31318 7.00002V9.33335H10.3834ZM7.00008 11.6667V23.3334V11.6667Z"
                                            fill="#98A2B3"
                                        ></path>
                                    </svg>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="input-field-inner"
                                    />
                                    {passwordError && <p className="error-text">{passwordError}</p>}
                                </div>
                                <div className="button-group">
                                    <button type="submit" className="login-button">
                                        {registerLoading ? "Registering..." : "Register"}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Login;
