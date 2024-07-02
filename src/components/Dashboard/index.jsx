import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DesktopHeader from "../Common/Header/Desktop";
import './index.css';
import { useGetAllShopsQuery } from "../../lib/redux/features/dashboard/shopsApiSlice";
import SearchIconSVG from "../../utils/svgs/Dashboard/SearchIconSVG";
import ExploreSVG from "../../utils/svgs/Common/ExploreSVG";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import StarSVG from "../../utils/svgs/Common/StarSVG";
import CloseMenuSVG from "../../utils/svgs/CloseMenuSVG";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const { data: ShopData, error, isLoading } = useGetAllShopsQuery();
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({ minWidth: 768 });

    const handleCardClick = (shopId) => {
        navigate(`/shop?id=${shopId}`);
    };

    const handleMapClick = () => {
        navigate('/map', { state: { shops: ShopData?.data || [] } });
    };

    const handleCloseFilterModal = () => {
        setIsFilterModalOpen(false);
    };

    const filteredShops = ShopData?.data?.filter(shop =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.rating.toString().includes(searchQuery) ||
        shop.rating_number.toString().includes(searchQuery)
    );

    return (
        <>
            <div className="Dashboard_Container">
                <div className="Dashboard_Body_container">
                    <div className="Dashboard_Search_container">
                        <div className="Dashboard_Search_inner_container">
                            <div className={`Dashboard_Search_input_container ${!isDesktop ? 'Desktop_Search_mobile_container' : ''}`}>
                                <div className="Dashboard_Search_input">
                                    <SearchIconSVG />
                                    <input
                                        type="text"
                                        className="Dashboard_Search_text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div onClick={handleMapClick} className="Dashboard_Explore_container">
                                    <ExploreSVG />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="Dashboard_Shops_container">
                        <div className="Dashboard_Shops_grid">
                            {filteredShops?.map((shop) => (
                                <div
                                    key={shop._id}
                                    className="Dashboard_Shops_card"
                                    onClick={() => handleCardClick(shop._id)}
                                >
                                    <div className="shop-image">
                                        {shop?.images?.map((image, index) => (
                                            <div className="shop-image" key={index}>
                                                <img src={image} alt={`Shop Image ${index + 1}`} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="shop-details">
                                        <h1 className="shop-title">{shop.name}</h1>
                                        <h1 className="shop-subtitle">{shop.description}</h1>
                                        <div className="shop-rating">
                                            <StarSVG />
                                            <p className="rating-text">
                                                <span className="rating-value">{shop.rating}</span>
                                                <span className="rating-reviews"> ({shop.rating_number} reviews)</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isFilterModalOpen && (
                <motion.div
                    className="filter-modal"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                >
                    <div className="filter-modal-content">
                        <h2>Filter Options</h2>
                        {/* Add your filter options here */}
                        <span onClick={handleCloseFilterModal}><CloseMenuSVG /></span>
                    </div>
                </motion.div>
            )}
        </>
    );
}

export default Dashboard;
