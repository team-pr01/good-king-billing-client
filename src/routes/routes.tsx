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
import Orders from "../pages/Dashboard/Orders/Orders";
import OrderDetails from "../pages/Dashboard/OrderDetails/OrderDetails";
import ChangePassword from "../pages/Auth/ChangePassword/ChangePassword";
import OrderConfirmed from "../pages/Dashboard/OrderConfirmed/OrderConfirmed";
import Users from "../pages/Admin/Users/Users";
import Area from "../pages/Dashboard/Area/Area";

export const router = createBrowserRouter(
  [
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
          path: "users",
          element: <Users />,
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
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "order/:id",
          element: <OrderDetails />,
        },
        {
          path: "order-confirmed/:id",
          element: <OrderConfirmed />,
        },
        {
          path: "settings",
          element: <ChangePassword />,
        },
        {
          path: "area",
          element: <Area />,
        },
      ],
    },
  ],
  {
    basename: "/mh-20",
  }
);
