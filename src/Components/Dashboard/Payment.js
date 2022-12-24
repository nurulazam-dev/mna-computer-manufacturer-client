import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Loading from "../Shared/Loading";
import PurchaseDetail from "./PurchaseDetail";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_APIKEY);

const Payment = () => {
    const { payForId } = useParams();

    const { data: payForProduct, isLoading } = useQuery(["payForProduct", payForId], () =>
        fetch(`https://mna-computer-manufacturer.onrender.com/order/${payForId}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => res.json())
    );
    console.log(payForProduct);
    if (isLoading) {
        return <Loading />;
    }

    return (
        <section>
            <h2 className="text-3xl font-semibold text-primary my-4">Complete Payment</h2>
            <div className="order-details">
                <PurchaseDetail
                    key={payForProduct._id}
                    payForProduct={payForProduct}
                ></PurchaseDetail>
            </div>
            <div className="payment-stripe py-12">
                <div className="card max-w-sm bg-base-100 shadow-xl">
                    <div className="card-body">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm payForProduct={payForProduct} />
                        </Elements>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
