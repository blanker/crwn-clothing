import React from "react";
import './cart-dropdown.styles.scss';
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors.js';
import { useNavigate } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartDropdown = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length
                    ?
                    cartItems.map(item => (
                        <CartItem item={item} key={item.id}/>
                    ))
                    :
                    <span className="empty-message">Your cart is empty</span>
                }
            </div>
            <CustomButton onClick={() => {
                dispatch(toggleCartHidden());
                navigate('/checkout');
            }}
            >
                GO TO CHECKOUT
            </CustomButton>
        </div>
    );
};


export default CartDropdown;