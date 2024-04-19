import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink } from "react-router-dom";
import auth from "../../Firebase/firebase.init";
import brandLogo from "../../assets/brandLogo.png";
import Loading from "../Shared/Loading";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  let [open, setOpen] = useState(false);
  const handleSignOut = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
  };
  if (loading) {
    return <Loading />;
  }

  const liClass = `md:inline-block  md:ml-10 ml-5 md:my-0 my-2`;
  const navLinkClass = `text-white cursor-pointer font-Barlow font-normal text-sm inline-block my-3  border-b-2 border-transparent hover:border-pink-700 duration-300`;

  return (
    <nav className="bg-[#19223a] top-0 py-2 fixed w-full z-50 flex items-center justify-between">
      <div
        className="md:hidden fixed right-5 cursor-pointer z-50"
        style={{ color: "white" }}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        ) : (
          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        )}
      </div>
      <Link to="/">
        <img
          src={brandLogo}
          alt="Brand_Logo"
          width="200"
          height="200"
          className="ml-7"
        />
      </Link>
      <ul
        className={`bg-[#19223a] md:pl-10 pr-28 md:static fixed duration-500 ease-linear top-0 md:h-auto h-screen z-10 ${
          !open ? "right-[-100%] " : "right-0"
        }`}
      >
        <li className={liClass}>
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
        </li>
        <li className={liClass}>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
        </li>
        <li className={liClass}>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>
        <li className={liClass}>
          <NavLink to="/blogs" className={navLinkClass}>
            Blogs
          </NavLink>
        </li>
        <li className={liClass}>
          {user ? (
            <button className={navLinkClass} onClick={handleSignOut}>
              Sign out
            </button>
          ) : (
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
