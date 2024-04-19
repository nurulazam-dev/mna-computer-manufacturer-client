import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddAProduct from "./Components/Dashboard/AddAProduct";
import AddAReview from "./Components/Dashboard/AddAReview";
import BarChart from "./Components/Dashboard/BarChart";
import MakeAdminPanel from "./Components/Dashboard/MakeAdminPanel";
import ManageAllOrders from "./Components/Dashboard/ManageAllOrders";
import ManageProducts from "./Components/Dashboard/ManageProducts";
import MyOrders from "./Components/Dashboard/MyOrders";
import MyProfile from "./Components/Dashboard/MyProfile";
import Payment from "./Components/Dashboard/Payment";
import ProductDetails from "./Components/Home/ProductDetails";
import RequireAdmin from "./Components/Login/RequireAdmin";
import RequireAuth from "./Components/Login/RequireAuth";
import Footer from "./Components/Shared/Footer";
import Navbar from "./Components/Shared/Navbar";
import AllProduct from "./Pages/AllProduct";
import Blogs from "./Pages/Blogs";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
// import Login from "./Pages/Login";
import LoginCopy from "./Pages/LoginCopy";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";

function App() {
  return (
    <div className="text-xl bg-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="/products" element={<AllProduct />} />
        <Route
          path="product/purchase/:purchaseId"
          element={
            <RequireAuth>
              <ProductDetails />
            </RequireAuth>
          }
        />
        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="addReview" element={<AddAReview />} />
          <Route path="analysis" element={<BarChart />} />
          <Route path="myOrders" element={<MyOrders />} />
          <Route path="payment/:payForId" element={<Payment />}></Route>
          <Route
            path="makeAdminPanel"
            element={
              <RequireAdmin>
                <MakeAdminPanel />
              </RequireAdmin>
            }
          />
          <Route
            path="addProduct"
            element={
              <RequireAdmin>
                <AddAProduct />
              </RequireAdmin>
            }
          />
          <Route
            path="manageProducts"
            element={
              <RequireAdmin>
                <ManageProducts />
              </RequireAdmin>
            }
          />
          <Route
            path="manageOrders"
            element={
              <RequireAdmin>
                <ManageAllOrders />
              </RequireAdmin>
            }
          />
        </Route>
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="login" element={<LoginCopy />} />
        <Route path="register" element={<Register />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
