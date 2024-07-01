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
import EmailSVG from "../../utils/svgs/Login/EmailSVG";
import PasswordSVG from "../../utils/svgs/Login/PasswordSVG";
import NameSVG from "../../utils/svgs/Login/NameSVG";
import { clearFav } from "../../lib/redux/reducers/favReducer";

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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearFav())
    }, [dispatch]);

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
                window.location.replace('/dashboard');
            }, 2500);
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
                    {isMobile ? (
                        <div className="mobile-content">
                            <img src="/Mobile_logo.png" alt="Login illustration" />
                        </div>
                    ) : (
                        <img src="/Login_face.png" alt="Login illustration" />
                    )}
                </div>
                <div className="right-pane">
                    <div className="header">
                        {currentStep === 1 ? (
                            <>
                                <h1 className="header-title">Welcome Back!</h1>
                                <h1 className="header-subtitle">
                                    <span>Don’t have an account? </span>
                                    <span className="register" onClick={handleRegister}>Register</span>
                                </h1>
                            </>
                        ) : (
                            <>
                                <h1 className="header-title">Create an account</h1>
                                <h1 className="header-subtitle">
                                    <span>Already have an account? </span>
                                    <span className="register" onClick={handleLogin}>Login</span>
                                </h1>
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
                                    <EmailSVG />
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
                                    <PasswordSVG />
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
                                    <NameSVG />
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
                                    <EmailSVG />
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
