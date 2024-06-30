import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CartSVG.css"; // Import your CSS file for styling

const CartSVG = ({ count }) => {
    const [animatedCount, setAnimatedCount] = useState(0);

    useEffect(() => {
        setAnimatedCount(count);
    }, [count]);

    const countVariants = {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.5, opacity: 0 }
    };

    return (
        <svg width="60" height="46" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="56" height="56" rx="28" fill="#808080" />
            <path d="M23 38C22.45 38 21.9792 37.8042 21.5875 37.4125C21.1958 37.0208 21 36.55 21 36C21 35.45 21.1958 34.9792 21.5875 34.5875C21.9792 34.1958 22.45 34 23 34C23.55 34 24.0208 34.1958 24.4125 34.5875C24.8042 34.9792 25 35.45 25 36C25 36.55 24.8042 37.0208 24.4125 37.4125C24.0208 37.8042 23.55 38 23 38ZM33 38C32.45 38 31.9792 37.8042 31.5875 37.4125C31.1958 37.0208 31 36.55 31 36C31 35.45 31.1958 34.9792 31.5875 34.5875C31.9792 34.1958 32.45 34 33 34C33.55 34 34.0208 34.1958 34.4125 34.5875C34.8042 34.9792 35 35.45 35 36C35 36.55 34.8042 37.0208 34.4125 37.4125C34.0208 37.8042 33.55 38 33 38ZM22.15 22L24.55 27H31.55L34.3 22H22.15ZM21.2 20H35.95C36.3333 20 36.625 20.1708 36.825 20.5125C37.025 20.8542 37.0333 21.2 36.85 21.55L33.3 27.95C33.1167 28.2833 32.8708 28.5417 32.5625 28.725C32.2542 28.9083 31.9167 29 31.55 29H24.1L23 31H35V33H23C22.25 33 21.6833 32.6708 21.3 32.0125C20.9167 31.3542 20.9 30.7 21.25 30.05L22.6 27.6L19 20H17V18H20.25L21.2 20Z" fill="white" />
            <AnimatePresence>
                {animatedCount > 0 && (
                    <motion.g
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={countVariants}
                        key={animatedCount} // Ensures the animation happens on count change
                    >
                        <rect x="38" y="0" width="25" height="20" rx="5" fill="#bb0a1e" />
                        <text x="50" y="15" fontSize="16" fontWeight={600} textAnchor="middle" fill="white">
                            {animatedCount}
                        </text>
                    </motion.g>
                )}
            </AnimatePresence>
        </svg>
    );
}

export default CartSVG;
