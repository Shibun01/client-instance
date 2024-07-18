import React, { useState } from "react";
import { motion } from "framer-motion";
import CartSVG from "../../../../utils/svgs/CartSVG";
import MenuBarSVG from "../../../../utils/svgs/MenuBarSVG";
import './index.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import BackSVG from "../../../../utils/svgs/Common/BackSVG";
import MenuDropdown from "../../DropDown/MenuDropdown";
import CloseMenuSVG from "../../../../utils/svgs/CloseMenuSVG";

const DesktopHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.items);
    const cartCount = cartItems.length;
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    const handleNavigate = () => {
        navigate('/dashboard')
    }

    const handleNavigateToCart = () => {
        navigate('/cart')
    }

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const isDesktop = useMediaQuery({ minWidth: 1024 });

    return (
        <div className={`Desktop-header-container ${!isDesktop ? 'Desktop-header-mobile-container' : ''}`}>
            <div className="header-logo-container" onClick={isDesktop ? handleNavigate : handleBackClick}>
                {isDesktop ? (
                    <img src="/Header_logo.png" alt="Header Logo" />
                ) : (<BackSVG />)}
            </div>
            <div className="header-mix-container">
                <div className="header-mix-cart-section" onClick={handleNavigateToCart}>
                    <CartSVG count={cartCount} />
                </div>
                {isDesktop && (
                    <div className="header-mix-menu-section" onClick={toggleMenu}>
                        <motion.div
                            key={isMenuOpen ? "close" : "menu"}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="header-menu-section">
                                {isMenuOpen ? <CloseMenuSVG /> : <MenuBarSVG />}
                            </div>
                        </motion.div>
                        {isMenuOpen && <MenuDropdown isOpen={isMenuOpen} closeMenu={closeMenu} />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DesktopHeader;
