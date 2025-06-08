import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Components/Shared/Loading";
import { LOCAL_BASE_URL } from "../../config";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const MakeAdminPanel = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(`${LOCAL_BASE_URL}/users`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const handleAdmin = (user) => {
    fetch(`${LOCAL_BASE_URL}/users/admin/${user._id}`, {
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

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
      fetch(`${LOCAL_BASE_URL}/users/${user._id}`, {
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="border border-green-600 rounded mx-4">
      <div className="bg-green-600">
        <h2 className="text-white text-center p-1 text-2xl font-semibold">
          Manage Users
        </h2>
      </div>
      <h2 className="text-center text-xl mt-3">
        Total Registered: {users?.length}{" "}
      </h2>
      <div className="overflow-x-auto p-4">
        <table className="table w-full border rounded">
          <thead>
            <tr className="text-[17px] text-white">
              <th>S. No</th>
              <th>Name</th>
              <th>Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Make Admin</th>
              <th className="text-center">Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr className="text-[16px]" key={user?._id}>
                <th className="bg-white py-1">{index + 1}</th>
                <td className="bg-white py-1">{user?.name}</td>
                <td className="bg-white py-1">{user?.email}</td>
                <td className="bg-white text-center py-1">
                  {user?.role === "admin" ? (
                    <p className="text-green-600 font-semibold ml-3">Admin</p>
                  ) : (
                    <p className="text-black font-semibold ml-3">User</p>
                  )}
                </td>
                <td className="bg-white text-center py-1">
                  {user.role === "admin" ? (
                    <p className="text-green-600 font-semibold ml-3">
                      Already Admin
                    </p>
                  ) : (
                    <button
                      onClick={() => handleAdmin(user)}
                      className="btn btn-sm btn-primary text-white"
                    >
                      Make admin
                    </button>
                  )}
                </td>
                <td className="bg-white text-center py-1">
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn bg-red-600 border-0 text-sm"
                  >
                    <FontAwesomeIcon
                      className="text-white"
                      icon={faTrashAlt}
                    ></FontAwesomeIcon>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MakeAdminPanel;
