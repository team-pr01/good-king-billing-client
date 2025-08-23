import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login/Login";

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
    ],
  },
]);