import React from "react";
import './cart-dropdown.styles.scss';
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { connect } from 'react-redux';

const CartDropdown = ({cartItems}) => {
    return (
        <div className="cart-dropdown">
            <div className="cart-itmes">
                {cartItems.map(item => (
                    <CartItem item={item} key={item.id}/>
                ))}
            </div>
            <CustomButton
            >
                GO TO CHECKOUT
            </CustomButton>
        </div>
    );
};

const mapStateToProps = ({ cart: { cartItems } }) => ({
    cartItems
});

export default connect(mapStateToProps)(CartDropdown);