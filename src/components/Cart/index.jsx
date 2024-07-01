import React, { useEffect, useState } from "react";
import './index.css';
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../lib/redux/reducers/cartReducer";
import { addToFav, removeFromFav } from "../../lib/redux/reducers/favReducer";
import TickSVG from "../../utils/svgs/Shops/Products/CartAddedSVG";
import AddPlusSVG from "../../utils/svgs/Shops/Products/AddPlusSVG";
import AddedFavoriteSVG from "../../utils/svgs/Shops/Products/AddedFavoriteSVG";
import FavoriteAddSVG from "../../utils/svgs/Shops/Products/FavoriteSVG";
import CartPlusSVG from "../../utils/svgs/Cart/CartPlusSVG";
import CartMinusSVG from "../../utils/svgs/Cart/CartMinusSVG";
import CartDeleteSVG from "../../utils/svgs/Cart/CartDeleteSVG";

const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 }
};

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.5 };

const AddToCart = () => {
    const dispatch = useDispatch();
    const favItems = useSelector(state => state.fav.items);
    const cartItems = useSelector(state => state.cart.items);

    const [subtotal, setSubtotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(5); 
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const subTotal = cartItems.reduce((acc, item) => acc + item.price, 0);
        setSubtotal(subTotal);

        const totalAmount = subTotal + deliveryFee;
        setTotal(totalAmount);
    }, [cartItems, deliveryFee]);

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
        <div className="container">
            <div className="Cart-product-main-container">
                <div className="Cart_product_container">
                    <AnimatePresence initial={false} custom={null}>
                        {cartItems?.map((product) => {
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
                                    className="Cart_card"
                                >
                                    <div
                                        className="Cart_card_image"
                                        style={{ backgroundImage: `url(${product.image_url})` }}
                                    />
                                    <div className="Shop_card_content">
                                        <div className="Shop_card_top_content">
                                            <h1 className="Shop_card_title">{product.name}</h1>
                                            <CartMinusSVG /> <CartPlusSVG />
                                        </div>
                                        <h1 className="Shop_card_price">${product.price}</h1>
                                    </div>
                                    <div className="Cart_card_add">
                                        <motion.div
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => isInCart ? handleRemoveFromCart(product) : handleAddToCart(product)}
                                        >
                                            <CartDeleteSVG/>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
            <div className="hello-container">
                <div>Sub Total: ${subtotal.toFixed(2)}</div>
                <div>Delivery Fee: ${deliveryFee.toFixed(2)}</div>
                <div>Total: ${total.toFixed(2)}</div>
            </div>
        </div>
    );
}

export default AddToCart;
