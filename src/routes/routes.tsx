import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import NotFound from "../pages/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
    //   {
    //     path: "/",
    //     element: <Home />,
    //   },
    ],
  },
]);