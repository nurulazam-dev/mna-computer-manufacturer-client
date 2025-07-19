import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Components/Shared/Loading";
import AdminPanel from "./AdminPanel";
import { BASE_URL } from "../../config";

const MakeAdminPanel = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch(`${BASE_URL}/users`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

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
              <th className="text-center">Admin</th>
              <th className="text-center">Delete User</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <>
                <AdminPanel
                  key={user?._id}
                  index={index}
                  user={user}
                  refetch={refetch}
                ></AdminPanel>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MakeAdminPanel;
