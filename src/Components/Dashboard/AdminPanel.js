import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { toast } from "react-toastify";
import useAdmin from "../../hooks/useAdmin";

const AdminPanel = ({ user, index, refetch }) => {
  const { _id, email, name } = user;
  const [admin] = useAdmin(user);

  const handleAdmin = () => {
    fetch(`https://mna-computer-manufacturer.onrender.com/users/admin/${_id}`, {
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

  return (
    <tr className="text-[16px]" key={_id}>
      <th className="bg-white">{index + 1}</th>
      <td className="bg-white">{name}</td>
      <td className="bg-white">{email}</td>
      <td className="bg-white text-center">
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
      <td className="bg-white text-center">
        <button
          // onClick={() => handleDelete(product._id)}
          className="btn bg-red-600 border-0"
        >
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
