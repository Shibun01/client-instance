import React from "react";
import CartSVG from "../../../../utils/svgs/CartSVG";
import MenuBarSVG from "../../../../utils/svgs/MenuBarSVG";
import './index.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import BackSVG from "../../../../utils/svgs/Common/BackSVG";

const DesktopHeader = () => {
    const cartItems = useSelector(state => state.cart.items);
    const cartCount = cartItems.length;
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); 
    }

    const isDesktop = useMediaQuery({ minWidth: 768 });

    return (
        <div className={`Desktop-header-container ${!isDesktop ? 'Desktop-header-mobile-container' : ''}`}>
            <div className="header-logo-container" onClick={handleBackClick}>
                {isDesktop ? (
                     <img src="/Header_logo.png" alt="Header Logo" />
                ) : (<BackSVG />)}
            </div>
            <div className="header-mix-container">
                <div className="header-mix-cart-section">
                    <CartSVG count={cartCount} />
                </div>
                {isDesktop && (
                    <div className="header-mix-menu-section">
                        <MenuBarSVG />
                    </div>
                )}
            </div>
        </div>
    );
}

export default DesktopHeader;
