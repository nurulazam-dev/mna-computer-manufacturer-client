import { Route, Routes } from "react-router-dom";
import RequireAdmin from "../Components/Login/RequireAdmin";
import RequireAuth from "../Components/Login/RequireAuth";
import AddAProduct from "../Components/Dashboard/AddAProduct";
import AddAReview from "../Components/Dashboard/AddAReview";
import AnalysisDashboard from "../Components/Dashboard/AnalysisDashboard";
import MakeAdminPanel from "../Components/Dashboard/MakeAdmin/MakeAdminPanel";
import ManageAllOrders from "../Components/Dashboard/ManageAllOrders/ManageAllOrders";
import ManageProducts from "../Components/Dashboard/ManageProducts/ManageProducts";
import MyOrders from "../Components/Dashboard/MyOrders";
import MyProfile from "../Components/Dashboard/MyProfile";
import Payment from "../Components/Dashboard/Payment";
import ProductDetails from "../Components/Home/ProductDetails";
import AllProduct from "../Pages/AllProduct";
import Blogs from "../Pages/Blogs";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import NotFound from "../Pages/NotFound";
import Register from "../Pages/Register";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthLayout>
            <Home />
          </AuthLayout>
        }
      />
      <Route
        path="/home"
        element={
          <AuthLayout>
            <Home />
          </AuthLayout>
        }
      />

      <Route
        path="/products"
        element={
          <AuthLayout>
            <AllProduct />
          </AuthLayout>
        }
      />

      <Route
        path="/blogs"
        element={
          <AuthLayout>
            <Blogs />
          </AuthLayout>
        }
      />

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
            <DashboardLayout />
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
