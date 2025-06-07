import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../Firebase/firebase.init";

const AdminDeleteOrderModal = ({ onClose, adminOrderDelete, refetch }) => {
  const [user] = useAuthState(auth);
  const { _id, customerName, productName } = adminOrderDelete || {};

  const handleConfirm = () => {
    fetch(`https://mna-computer-manufacturer.onrender.com/order/${_id}`, {
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
        onClose();
      });
  };

  if (!adminOrderDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h3 className="font-bold text-success text-lg mb-2">
          Hello! Admin {user?.displayName}
        </h3>
        <p className="font-semibold text-red-500 pt-2">
          Customer Name: {customerName}
        </p>
        <p className="mb-6">
          Are you sure you want to delete{" "}
          <span className="font-bold">{productName}</span> product?
        </p>
        <div className="flex justify-end gap-3">
          <button
            className="btn bg-red-500 text-white hover:bg-red-600 border-0"
            onClick={handleConfirm}
          >
            Confirm
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDeleteOrderModal;
