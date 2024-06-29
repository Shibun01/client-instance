import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation, useLogoutMutation } from "../../lib/redux/features/users/loginApiSlice";
import { loginSuccess, loginFailure, logout } from "../../lib/redux/reducers/authReducer";
import './index.css';

const Login = () => {
    const [login, { isLoading }] = useLoginMutation();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await login({ email, password }).unwrap();
            dispatch(loginSuccess({
                token: result.data.token,
                user: result.data.user,
            }));
        } catch (error) {
            console.error('Login failed', error);
            dispatch(loginFailure({
                error: error.message,
            }));
        }
    };
    
    return (
        <div className="main-container">
            <div className="container">
                <div className="left-pane">
                    <img src="/Login_face.png" alt="" />
                </div>
                <div className="right-pane">
                    <div className="header">
                        <p className="header-title">Welcome Back!</p>
                        <p className="header-subtitle">
                            <span>Don’t have an account? </span>
                            <span className="register">Register</span>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="input-group">
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
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                className="input-field-inner"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {/* <div className="forgot-password">Forgot Password</div> */}
                        <div className="button-group">
                            <button type="submit" className="login-button">
                                {isLoading ? "Signing in..." : "Sign in"}
                            </button>
                            <p className="or-text"></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
