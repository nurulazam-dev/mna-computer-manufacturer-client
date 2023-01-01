import React from 'react';
import { toast } from "react-toastify";
import useAdmin from "../../hooks/useAdmin";

const AdminPanel = ({ user, index, refetch }) => {
    const { _id, email,name } = user;
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
        <tr className="hover" key={index}>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                {admin ? (<p className="text-success font-semibold ml-3">Admin</p>) : (
                    <button onClick={handleAdmin} className="btn btn-sm btn-primary text-white" >
                        Make admin
                    </button>
                )}
            </td>
        </tr>
    );
};

export default AdminPanel;