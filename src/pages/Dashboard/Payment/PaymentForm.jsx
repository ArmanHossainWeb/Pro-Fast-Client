import {  CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const PaymentForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = e => {
      e.preventDefault()

        if (!stripe || !elements) {
            return;
        }
        
        const card = elements.getElement(CardElement)


        if(!card){
            return;
        }

        

    }

    return (
        <div>
            <form onSubmit={handleSubmit} >\
                <CardElement>
                    <Button type="submit" disabled={!stripe} >
                        Pay For Parcel Pickup
                    </Button>
                </CardElement>
            </form>
        </div>
    );
};

export default PaymentForm;