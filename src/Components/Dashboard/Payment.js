import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";
import PurchaseDetail from "./PurchaseDetail";

const stripePromise = loadStripe(
  "pk_test_51L0gmsA8JMkzEy5gARbixx2IqJphAPSG7j1WtedZf4nJeX6LDmsJiR8o39InC5xCl5BKw0D31X3EWzXqrHjGmn5X005rJGKBT9"
);

const Payment = () => {
  const { payForId } = useParams();

  const { data: payForProduct, isLoading } = useQuery(
    ["payForProduct", payForId],
    () =>
      fetch(
        `https://mna-computer-manufacturer.onrender.com/order/${payForId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      ).then((res) => res.json())
  );
  // console.log(payForProduct);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="border border-green-600 rounded mx-4">
      <div className="bg-green-600">
        <h2 className="text-white text-center p-1 text-2xl font-semibold">
          Payment Details
        </h2>
      </div>

      <div className="flex justify-around">
        <div className="order-details">
          <PurchaseDetail
            key={payForProduct._id}
            payForProduct={payForProduct}
          ></PurchaseDetail>
        </div>
        <div className="payment-stripe mt-5 pb-12 w-[360px]">
          <div className="border border-green-600 rounded">
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
