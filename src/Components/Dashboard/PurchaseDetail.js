import React from "react";

const PurchaseDetail = ({ payForProduct }) => {
  const { address, contact, customer, customerName, productName, quantity, price, shouldPay } = payForProduct;

  return (
    <section>
      <div className="card max-w-sm md:max-w-lg bg-base-100 hover:shadow-lg">
        <div>
          <h3 className="text-2xl text-green-600 font-bold text-center">Order Details</h3>
          <table className="text-sm table">
            <tbody>
              <tr>
                <td>
                  <span className="font-bold">Customer's Name</span>
                </td>
                <td>
                  <span>: {customerName}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">Email</span>
                </td>
                <td>
                  <span>: {customer}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">Contact No</span>
                </td>
                <td>
                  <span>
                    : {contact ? contact : "Not Provided"}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-sm font-bold">
                    Address
                  </span>
                </td>
                <td>
                  <span>: {address}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">Product's Name</span>
                </td>
                <td>
                  <span>: {productName}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">Quantity</span>
                </td>
                <td>
                  <span>: {quantity}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="font-bold">Price/per unit</span>
                </td>
                <td>
                  <span>: $ {price}</span>
                </td>
              </tr>
              <tr className="font-bold text-blue-800">
                <td>
                  <span>Total Pay</span>
                </td>
                <td>
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
