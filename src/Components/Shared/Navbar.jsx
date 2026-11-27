// import { signOut } from "firebase/auth";
// import React, { useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { Link, NavLink } from "react-router-dom";
// import auth from "../../Firebase/firebase.init";
// import brandLogo from "../../assets/mna-computer-manufacturer-logo.webp";
// import Loading from "../Shared/Loading";

// const Navbar = () => {
//   const [user, loading] = useAuthState(auth);

//   let [open, setOpen] = useState(false);

//   const handleSignOut = () => {
//     signOut(auth);
//     localStorage.removeItem("accessToken");
//   };

//   if (loading) {
//     return <Loading />;
//   }

//   const liClass = `md:inline-block  md:ml-10 ml-5 md:my-0 my-2`;
//   const navLinkClass = `text-white cursor-pointer font-Barlow font-normal text-sm inline-block my-3  border-b-2 border-transparent hover:border-pink-700 duration-300`;

//   return (
//     <nav className="bg-[#19223a] top-0 py-1 fixed w-full z-50 flex items-center justify-between">
//       <div
//         className="md:hidden fixed right-5 cursor-pointer z-50"
//         style={{ color: "white" }}
//         onClick={() => setOpen(!open)}
//       >
//         {open ? (
//           <svg
//             className="swap-on fill-current"
//             xmlns="http://www.w3.org/2000/svg"
//             width="32"
//             height="32"
//             viewBox="0 0 512 512"
//           >
//             <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
//           </svg>
//         ) : (
//           <svg
//             className="swap-off fill-current"
//             xmlns="http://www.w3.org/2000/svg"
//             width="32"
//             height="32"
//             viewBox="0 0 512 512"
//           >
//             <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
//           </svg>
//         )}
//       </div>
//       <Link to="/">
//         <img
//           src={brandLogo}
//           alt="Brand_Logo"
//           width="70"
//           height="50"
//           className="ml-7 bg-slate-300 rounded-md"
//         />
//       </Link>
//       <ul
//         className={`bg-[#19223a] md:pl-10 pr-28 md:static fixed duration-500 ease-linear top-0 md:h-auto h-screen z-10 ${
//           !open ? "right-[-100%] " : "right-0"
//         }`}
//       >
//         <li className={liClass}>
//           <NavLink to="/" className={navLinkClass}>
//             Home
//           </NavLink>
//         </li>
//         <li className={liClass}>
//           <NavLink to="/products" className={navLinkClass}>
//             Products
//           </NavLink>
//         </li>
//         <li className={liClass}>
//           <NavLink to="/blogs" className={navLinkClass}>
//             Blogs
//           </NavLink>
//         </li>
//         <li className={liClass}>
//           <NavLink to="/dashboard" className={navLinkClass}>
//             Dashboard
//           </NavLink>
//         </li>

//         <li className={liClass}>
//           {user ? (
//             <button className={navLinkClass} onClick={handleSignOut}>
//               Sign out
//             </button>
//           ) : (
//             <NavLink to="/login" className={navLinkClass}>
//               Login
//             </NavLink>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import auth from "../../Firebase/firebase.init";
import brandLogo from "../../assets/mna-computer-manufacturer-logo.webp";

const NAV_LINKS = [
  { name: "Home", path: "/", end: true },
  { name: "Products", path: "/products" },
  { name: "Blogs", path: "/blogs" },
  { name: "Dashboard", path: "/dashboard" },
];

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Close mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Handle Firebase sign out safely.
  const handleSignOut = async () => {
    if (isSigningOut) return;

    try {
      setIsSigningOut(true);

      await signOut(auth);

      localStorage.removeItem("accessToken");

      setOpen(false);
      navigate("/");

      toast.success("Successfully signed out.");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Unable to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  const closeMenu = () => setOpen(false);

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center py-2 text-sm font-Barlow font-medium transition-colors duration-200 ${
      isActive ? "text-green-500" : "text-white hover:text-green-500"
    }`;

  const authLinkClass =
    "inline-flex items-center justify-center rounded-md border border-green-600 px-5 py-2 text-sm font-Barlow font-medium text-white transition-colors duration-200 hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <header className="fixed top-0 z-50 w-full bg-[#131d38] shadow-md">
      <nav
        className="mx-auto flex min-h-[54px] max-w-7xl items-center justify-between px-5 md:px-7"
        aria-label="Main navigation"
      >
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
          aria-label="MNA Computer Manufacturer Home"
        >
          <img
            src={brandLogo}
            alt="MNA Computer Manufacturer"
            width="85"
            height="40"
            className="h-[40px] w-[85px] rounded-md bg-slate-50 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={navLinkClass}
            >
              {item.name}
            </NavLink>
          ))}

          <div className="ml-2">
            {loading ? (
              <span
                className="text-sm text-gray-300"
                aria-label="Checking authentication"
              >
                ...
              </span>
            ) : user ? (
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className={authLinkClass}
              >
                {isSigningOut ? "Signing out..." : "Sign out"}
              </button>
            ) : (
              <NavLink to="/login" className={authLinkClass}>
                Login
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-green-500 md:hidden"
          onClick={() => setOpen((previous) => !previous)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`absolute left-0 top-full w-full border-t border-white/10 bg-[#19223a] shadow-lg transition-all duration-300 ease-in-out md:hidden ${
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0 pointer-events-none"
          }`}
        >
          <ul className="flex flex-col gap-1 px-6 py-4">
            {NAV_LINKS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `block rounded-md px-4 py-3 text-sm font-Barlow font-medium transition-colors ${
                      isActive
                        ? "bg-green-600/15 text-green-500"
                        : "text-white hover:bg-white/10 hover:text-green-500"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            <li className="mt-2 border-t border-white/10 pt-3">
              {loading ? (
                <span className="block px-4 py-3 text-sm text-gray-400">
                  Checking authentication...
                </span>
              ) : user ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full rounded-md bg-green-600 px-4 py-3 text-left text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSigningOut ? "Signing out..." : "Sign out"}
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="block rounded-md bg-green-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
