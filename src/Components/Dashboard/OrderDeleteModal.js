import React from "react";
import { toast } from "react-toastify";
import { LOCAL_BASE_URL } from "../../config";

const OrderDeleteModal = ({ deleteOrder, setDeleteOrder, refetch }) => {
  const { _id, customerName, productName } = deleteOrder || "";

  const handleConfirm = () => {
    fetch(`${LOCAL_BASE_URL}/order/${_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Order delete successful");
        }
        refetch();
      });
  };

  return (
    <div>
      <input
        type="checkbox"
        id="delete-my-order-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white">
          <h3 className="font-bold text-success text-lg">
            {" "}
            Hello! {customerName}{" "}
          </h3>
          <p className="py-4">
            {" "}
            Are You sure you want to delete {productName}
            <br /> product?
          </p>
          <div className="modal-action ">
            <label
              htmlFor="delete-my-order-modal"
              className="btn hover:bg-red-600 border-0 text-white"
              onClick={handleConfirm}
            >
              Confirm
            </label>
            <label
              htmlFor="delete-my-order-modal"
              className="btn hover:bg-green-600 border-0 text-white"
            >
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDeleteModal;
