import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FavouriteSVG = () => {
    const favItems = useSelector(state => state.fav.items);
    const favCount = favItems.length;

    const [animatedCount, setAnimatedCount] = useState(0);

    useEffect(() => {
        setAnimatedCount(favCount);
    }, [favCount]);

    const countVariants = {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0.5, opacity: 0 }
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.625 21L11.175 19.7C9.49167 18.1833 8.1 16.875 7 15.775C5.9 14.675 5.025 13.6917 4.375 12.825C3.725 11.9417 3.26667 11.1333 3 10.4C2.75 9.66666 2.625 8.91666 2.625 8.14999C2.625 6.58333 3.15 5.27499 4.2 4.22499C5.25 3.17499 6.55833 2.64999 8.125 2.64999C8.99167 2.64999 9.81667 2.83333 10.6 3.19999C11.3833 3.56666 12.0583 4.08333 12.625 4.74999C13.1917 4.08333 13.8667 3.56666 14.65 3.19999C15.4333 2.83333 16.2583 2.64999 17.125 2.64999C18.6917 2.64999 20 3.17499 21.05 4.22499C22.1 5.27499 22.625 6.58333 22.625 8.14999C22.625 8.91666 22.4917 9.66666 22.225 10.4C21.975 11.1333 21.525 11.9417 20.875 12.825C20.225 13.6917 19.35 14.675 18.25 15.775C17.15 16.875 15.7583 18.1833 14.075 19.7L12.625 21ZM12.625 18.3C14.225 16.8667 15.5417 15.6417 16.575 14.625C17.6083 13.5917 18.425 12.7 19.025 11.95C19.625 11.1833 20.0417 10.5083 20.275 9.92499C20.5083 9.325 20.625 8.73333 20.625 8.14999C20.625 7.14999 20.2917 6.31666 19.625 5.65C18.9583 4.98333 18.125 4.64999 17.125 4.64999C16.3417 4.64999 15.6167 4.87499 14.95 5.32499C14.2833 5.75833 13.825 6.31666 13.575 6.99999H11.675C11.425 6.31666 10.9667 5.75833 10.3 5.32499C9.63333 4.87499 8.90833 4.64999 8.125 4.64999C7.125 4.64999 6.29167 4.98333 5.625 5.65C4.95833 6.31666 4.625 7.14999 4.625 8.14999C4.625 8.73333 4.74167 9.325 4.975 9.92499C5.20833 10.5083 5.625 11.1833 6.225 11.95C6.825 12.7 7.64167 13.5917 8.675 14.625C9.70833 15.6417 11.025 16.8667 12.625 18.3Z" fill="white" />
            </svg>
            <AnimatePresence>
                {animatedCount > 0 && (
                    <motion.div
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={countVariants}
                        key={animatedCount}
                        style={{
                            position: "absolute",
                            top: "-5px",
                            right: "-5px",
                            backgroundColor: "#bb0a1e",
                            borderRadius: "50%",
                            width: "15px",
                            height: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "12px",
                            fontWeight: 600,
                        }}
                    >
                        {animatedCount}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FavouriteSVG;
