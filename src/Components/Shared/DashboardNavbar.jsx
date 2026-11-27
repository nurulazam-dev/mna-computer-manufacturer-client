import {
  faBars,
  faXmark,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthState } from "react-firebase-hooks/auth";

import auth from "../../Firebase/firebase.init";

const DashboardNavbar = ({ isSidebarOpen, onMenuClick }) => {
  const [user] = useAuthState(auth);

  return (
    <header className="sticky top-0 z-40 flex h-[72px] items-center justify-between border-b border-slate-800 bg-slate-950/95 px-4 shadow-lg shadow-black/10 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-400 md:hidden"
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isSidebarOpen}
        >
          <FontAwesomeIcon
            icon={isSidebarOpen ? faXmark : faBars}
            className="text-lg"
          />
        </button>

        <div>
          <h1 className="text-lg font-bold tracking-wide text-white sm:text-xl">
            Dashboard
          </h1>
          <p className="hidden text-xs text-slate-500 sm:block">
            Manage your account and activities
          </p>
        </div>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400">
          <FontAwesomeIcon icon={faCircleUser} className="text-xl" />
        </div>

        <div className="hidden min-w-0 sm:block">
          <p className="text-sm font-semibold text-slate-200">
            {user?.displayName || "User"}
          </p>
          <p className="max-w-[220px] truncate text-xs text-slate-500">
            {user?.email}
          </p>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
