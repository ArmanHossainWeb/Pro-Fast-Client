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
      setError(result.error.message);
    } else {
      setError(" ");
      if (result.paymentIntent.status === "succeeded") {
        console.log("payment Succeeded");
        console.log(result);

        // mark parcel paid also create payment history 
        
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-white to-blue-100 px-4 py-10">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Complete Payment
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Pay securely for your parcel
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="p-4 border border-gray-300 rounded-xl bg-gray-50 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    fontFamily: "Inter, sans-serif",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#9e2146" },
                },
              }}
            />
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={!stripe}
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:opacity-90 transition-all duration-200"
          >
            Pay ${ammount}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Secure payment powered by
          <span className="font-semibold text-blue-600">Stripe</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
