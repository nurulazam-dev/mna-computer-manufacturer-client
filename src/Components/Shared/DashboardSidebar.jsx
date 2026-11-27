import {
  faCartPlus,
  faCartShopping,
  faChartLine,
  faComment,
  faPeopleRoof,
  faSquarePlus,
  faTableList,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink } from "react-router-dom";

import auth from "../../Firebase/firebase.init";
import useAdmin from "../../hooks/useAdmin";
import brandLogo from "../../assets/mna-computer-manufacturer-logo.webp";

const DashboardSidebar = ({ isOpen, onClose }) => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);

  const commonLinks = [
    {
      name: "My Profile",
      path: "/dashboard",
      icon: faUser,
      end: true,
    },
  ];

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/dashboard/analysisDashboard",
      icon: faChartLine,
    },
    {
      name: "Manage Orders",
      path: "/dashboard/manageOrders",
      icon: faCartShopping,
    },
    {
      name: "Add Product",
      path: "/dashboard/addProduct",
      icon: faSquarePlus,
    },
    {
      name: "Manage Products",
      path: "/dashboard/manageProducts",
      icon: faTableList,
    },
    {
      name: "Make Admin",
      path: "/dashboard/makeAdminPanel",
      icon: faPeopleRoof,
    },
  ];

  const userLinks = [
    {
      name: "My Orders",
      path: "/dashboard/myOrders",
      icon: faCartPlus,
    },
    {
      name: "Add A Review",
      path: "/dashboard/addReview",
      icon: faComment,
    },
  ];

  const menuLinks = [...commonLinks, ...(admin ? adminLinks : userLinks)];

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-72 flex-col border-l border-slate-800 bg-slate-950 shadow-2xl transition-transform duration-300 ease-in-out md:sticky md:top-[72px] md:z-30 md:h-[calc(100vh-72px)] md:w-20 md:translate-x-0 md:shadow-none lg:w-64 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-slate-800 px-5 md:justify-center md:px-2 lg:justify-between lg:px-5">
          <NavLink
            to="/"
            onClick={onClose}
            className="flex items-center justify-center"
          >
            <img
              src={brandLogo}
              alt="MNA Computer Manufacturer"
              className="w-[130px] object-contain md:hidden lg:block"
            />
            <img
              src={brandLogo}
              alt="MNA Computer Manufacturer"
              className="hidden w-12 object-contain md:block lg:hidden"
            />
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white md:hidden"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 md:hidden lg:block">
            Main Menu
          </p>

          <ul className="space-y-2">
            {menuLinks.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  title={item.name}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 md:justify-center lg:justify-start ${
                      isActive
                        ? "bg-sky-500/15 text-sky-400 shadow-sm shadow-sky-500/5"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={`w-5 shrink-0 text-base transition-colors ${
                          isActive
                            ? "text-sky-400"
                            : "text-slate-500 group-hover:text-sky-400"
                        }`}
                      />

                      <span className="md:hidden lg:inline">{item.name}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shrink-0 border-t border-slate-800 p-4 text-center md:hidden lg:block">
          <p className="text-xs font-semibold text-slate-400">
            MNA COMPUTER MANUFACTURER
          </p>
          <p className="mt-1 text-[10px] text-slate-600">Dashboard Panel</p>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
