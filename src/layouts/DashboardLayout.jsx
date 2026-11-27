import { useState } from "react";
import { Outlet } from "react-router-dom";

import DashboardNavbar from "../Components/Shared/DashboardNavbar";
import DashboardSidebar from "../Components/Shared/DashboardSidebar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-900">
      <DashboardNavbar
        isSidebarOpen={isSidebarOpen}
        onMenuClick={handleSidebarToggle}
      />

      <div className="flex flex-1 items-stretch">
        <main className="min-w-0 flex-1 p-4 sm:p-6">
          {children ?? <Outlet />}
        </main>

        <DashboardSidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      </div>
    </div>
  );
};

export default DashboardLayout;
