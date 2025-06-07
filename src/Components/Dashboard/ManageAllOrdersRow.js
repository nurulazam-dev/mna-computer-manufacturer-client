import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminDeleteOrderModal from "./AdminDeleteOrderModal";

const ManageAllOrdersRow = ({ order, index, refetch }) => {
  const [adminOrderDelete, setAdminOrderDelete] = useState(null);
  const {
    _id,
    customer,
    customerName,
    productName,
    shouldPay,
    shipment,
    paid,
  } = order || {};

  const handlePending = () => {
    fetch(`https://mna-computer-manufacturer.onrender.com/order/${_id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.modifiedCount) {
          toast.success("Placed for shipment");
        }
        refetch();
      });
  };

  const isPaid = paid || shouldPay > 0;

  return (
    <tr className="text-[16px]">
      <th className="bg-white">{index + 1}</th>
      <td className="bg-white">{customerName}</td>
      <td className="bg-white">{customer}</td>
      <td className="bg-white">{productName}</td>
      <td className="bg-white">
        {isPaid ? (
          <span className="text-success font-semibold">Paid</span>
        ) : (
          <div
            className="tooltip tooltip-primary"
            data-tip="Payment is not completed yet"
          >
            <span className="text-primary font-semibold">Unpaid</span>
          </div>
        )}
      </td>
      <td className="bg-white">
        {isPaid ? (
          !shipment ? (
            <div
              className="tooltip tooltip-success"
              data-tip="Place for shipment"
            >
              <button
                className="btn btn-sm btn-success text-white"
                onClick={handlePending}
              >
                Pending
              </button>
            </div>
          ) : (
            <div className="tooltip tooltip-success" data-tip="Shipment placed">
              <span className="text-success font-semibold">Shipped</span>
            </div>
          )
        ) : (
          <div
            className="tooltip tooltip-warning"
            data-tip="Delete customer's order"
          >
            <button
              className="btn btn-sm btn-warning"
              onClick={() => setAdminOrderDelete(order)}
            >
              Cancel <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        )}
        {adminOrderDelete && (
          <AdminDeleteOrderModal
            adminOrderDelete={adminOrderDelete}
            refetch={refetch}
            onClose={() => setAdminOrderDelete(null)}
          />
        )}
      </td>
    </tr>
  );
};

export default ManageAllOrdersRow;
