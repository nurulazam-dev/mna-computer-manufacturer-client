import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";
import PurchaseDetail from "./PurchaseDetail";
import { BASE_URL } from "../../config";

const stripePromise = loadStripe(
  "pk_test_51L0gmsA8JMkzEy5gARbixx2IqJphAPSG7j1WtedZf4nJeX6LDmsJiR8o39InC5xCl5BKw0D31X3EWzXqrHjGmn5X005rJGKBT9"
);

const Payment = () => {
  const { payForId } = useParams();

  const { data: payForProduct, isLoading } = useQuery(
    ["payForProduct", payForId],
    () =>
      fetch(`${BASE_URL}/order/${payForId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!payForProduct) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500 font-semibold text-lg">
          Order not found or failed to load.
        </p>
      </div>
    );
  }

  return (
    <section className="border border-green-600 rounded mx-4 my-8">
      <div className="bg-green-600">
        <h2 className="text-white text-center p-1 text-2xl font-semibold">
          Payment Details
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center items-start p-6">
        {/* Order Details */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <PurchaseDetail payForProduct={payForProduct} />
        </div>
        {/* Stripe Payment */}
        <div className="w-full max-w-md">
          <div className="border border-green-600 rounded mb-6">
            <div className="bg-green-600">
              <h2 className="text-white text-center p-1 text-[17px] font-semibold">
                Give your info in Card for Pay
              </h2>
            </div>
            <div className="card bg-white border shadow-xl rounded-none">
              <div className="card-body">
                <Elements stripe={stripePromise}>
                  <CheckoutForm payForProduct={payForProduct} />
                </Elements>
              </div>
            </div>
          </div>
          {/* Demo Card Info */}
          <div className="mt-6 border border-orange-600 rounded">
            <p className="bg-slate-800 text-center text-white py-1">
              Pay Demo Card Details
            </p>
            <div className="text-[16px] px-1">
              <table className="table w-full">
                <tbody>
                  <tr>
                    <td className="bg-white">
                      <span className="font-bold">Card number :</span>
                      <span className="ml-4"> 4242 4242 4242 4242</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-white">
                      <span>
                        <strong>MM / YY :</strong> 12 / 25
                      </span>
                      <span className="ml-5">
                        <strong>CVC :</strong> 258
                      </span>
                      <span className="ml-5">
                        <strong>ZIP :</strong> 12458
                      </span>
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
