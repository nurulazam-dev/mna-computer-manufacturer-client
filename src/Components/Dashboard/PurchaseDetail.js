import React from "react";

const PurchaseDetail = ({ payForProduct }) => {
  const {
    address,
    contact,
    customer,
    customerName,
    productName,
    quantity,
    price,
    shouldPay,
  } = payForProduct;

  return (
    <section>
      <div className="card max-w-sm md:max-w-lg bg-white hover:shadow-lg">
        <div>
          <h3 className="text-2xl text-green-600 font-bold text-center">
            Order Details
          </h3>
          <table className="text-sm table">
            <tbody>
              <tr>
                <td className="bg-white">
                  <span className="font-bold">Customer's Name</span>
                </td>
                <td className="bg-white">
                  <span>: {customerName}</span>
                </td>
              </tr>
              <tr>
                <td className="bg-white">
                  <span className="font-bold">Email</span>
                </td>
                <td className="bg-white">
                  <span>: {customer}</span>
                </td>
              </tr>
              <tr>
                <td className="bg-white">
                  <span className="font-bold">Contact No</span>
                </td>
                <td className="bg-white">
                  <span>: {contact ? contact : "Not Provided"}</span>
                </td>
              </tr>
              <tr>
                <td className="bg-white">
                  <span className="text-sm font-bold">Address</span>
                </td>
                <td className="bg-white">
                  <span>: {address}</span>
                </td>
              </tr>
              <tr>
                <td className="bg-white">
                  <span className="font-bold">Product's Name</span>
                </td>
                <td className="bg-white">
                  <span>: {productName}</span>
                </td>
              </tr>
              <tr>
                <td className="bg-white">
                  <span className="font-bold">Quantity</span>
                </td>
                <td className="bg-white">
                  <span>: {quantity}</span>
                </td>
              </tr>
              <tr>
                <td className="bg-white">
                  <span className="font-bold">Price/per unit</span>
                </td>
                <td className="bg-white">
                  <span>: $ {price}</span>
                </td>
              </tr>
              <tr className="font-bold text-blue-800">
                <td className="bg-white">
                  <span>Total Pay</span>
                </td>
                <td className="bg-white">
                  <span>: $ {shouldPay}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PurchaseDetail;
