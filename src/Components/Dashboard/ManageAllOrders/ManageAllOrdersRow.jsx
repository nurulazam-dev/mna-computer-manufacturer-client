import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { BASE_URL } from "../../../config";
import AdminDeleteOrderModal from "./AdminDeleteOrderModal";

const ManageAllOrdersRow = ({ order, index, refetch }) => {
  const [adminOrderDelete, setAdminOrderDelete] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    _id,
    customer,
    customerName,
    productName,
    shouldPay,
    shipment,
    paid,
  } = order || {};

  const handlePending = async () => {
    if (isUpdating) return;

    try {
      setIsUpdating(true);

      const response = await fetch(`${BASE_URL}/order/${_id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data?.modifiedCount) {
        throw new Error(data.message || "Failed to update order status.");
      }

      toast.success("Placed for shipment successfully.");

      await refetch();
    } catch (error) {
      console.error("Update order error:", error);
      toast.error(error.message || "Failed to update order.");
    } finally {
      setIsUpdating(false);
    }
  };

  const isPaid = paid || shouldPay > 0;

  return (
    <tr className="text-base transition hover:bg-green-50">
      <th className="bg-white">#{index + 1}</th>

      <td className="bg-white">{customerName}</td>

      <td className="bg-white">{customer}</td>

      <td className="bg-white">{productName}</td>

      {/* Payment Status */}
      <td className="bg-white">
        {isPaid ? (
          <span className="font-semibold text-success">Paid</span>
        ) : (
          <div
            className="tooltip tooltip-primary"
            data-tip="Payment is not completed yet"
          >
            <span className="font-semibold text-primary">Unpaid</span>
          </div>
        )}
      </td>

      {/* Shipment Status */}
      <td className="bg-white">
        {isPaid ? (
          !shipment ? (
            <div
              className="tooltip tooltip-success"
              data-tip="Place for shipment"
            >
              <button
                type="button"
                className="btn btn-sm btn-success text-white disabled:opacity-60"
                onClick={handlePending}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  "Pending"
                )}
              </button>
            </div>
          ) : (
            <div className="tooltip tooltip-success" data-tip="Shipment placed">
              <span className="font-semibold text-success">Shipped</span>
            </div>
          )
        ) : (
          <div
            className="tooltip tooltip-warning"
            data-tip="Delete customer's order"
          >
            <button
              type="button"
              className="btn btn-sm btn-warning"
              onClick={() => setAdminOrderDelete(order)}
            >
              Cancel <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        )}

        {/* Delete Order Modal */}
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
