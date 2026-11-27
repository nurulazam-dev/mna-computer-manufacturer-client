import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AppRoutes from "./Routes/AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-300">
        <AppRoutes />
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
