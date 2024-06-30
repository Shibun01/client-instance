import React from "react";
import CartSVG from "../../../../utils/svgs/CartSVG";
import MenuBarSVG from "../../../../utils/svgs/MenuBarSVG";
import './index.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DesktopHeader = () => {
    const cartItems = useSelector(state => state.cart.items);
    const cartCount = cartItems.length;
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/dashboard');
    }

    return (
        <div className="Desktop-header-container">
            <div className="header-logo-container" onClick={handleLogoClick}>
                <img src="/Header_logo.png" alt="" />
            </div>
            <div className="header-mix-container">
                <div className="header-mix-cart-section">
                    <CartSVG count={cartCount} />
                </div>
                <div className="header-mix-menu-section">
                    <MenuBarSVG />
                </div>
            </div>
        </div>
    );
}

export default DesktopHeader;
