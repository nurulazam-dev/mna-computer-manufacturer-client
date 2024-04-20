import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import PageTitle from "../Components/Shared/PageTitle";
import auth from "../Firebase/firebase.init";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  return (
    <div className="drawer drawer-end drawer-mobile my-10 pl-5 ">
      <PageTitle title="Dashboard"></PageTitle>
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content pt-8 pr-5">
        <h2 className="text-3xl font-bold text-center text-blue-500 my-2 py-2">
          Dashboard
        </h2>
        <Outlet />
      </div>
      <div className="drawer-side border pt-4">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-47 bg-white text-black text-[18px] shadow-lg">
          {admin ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/dashboard/manageOrders">Manage Orders</Link>
              </li>
              <li>
                <Link to="/dashboard/addProduct">Add Product</Link>
              </li>
              <li>
                <Link to="/dashboard/manageProducts">Manage Products</Link>
              </li>
              <li>
                <Link to="/dashboard/makeAdminPanel">Make Admin</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard/myOrders">My Orders</Link>
              </li>
              <li>
                <Link to="/dashboard/addReview">Add A Review</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/dashboard/myProfile">My Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
