import { Route, Routes } from "react-router-dom";
import RequireAdmin from "../Components/Login/RequireAdmin";
import RequireAuth from "../Components/Login/RequireAuth";
import AddAProduct from "../Components/Dashboard/AddAProduct";
import AddAReview from "../Components/Dashboard/AddAReview";
import AnalysisDashboard from "../Components/Dashboard/AnalysisDashboard";
import MakeAdminPanel from "../Components/Dashboard/MakeAdminPanel";
import ManageAllOrders from "../Components/Dashboard/ManageAllOrders";
import ManageProducts from "../Components/Dashboard/ManageProducts";
import MyOrders from "../Components/Dashboard/MyOrders";
import MyProfile from "../Components/Dashboard/MyProfile";
import Payment from "../Components/Dashboard/Payment";
import ProductDetails from "../Components/Home/ProductDetails";
import AllProduct from "../Pages/AllProduct";
import Blogs from "../Pages/Blogs";
import Dashboard from "../Pages/Dashboard";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import Register from "../Pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route path="/products" element={<AllProduct />} />

      <Route path="/blogs" element={<Blogs />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/product/purchase/:purchaseId"
        element={
          <RequireAuth>
            <ProductDetails />
          </RequireAuth>
        }
      />

      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route index element={<MyProfile />} />

        <Route path="addReview" element={<AddAReview />} />
        <Route path="myOrders" element={<MyOrders />} />
        <Route path="payment/:payForId" element={<Payment />} />

        <Route
          path="analysisDashboard"
          element={
            <RequireAdmin>
              <AnalysisDashboard />
            </RequireAdmin>
          }
        />

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

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
