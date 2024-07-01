import React from "react";
import CartSVG from "../../../../utils/svgs/CartSVG";
import MenuBarSVG from "../../../../utils/svgs/MenuBarSVG";
import './index.css';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeSVG from "../../../../utils/svgs/Common/HomeSVG";
import FavouriteSVG from "../../../../utils/svgs/Common/FavoriteSVG";
import ProfileSVG from "../../../../utils/svgs/Common/ProfileSVG";
import LogoutSVG from "../../../../utils/svgs/Common/LogoutSVG";

const MobileHeader = () => {
    const cartItems = useSelector(state => state.cart.items);
    const cartCount = cartItems.length;
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/dashboard');
    }


    return (
        <div className="mobile-header">
            <div className="menu-item" onClick={handleLogoClick}>
                <div className="menu-icon">
                    <HomeSVG />
                </div>
                <h1 className="menu-text">Home</h1>
            </div>
            <div className="menu-item">
                <div className="menu-icon">
                    <FavouriteSVG />
                </div>
                <h1 className="menu-text">Favourites</h1>
            </div>
            {/* <div className="menu-item">
            <div className="menu-icon">
                    <LogoutSVG />
                </div>
                <h1 className="menu-text">Log Out</h1>
            </div> */}
            <div className="menu-item">
                <div className="menu-icon">
                    <ProfileSVG />
                </div>
                <h1 className="menu-text">Profile</h1>
            </div>
        </div>
    );
}

export default MobileHeader;
