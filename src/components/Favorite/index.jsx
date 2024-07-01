import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TickSVG from "../../utils/svgs/Shops/Products/CartAddedSVG";
import AddPlusSVG from "../../utils/svgs/Shops/Products/AddPlusSVG";
import AddedFavoriteSVG from "../../utils/svgs/Shops/Products/AddedFavoriteSVG";
import FavoriteAddSVG from "../../utils/svgs/Shops/Products/FavoriteSVG";
import { addToCart, removeFromCart } from "../../lib/redux/reducers/cartReducer";
import { addToFav, removeFromFav } from "../../lib/redux/reducers/favReducer";
import './index.css';
import SadSVG from "../../utils/svgs/Common/SadSVG";

const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 }
};

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

const Favorites = () => {
    const dispatch = useDispatch();
    const favItems = useSelector(state => state.fav.items);
    const cartItems = useSelector(state => state.cart.items);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleAddToFav = (product) => {
        dispatch(addToFav(product));
    };

    const handleRemoveFromFav = (product) => {
        dispatch(removeFromFav(product));
    };

    return (
        <>
            {favItems.length ? (
                <div className="Favorite-container">
                    <div className="Favorite-text-container">
                        <div className="Favorite-title-container">
                            <h1>Favorite</h1>
                        </div>
                        <div className="Favorite-subtitle-container">
                            <h1>Your favorites reflect a personal gallery of excellence—each addition a mark of quality and desire. Tailored Treasures: Revel in the products you’ve favored, each one a story of innovation and craftsmanship. Personal Picks: Embrace the collection you’ve curated, where every item echoes your distinct style and preference.</h1>
                        </div>
                    </div>
                    <div className="Favorite-product-container">
                        <div className="Shop_product_container">
                            <AnimatePresence mode="wait">
                                {favItems?.map((product) => {
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
                                            <div className="Shop_card_add">
                                                <motion.div
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => isInCart ? handleRemoveFromCart(product) : handleAddToCart(product)}
                                                >
                                                    {isInCart ? <TickSVG /> : <AddPlusSVG />}
                                                </motion.div>
                                            </div>
                                            <div className="Shop_favorite_add">
                                                <motion.div
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => isInFav ? handleRemoveFromFav(product) : handleAddToFav(product)}
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
                </div>
            ) : (
                <>
                    <div className="Favorite-container-nodata">
                        <AnimatePresence mode="wait">
                            <motion.div>
                                <div className="Favorite-container-nodata-text">No Favorites Added</div>
                            </motion.div>
                            <motion.div>
                                <div className="Favorite-container-nodata-icon"><SadSVG /></div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </>
            )}
        </>
    );
};

export default Favorites;
