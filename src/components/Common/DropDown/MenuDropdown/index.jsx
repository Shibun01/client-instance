import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import ProfileSVG from '../../../../utils/svgs/Common/ProfileSVG';
import FavouriteSVG from '../../../../utils/svgs/Common/FavoriteSVG';
import LogoutSVG from '../../../../utils/svgs/Common/LogoutSVG';
import { Navigate, useNavigate } from 'react-router-dom';
import HeaderFavoriteSVG from '../../../../utils/svgs/Dashboard/HeaderFavorite';

const MenuDropdown = ({ isOpen, closeMenu }) => {
    const navigate = useNavigate();

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeMenu]);


    const handleNavigation = (path) => {
        closeMenu();
        navigate(path);
    };

    const logout = (path) => {
        window.location.replace(path);
    }

    return (
        <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
            transition={{ duration: 0.3 }}
            className="menu-dropdown"
        >
            <ul>
                <li onClick={() => handleNavigation('/profile')}>
                    <span className="icon">
                        <svg
                            width="25"
                            height="24"
                            viewBox="0 0 25 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <path
                                d="M12.125 12C11.025 12 10.0833 11.6083 9.3 10.825C8.51667 10.0417 8.125 9.1 8.125 8C8.125 6.9 8.51667 5.95833 9.3 5.175C10.0833 4.39167 11.025 4 12.125 4C13.225 4 14.1667 4.39167 14.95 5.175C15.7333 5.95833 16.125 6.9 16.125 8C16.125 9.1 15.7333 10.0417 14.95 10.825C14.1667 11.6083 13.225 12 12.125 12ZM4.125 20V17.2C4.125 16.6333 4.27083 16.1125 4.5625 15.6375C4.85417 15.1625 5.24167 14.8 5.725 14.55C6.75833 14.0333 7.80833 13.6458 8.875 13.3875C9.94167 13.1292 11.025 13 12.125 13C13.225 13 14.3083 13.1292 15.375 13.3875C16.4417 13.6458 17.4917 14.0333 18.525 14.55C19.0083 14.8 19.3958 15.1625 19.6875 15.6375C19.9792 16.1125 20.125 16.6333 20.125 17.2V20H4.125ZM6.125 18H18.125V17.2C18.125 17.0167 18.0792 16.85 17.9875 16.7C17.8958 16.55 17.775 16.4333 17.625 16.35C16.725 15.9 15.8167 15.5625 14.9 15.3375C13.9833 15.1125 13.0583 15 12.125 15C11.1917 15 10.2667 15.1125 9.35 15.3375C8.43333 15.5625 7.525 15.9 6.625 16.35C6.475 16.4333 6.35417 16.55 6.2625 16.7C6.17083 16.85 6.125 17.0167 6.125 17.2V18ZM12.125 10C12.675 10 13.1458 9.80417 13.5375 9.4125C13.9292 9.02083 14.125 8.55 14.125 8C14.125 7.45 13.9292 6.97917 13.5375 6.5875C13.1458 6.19583 12.675 6 12.125 6C11.575 6 11.1042 6.19583 10.7125 6.5875C10.3208 6.97917 10.125 7.45 10.125 8C10.125 8.55 10.3208 9.02083 10.7125 9.4125C11.1042 9.80417 11.575 10 12.125 10Z"
                                fill="#515151"
                            ></path>
                        </svg>
                    </span>
                    <span className="text">Profile</span>
                </li>
                <li onClick={() => handleNavigation('/favorite')}>
                    <span className="icon">
                        <HeaderFavoriteSVG />
                    </span>
                    <span className="text">Favorite</span>
                </li>
                <li onClick={() => logout('/login')}>
                    <span className="icon">
                        <LogoutSVG />
                    </span>
                    <span className="text">Logout</span>
                </li>
            </ul>
        </motion.div>
    );
};

export default MenuDropdown;
