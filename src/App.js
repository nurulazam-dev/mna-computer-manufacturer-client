import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Footer from "./Components/Shared/Footer";
import Navbar from "./Components/Shared/Navbar";
import AppRoutes from "./Routes/AppRoutes";

function App() {
  return (
    <div className="bg-slate-900 text-slate-300">
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
