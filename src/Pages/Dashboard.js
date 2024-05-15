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
    <div className="my-10 pl-5 flex w-full">
      <PageTitle title="Dashboard"></PageTitle>

      <div className="drawer-content pt-8 pr-5 lg:w-4/5 md:w-4/6 w-10/12">
        <h2 className="text-3xl font-bold text-center text-green-600 my-2 py-2">
          Dashboard
        </h2>
        <Outlet />
      </div>

      <div className="border-l bg-slate-50 pt-4 lg:w-1/5 md:w-1/6 w-1/12 h-screen">
        <ul className="menu p-4 text-black text-[18px]">
          <div className="lg:block md:block hidden">
            <div className="flex justify-center mb-3">
              <img
                src={brandLogo}
                alt=""
                className="lg:w-[180px] md:w-[130px] w-[100px]"
              />
            </div>
            <hr className="mb-2" />
          </div>
          <li>
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faUser} className="lg:mr-3 md:mr-2 mr-0" />
              <span className="lg:block hidden">My Profile</span>
            </Link>
          </li>
          {admin ? (
            <>
              <li>
                <Link to="/dashboard/analysisDashboard">
                  <FontAwesomeIcon
                    icon={faChartLine}
                    className="lg:mr-3 md:mr-2 mr-0"
                  />
                  <span className="lg:block hidden">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manageOrders">
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="lg:mr-3 md:mr-2 mr-0"
                  />
                  <span className="lg:block hidden">Manage Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/addProduct">
                  <FontAwesomeIcon
                    icon={faSquarePlus}
                    className="lg:mr-3 md:mr-2 mr-0"
                  />
                  <span className="lg:block hidden">Add Product</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manageProducts">
                  <FontAwesomeIcon
                    icon={faTableList}
                    className="lg:mr-3 md:mr-2 mr-0"
                  />
                  <span className="lg:block hidden">Manage Products</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/makeAdminPanel">
                  <FontAwesomeIcon
                    icon={faPeopleRoof}
                    className="lg:mr-3 md:mr-2 mr-0"
                  />
                  <span className="lg:block hidden">Make Admin</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard/myOrders">
                  <FontAwesomeIcon
                    icon={faCartPlus}
                    className="lg:mr-3 md:mr-2 mr-0"
                  />
                  <span className="lg:block hidden">My Orders</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard/addReview">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="lg:mr-3 md:mr-2 mr-0"
                  />
                  <span className="lg:block hidden">Add A Review</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
