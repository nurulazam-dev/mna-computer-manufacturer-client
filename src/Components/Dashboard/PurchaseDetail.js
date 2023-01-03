import React from "react";

const PurchaseDetail = ({ payForProduct }) => {
  const { address, contact, customer, customerName, productName, quantity, price, shouldPay } = payForProduct;

  return (
    <section className="mt-8">
          <h2 className="text-3xl text-center">Order Details</h2>
      <div className="card max-w-sm md:max-w-lg bg-base-100 p-4 hover:shadow-lg">
        <div>
          <table>
            <tbody>
              <tr>
                <td>
                  <span className="font-bold text-primary">
                    Customer Details
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-sm font-bold">Name</span>
                </td>
                <td>
                  <span className="text-sm">: {customerName}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-sm font-bold">Email</span>
                </td>
                <td>
                  <span className="text-sm">: {customer}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-sm font-bold">Contact No</span>
                </td>
                <td>
                  <span className="text-sm">
                    : {contact ? contact : "Not Provided"}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-sm font-bold">
                    Delivery Address
                  </span>
                </td>
                <td>
                  <span className="text-sm">: {address}</span>
                </td>
              </tr>
              <tr>
                <td className="pt-8">
                  <span className="font-bold text-primary">Order Details</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-sm font-bold">Name</span>
                </td>
                <td>
                  <span className="text-sm">: {productName}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-sm font-bold">Quantity</span>
                </td>
                <td>
                  <span className="text-sm">: {quantity}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-sm font-bold">Price/per unit</span>
                </td>
                <td>
                  <span className="text-sm">: {price}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-sm font-bold">Please Pay</span>
                </td>
                <td>
                  <span className="text-sm">: {shouldPay}</span>
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
