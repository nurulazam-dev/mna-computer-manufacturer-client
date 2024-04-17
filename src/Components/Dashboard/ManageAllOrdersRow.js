import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminDeleteOrderModal from "./AdminDeleteOrderModal";

const ManageAllOrdersRow = ({ order, index, refetch }) => {
  const [adminOrderDelete, setAdminOrderDelete] = useState(null);
  const { _id, customer, customerName, productName, paid, shipment } =
    order || "";

  const handlePending = () => {
    fetch(`https://mna-computer-manufacturer.onrender.com/order/${_id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.modifiedCount) {
          toast.success("Placed for shipment");
        }
        refetch();
      });
  };

  return (
    <tr className="text-[16px]">
      <th className="bg-white">{index + 1}</th>
      <td className="bg-white">{customerName}</td>
      <td className="bg-white">{customer}</td>
      <td className="bg-white">{productName}</td>
      <td className="bg-white">
        {paid ? (
          <>
            <span className="text-success font-semibold">Paid</span>
          </>
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
        {paid ? (
          <>
            {!shipment ? (
              <div
                className="tooltip tooltip-secondary"
                data-tip="Place for shipment"
              >
                <button
                  className="btn btn-sm btn-secondary text-white"
                  onClick={handlePending}
                >
                  Pending
                </button>
              </div>
            ) : (
              <>
                <div
                  className="tooltip tooltip-success"
                  data-tip="Shipment placed"
                >
                  <span className="text-success font-semibold">Shipped</span>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div
              className="tooltip tooltip-warning"
              data-tip="Delete customer's order"
            >
              <label
                htmlFor="admin-delete-single-order"
                className="btn btn-sm btn-warning modal-button"
                onClick={() => setAdminOrderDelete(order)}
              >
                Cancel{" "}
                <FontAwesomeIcon
                  className=""
                  icon={faTrashAlt}
                ></FontAwesomeIcon>
              </label>
            </div>
          </>
        )}
        {adminOrderDelete && (
          <AdminDeleteOrderModal
            adminOrderDelete={adminOrderDelete}
            refetch={refetch}
          ></AdminDeleteOrderModal>
        )}
      </td>
    </tr>
  );
};

export default ManageAllOrdersRow;
