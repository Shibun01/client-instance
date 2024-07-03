import React, { useEffect, useState } from "react";
import './index.css';
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, deleteFromCart } from "../../lib/redux/reducers/cartReducer";
import CartPlusSVG from "../../utils/svgs/Cart/CartPlusSVG";
import CartMinusSVG from "../../utils/svgs/Cart/CartMinusSVG";
import CartDeleteSVG from "../../utils/svgs/Cart/CartDeleteSVG";
import SadSVG from "../../utils/svgs/Common/SadSVG";

const pageVariants = {
    initial: { opacity: 0, x: -100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 100 }
};

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.4 };

const AddToCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);

    const [subtotal, setSubtotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setSubtotal(subTotal);

        const totalAmount = subTotal + deliveryFee;
        setTotal(totalAmount);
    }, [cartItems, deliveryFee]);

    const handleAddToCart = (product) => {
        console.log('calling')
        dispatch(addToCart(product));
    };

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleDeleteFromCart = (product) => {
        dispatch(deleteFromCart(product));
    };

    return (
        <>
            {cartItems.length ? (
                <div className="Cart-section">
                    <div className="Cart-heading-container">
                        <div className="Cart-title-container">
                            <h1>Cart</h1>
                        </div>
                        <div className="Cart-subtitle-container">
                            <h1>
                                Indulge in a curated selection of gourmet foods and refreshing beverages, each chosen to enhance your daily rituals. From artisanal coffee to delectable treats, your culinary delights are just a click away.
                            </h1>
                        </div>
                    </div>
                    <div className="Cart-container">
                        <div className="Cart-product-main-container">
                            <div className="Cart_product_container">
                                <AnimatePresence initial={false} custom={null}>
                                    {cartItems?.map((product) => {
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
                                                <div className="Cart_card_content">
                                                    <h1 className="Shop_card_title">{product.name}</h1>
                                                    <div className="Cart_card_top_content">
                                                        <span onClick={() => handleRemoveFromCart(product)} ><CartMinusSVG />  </span>
                                                        <span className="Cart_card_quantity">{product.quantity}</span>
                                                        <span onClick={() => handleAddToCart(product)} ><CartPlusSVG /></span>
                                                    </div>
                                                    <h1 className="Shop_card_price">${(product.price * product.quantity).toFixed(2)}</h1>
                                                </div>
                                                <div className="Cart_card_add">
                                                    <motion.div
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleDeleteFromCart(product)}
                                                    >
                                                        <CartDeleteSVG />
                                                    </motion.div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="Cart-billing-container">
                            <div className="Cart-billing-column">
                                <div className="Cart-sub-total">Sub Total:</div>
                                <div className="Cart-delivery-fees">Delivery Fee:</div>
                                <div className="Cart-total-fee">Total:</div>
                            </div>
                            <div className="Cart-prices-column">
                                <div className="Cart-price">${subtotal.toFixed(2)}</div>
                                <div className="Cart-price">${deliveryFee.toFixed(2)}</div>
                                <div className="Cart-price">${total.toFixed(2)}</div>

                                <div className="Cart-checkout-button">
                                    <button>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="Favorite-container-nodata">
                    <AnimatePresence mode="wait">
                        <motion.div>
                            <div className="Favorite-container-nodata-text">No Cart Added</div>
                        </motion.div>
                        <motion.div>
                            <div className="Favorite-container-nodata-icon"><SadSVG /></div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}
        </>
    );
}

export default AddToCart;
