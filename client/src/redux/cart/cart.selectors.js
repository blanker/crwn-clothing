import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    ({cartItems}) => cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    ({ hidden }) => hidden
)

export const selectCartCount = createSelector(
    [selectCart],
    ({cartItems}) => cartItems.reduce((acc, item) => acc + item.quantity, 0 )
);

export const selectCartTotal = createSelector(
    [selectCart],
    ({cartItems}) => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
)