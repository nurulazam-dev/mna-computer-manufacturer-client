import {
  faCartPlus,
  faCartShopping,
  faChartLine,
  faComment,
  faPeopleRoof,
  faSquarePlus,
  faTableList,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import PageTitle from "../Components/Shared/PageTitle";
import auth from "../Firebase/firebase.init";
import brandLogo from "../assets/brandLogo.png";
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
          <div className="flex justify-center mb-3">
            <img
              src={brandLogo}
              alt=""
              className="lg:w-[180px] md:w-[130px] w-[100px]"
            />
          </div>
          <hr className="mb-2" />
          {admin ? (
            <>
              <li>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faChartLine} className="mr-3" />
                  <Link to="/dashboard">Dashboard</Link>
                </div>
              </li>
              <li>
                <Link to="/dashboard">
                  <FontAwesomeIcon icon={faChartLine} className="mr-3" />
                  <span className="lg:block hidden">Demo</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCartShopping} className="mr-3" />
                  <Link to="/dashboard/manageOrders">Manage Orders</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faSquarePlus} className="mr-3" />
                  <Link to="/dashboard/addProduct">Add Product</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faTableList} className="mr-3" />
                  <Link to="/dashboard/manageProducts">Manage Products</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faPeopleRoof} className="mr-3" />
                  <Link to="/dashboard/makeAdminPanel">Make Admin</Link>
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCartPlus} className="mr-3" />
                  <Link to="/dashboard/myOrders">My Orders</Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faComment} className="mr-3" />
                  <Link to="/dashboard/addReview">Add A Review</Link>
                </div>
              </li>
            </>
          )}
          <li>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              <Link to="/dashboard/myProfile">My Profile</Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
