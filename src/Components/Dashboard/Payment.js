import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import Loading from "../Shared/Loading";
import PurchaseDetail from "./PurchaseDetail";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51L0gmsA8JMkzEy5gARbixx2IqJphAPSG7j1WtedZf4nJeX6LDmsJiR8o39InC5xCl5BKw0D31X3EWzXqrHjGmn5X005rJGKBT9");

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
            <h2 className="text-3xl font-semibold text-primary my-4 text-center">Payment Details</h2>
            <div className="flex justify-around">
                <div className="order-details border ">
                    <PurchaseDetail
                        key={payForProduct._id}
                        payForProduct={payForProduct}
                    ></PurchaseDetail>
                </div>
                <div className="payment-stripe py-12 w-[320px]">
                    <p className="text-green-600 text-center mb-4">Give your info in Card and Pay</p>
                    <div className="card bg-base-100 border shadow-xl">
                        <div className="card-body">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm payForProduct={payForProduct} />
                            </Elements>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="text-red-600 text-center">Card Details</p>
                        <div className="text-sm px-5">
                            <p><strong>Card number: </strong>4242 4242 4242 4242</p>
                            <p><strong>MM / YY: </strong>12 / 25</p>
                            <p><strong>CVC: </strong>123</p>
                            <p><strong>ZIP: </strong>12456</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
