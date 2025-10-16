import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../hooks/useAuth";

const PaymentForm = () => {
  const { user } = UseAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(" ");
  const { parcelId } = useParams();
  const axiosSecure = UseAxiosSecure();
  console.log(parcelId);

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isPending) {
    return "...loeading";
  }
  console.log(parcelInfo);
  const ammount = parcelInfo.cost;
  const ammountInCents = ammount * 100;
  console.log(ammountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(" ");
      console.log("payment Method", paymentMethod);
    }

    // create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      ammountInCents,
      parcelId,
    });
    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.displayName,
          email: user.email,
        },
      },
    });
    if (result.error) {
      setError(result.error.message)
    } else {
      setError(' ')
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment Succeeded");
        console.log(result);
        
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded"></CardElement>
        <button
          type="submit"
          disabled={!stripe}
          className=" px-4 py-2 rounded bg-primary text-black hover:bg-secondary hover:text-white transition"
        >
          Pay ${ammount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
