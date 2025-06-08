import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import useAdmin from "../../hooks/useAdmin";
import { LOCAL_BASE_URL } from "../../config";

const AdminPanel = ({ user, index, refetch }) => {
  const { _id, email, name } = user;
  const [admin] = useAdmin(user);

  const handleAdmin = () => {
    fetch(`${LOCAL_BASE_URL}/users/admin/${_id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          toast.error("You are unauthorized to make admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Admin made Success");
        }
        refetch();
      });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete user ${name}?`)) {
      fetch(`${LOCAL_BASE_URL}/users/${_id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount) {
            toast.success("User deleted successfully");
            refetch();
          } else {
            toast.error("Failed to delete user");
          }
        });
    }
  };

  return (
    <tr className="text-[16px]" key={_id}>
      <th className="bg-white py-1">{index + 1}</th>
      <td className="bg-white py-1">{name}</td>
      <td className="bg-white py-1">{email}</td>
      <td className="bg-white py-1 text-center">
        {admin ? (
          <p className="text-success font-semibold ml-3">Admin</p>
        ) : (
          <button
            onClick={handleAdmin}
            className="btn btn-sm btn-primary text-white"
          >
            Make admin
          </button>
        )}
      </td>
      <td className="bg-white text-center py-1">
        <button onClick={handleDelete} className="btn bg-red-600 border-0">
          <FontAwesomeIcon
            className="text-white"
            icon={faTrashAlt}
          ></FontAwesomeIcon>
        </button>
      </td>
    </tr>
  );
};

export default AdminPanel;
