import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";

const CheckoutForm = ({ payForProduct }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);

  const { _id, shouldPay, customerName, customer } = payForProduct || "";

  useEffect(() => {
    fetch(`${BASE_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ shouldPay }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [shouldPay]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);

    // confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: customerName,
            email: customer,
          },
        },
      });

    if (intentError?.message) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError("");
      setSuccess("Congratulations! Your payment has been successful");
      setTransactionId(paymentIntent.id);
    }

    // store payment on database
    const payment = {
      order: _id,
      transactionId: paymentIntent.id,
      customer: customer,
      customerName: customerName,
    };

    fetch(`${BASE_URL}/orders/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(payment),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Transaction successful");
        setProcessing(false);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !clientSecret || success}
          className="btn btn-primary btn-sm rounded-full w-1/2 mx-auto block text-white mt-4"
        >
          Pay
        </button>
      </form>
      {processing && (
        <div className="text-center flex justify-center mt-2">
          <div className="w-12 h-12 border-t-4 border-b-4 border-accent rounded-full animate-spin"></div>
        </div>
      )}
      {cardError && (
        <div>
          <p className="text-red-600">{cardError}</p>
        </div>
      )}
      {success && (
        <div>
          <p className="text-success">{success}</p>
          <p>
            TransactionId :{" "}
            <span className="font-semibold text-primary">{transactionId}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckoutForm;
