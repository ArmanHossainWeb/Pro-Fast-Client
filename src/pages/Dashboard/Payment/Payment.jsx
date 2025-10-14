import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const Payment = () => {
    const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
    return (
        <div>
            <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
            </Elements>
        </div>
    );
};

export default Payment;