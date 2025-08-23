import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import AdminDashboardHome from "../pages/Admin/AdminDashboardHome/AdminDashboardHome";
import Clients from "../pages/Admin/Clients/Clients";
import ClientDetails from "../pages/Admin/Clients/ClientDetails/ClientDetails";
import CreateOrder from "../pages/Dashboard/CreateOrder/CreateOrder";
import Products from "../pages/Admin/Products/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "admin/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <AdminDashboardHome />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
      {
        path: "client/:id",
        element: <ClientDetails />,
      },
      {
        path: "create-order",
        element: <CreateOrder />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
]);