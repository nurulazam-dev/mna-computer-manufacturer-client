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
    // console.log(payForProduct);
    if (isLoading) {
        return <Loading />;
    }

    return (
        <section>
            <h2 className="text-3xl font-semibold text-primary my-4 text-center">Payment Details</h2>
            <div className="flex justify-around">
                <div className="order-details">
                    <PurchaseDetail
                        key={payForProduct._id}
                        payForProduct={payForProduct}
                    ></PurchaseDetail>
                </div>
                <div className="payment-stripe pb-12 w-[320px]">
                    <h2 className="text-xl text-green-600 font-bold text-center mb-4">Give your info in Card for Pay</h2>
                    <div className="card bg-base-100 border shadow-xl">
                        <div className="card-body">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm payForProduct={payForProduct} />
                            </Elements>
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="text-red-600 text-center border-2">Pay Card Details Demo</p>
                        <div className="text-sm px-5">
                            <table className="table">
                                <tbody>
                                    <tr>
                                        <td>
                                            <span className="font-bold">Card number</span>
                                        </td>
                                        <td>
                                            <span>: 4242 4242 4242 4242</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="font-bold">MM / YY</span>
                                        </td>
                                        <td>
                                            <span>: 12 / 25</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="font-bold">CVC</span>
                                        </td>
                                        <td>
                                            <span>: 258</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <span className="font-bold">ZIP</span>
                                        </td>
                                        <td>
                                            <span>: 12458</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Payment;
