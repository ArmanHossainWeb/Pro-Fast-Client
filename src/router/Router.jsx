import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>, 
    children: [
        {
            index:true,
            Component:Home
        },
    ]
  },
  {
    path:"/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path:"/login",
        Component: Login
      }
    ]
  }
]);

export default router;