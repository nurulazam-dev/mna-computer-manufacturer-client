import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { toast } from "react-toastify";
import useAdmin from "../../../hooks/useAdmin";
import { BASE_URL } from "../../../config";

const AdminPanel = ({ user, index, refetch }) => {
  const { _id, email, name } = user;

  const [admin] = useAdmin(user);

  const [isMakingAdmin, setIsMakingAdmin] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Make Admin
  const handleAdmin = async () => {
    if (isMakingAdmin) return;

    setIsMakingAdmin(true);

    try {
      const response = await fetch(`${BASE_URL}/users/admin/${_id}`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          toast.error("You are unauthorized to make admin");
        } else {
          toast.error(data?.message || "Failed to make admin");
        }
        return;
      }

      if (data?.modifiedCount) {
        toast.success("Admin made successfully");
        await refetch();
      } else {
        toast.error("Failed to make admin");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsMakingAdmin(false);
    }
  };

  // Delete User
  const handleDelete = async () => {
    if (isDeleting) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete user ${name}?`,
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`${BASE_URL}/users/${_id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.message || "Failed to delete user");
        return;
      }

      if (data?.deletedCount) {
        toast.success("User deleted successfully");
        await refetch();
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className="text-[16px]">
      <th className="bg-white py-1">{index + 1}</th>

      <td className="bg-white py-1">{name}</td>

      <td className="bg-white py-1">{email}</td>

      <td className="bg-white py-1 text-center">
        {admin ? (
          <p className="text-success font-semibold">Admin</p>
        ) : (
          <button
            onClick={handleAdmin}
            disabled={isMakingAdmin || isDeleting}
            className="btn btn-sm btn-primary text-white"
          >
            {isMakingAdmin ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Processing
              </>
            ) : (
              "Make admin"
            )}
          </button>
        )}
      </td>

      <td className="bg-white text-center py-1">
        <button
          onClick={handleDelete}
          disabled={isDeleting || isMakingAdmin}
          className="btn btn-sm bg-red-600 border-0 text-white"
          title="Delete user"
        >
          {isDeleting ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <FontAwesomeIcon icon={faTrashAlt} />
          )}
        </button>
      </td>
    </tr>
  );
};

export default AdminPanel;
