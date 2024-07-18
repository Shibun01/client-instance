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

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.4 };

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
    const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('reloaded')) {
            sessionStorage.setItem('reloaded', 'true');
            window.location.reload(true);
        }
    }, [])

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 480);
        console.log(window.innerWidth)
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
        // setTimeout(() => setShowPopup(false), 2000);
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
                                </div>
                                {emailError && <h1 className="error-text">{emailError}</h1>}
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
                                </div>
                                {passwordError && <h1 className="error-text">{passwordError}</h1>}
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
                                </div>
                                {emailError && <h1 className="error-text">{emailError}</h1>}
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
                                </div>
                                {passwordError && <h1 className="error-text">{passwordError}</h1>}
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
