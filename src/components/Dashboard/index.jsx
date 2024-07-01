import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DesktopHeader from "../Common/Header/Desktop";
import './index.css';
import { useGetAllShopsQuery } from "../../lib/redux/features/dashboard/shopsApiSlice";
import SearchIconSVG from "../../utils/svgs/Dashboard/SearchIconSVG";
import FilterIconSVG from "../../utils/svgs/Dashboard/FilterIconSVG";
import LocationIconSVG from "../../utils/svgs/Dashboard/LocationIconSVG";
import StarSVG from "../../utils/svgs/Common/StarSVG";
import MapSVG from "../../utils/svgs/MapSVG";
import ExploreSVG from "../../utils/svgs/Common/ExploreSVG";
import { useMediaQuery } from "react-responsive";

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data: ShopData, error, isLoading } = useGetAllShopsQuery();
    const navigate = useNavigate();
    const isDesktop = useMediaQuery({ minWidth: 768 });


    const handleCardClick = (shopId) => {
        navigate(`/shop?id=${shopId}`);
    };

    const handleMapClick = () => {
        navigate('/map', { state: { shops: ShopData?.data || [] } });
    };

    return (
        <>
            <div className="Dashboard_Container">
                <div className="Dashboard_Body_container">
                    <div className="Dashboard_Search_container">
                        <div className="Dashboard_Search_inner_container">
                            <div className={`Dashboard_Search_input_container ${!isDesktop ? 'Desktop_Search_mobile_container': ''}`}>
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
                                <div className="Dashboard_Filter_container">
                                <FilterIconSVG />
                                </div>
                                <div onClick={handleMapClick} className="Dashboard_Explore_container">
                                <ExploreSVG />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="Dashboard_Shops_container">
                        <div className="Dashboard_Shops_grid">
                            {ShopData?.data?.map((shop) => (
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
        </>
    );
}

export default Dashboard;
