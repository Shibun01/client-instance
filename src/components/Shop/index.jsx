import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { useGetShopByIdQuery } from "../../lib/redux/features/dashboard/shopsApiSlice";
import { useGetProductByShopIdQuery } from "../../lib/redux/features/product/productApiSlice";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from "../../lib/redux/reducers/cartReducer";
import DesktopHeader from "../Common/Header/Desktop";
import './index.css';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryCoffeeSVG from "../../utils/svgs/Shops/Category/CategoryCoffeeSVG";
import CategoryDrinksSVG from "../../utils/svgs/Shops/Category/CategoryDrinksSVG";
import CategoryFoodSVG from "../../utils/svgs/Shops/Category/CategoryFoodSVG";
import StartSVG from "../../utils/svgs/Common/StarSVG";
import AddPlusSVG from "../../utils/svgs/Shops/Products/AddPlusSVG";
import TickSVG from "../../utils/svgs/Shops/Products/CartAddedSVG";
import FavoriteAddSVG from "../../utils/svgs/Shops/Products/FavoriteSVG";
import { addToFav, removeFromFav } from "../../lib/redux/reducers/favReducer";
import AddedFavoriteSVG from "../../utils/svgs/Shops/Products/AddedFavoriteSVG";
import LoadingSVG from "../../utils/svgs/Common/LoadingSVG";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 }
};

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.4 };

const Shop = () => {
    const [selectedCategory, setSelectedCategory] = useState('Coffee');
    const query = useQuery();
    const id = query.get('id');
    const { data: shop, error, isLoading } = useGetShopByIdQuery(id);
    const { data: productData, error: productError, isLoading: productLoading } = useGetProductByShopIdQuery(id);

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const favItems = useSelector(state => state.fav.items);


    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleAddToFav = (product) => {
        dispatch(addToFav(product))
    }

    const handleRemoveFromFav = (product) => {
        dispatch(removeFromFav(product))
    }

    const products = productData?.data.filter((item) => selectedCategory.toLowerCase() === item.category);

    return (
        <>
            {productLoading || isLoading ? (
                <div className="Favorite-container-nodata">
                    <AnimatePresence mode="wait">
                        <motion.div>
                            <div className="Favorite-container-nodata-icon"><LoadingSVG /></div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )
                :
                (

                    <div className="Shop_container">
                        <div className="Shop_detail_container">
                            <div className="Shop_image_section">
                                {shop?.data[0]?.images?.map((image, index) => (
                                    <div className="Shop_image" key={index}>
                                        <img src={image} alt={`Shop Image ${index + 1}`} />
                                    </div>
                                ))}
                            </div>

                            <div className="Shop_detail_content">
                                <span className="Shop_detail_title">{shop?.data[0]?.name}</span>
                                <span className="Shop_detail_subtitle">{shop?.data[0]?.description}</span>
                                <div className="Shop_detail_rating_container">
                                    <StartSVG />
                                    <span className="Shop_detail_rating_text">
                                        <span className="Shop_detail_rating_value">4.5</span>
                                        <span className="Shop_detail_rating_reviews"> (1200 reviews)</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="Shop_category_container">
                            <div className="Shop_category_inner_container">
                                <div
                                    className={`Category_icons ${selectedCategory === 'Coffee' ? 'selected' : ''}`}
                                    onClick={() => handleCategoryClick('Coffee')}
                                >
                                    <CategoryCoffeeSVG />
                                    <p>Coffee</p>
                                </div>
                                <div
                                    className={`Category_icons ${selectedCategory === 'Drinks' ? 'selected' : ''}`}
                                    onClick={() => handleCategoryClick('Drinks')}
                                >
                                    <CategoryDrinksSVG />
                                    <p>Drinks</p>
                                </div>
                                <div
                                    className={`Category_icons ${selectedCategory === 'Foods' ? 'selected' : ''}`}
                                    onClick={() => handleCategoryClick('Foods')}
                                >
                                    <CategoryFoodSVG />
                                    <p>Foods</p>
                                </div>
                            </div>
                        </div>
                        <div className="Shop_product_container">
                            <AnimatePresence mode="wait">
                                {products?.map((product) => {
                                    const isInCart = cartItems.some(item => item._id === product._id);
                                    const isInFav = favItems.some(item => item._id === product._id);
                                    return (
                                        <motion.div
                                            key={product._id}
                                            initial="initial"
                                            animate="in"
                                            exit="out"
                                            variants={pageVariants}
                                            transition={pageTransition}
                                            className="Shop_card"
                                        >
                                            <div
                                                className="Shop_card_image"
                                                style={{ backgroundImage: `url(${product.image_url})` }}
                                            />
                                            <div className="Shop_card_content">
                                                <div className="Shop_card_top_content">
                                                    <h1 className="Shop_card_title">{product.name}</h1>
                                                    <h1 className="Shop_card_description">{product.description}</h1>
                                                </div>
                                                <h1 className="Shop_card_price">${product.price}</h1>
                                            </div>
                                            <div className="Shop_card_add" onClick={() => isInCart ? handleRemoveFromCart(product) : handleAddToCart(product)}>
                                                <motion.div
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {isInCart ? <TickSVG /> : <AddPlusSVG />}
                                                </motion.div>
                                            </div>
                                            <div className="Shop_favorite_add" onClick={() => isInFav ? handleRemoveFromFav(product) : handleAddToFav(product)}>
                                                <motion.div
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    {isInFav ? <AddedFavoriteSVG /> : <FavoriteAddSVG />}
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                )}
        </>
    );
}

export default Shop;
