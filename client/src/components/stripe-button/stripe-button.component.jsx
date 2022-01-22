import React from 'react'
import './stripe-button.styles.scss';
import StripeChecout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51KIPpHIs3prCTWapoJ48Ldb7N7FPgvFnJk9eewmpB8NyjvlDEyxLrTwjhpcpz31faASkPj2eC3BWP6xFXZk1TsLX00CVNNSqbv';
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'POST',
            data: {
                amount: priceForStripe,
                token,
            }
        }).then(response => {
            alert("Payment successful");
        }).catch(error => {
            console.log('Payment error: ' + JSON.parse(error));
            alert(
                'There was an issue with your payment. Please sure you use the provided credit card.'
            )
        });
    }

    return (
        <StripeChecout
            label='Pay Now'
            name='CWRN Clothing Ltd.'
            billingAddress
            shippingAddress
            alipay 
            bitcoin 
            image='https://svgshare.com/i/CUz.svg'
            descripiton={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
};

export default StripeCheckoutButton;