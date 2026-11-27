import { Outlet } from "react-router-dom";

import Footer from "../Components/Shared/Footer";
import Navbar from "../Components/Shared/Navbar";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Navbar />

      <main className="flex-1">{children || <Outlet />}</main>

      <Footer />
    </div>
  );
};

export default AuthLayout;
