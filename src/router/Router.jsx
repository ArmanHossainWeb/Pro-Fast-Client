import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/coverage/Coverage";
import PrivetRoute from "../Route/PrivetRoute/PrivetRoute";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layout/DashboardLayout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>, 
    children: [
        {
            index:true,
            Component:Home
        },
        {
          path:"/coverage",
          Component: Coverage, 
          loader: () => fetch("./serviceCenter.json")
        },
        {
          path:"/sendParcel",
          loader: () => fetch("./serviceCenter.json"),
          element: <PrivetRoute><SendParcel></SendParcel></PrivetRoute>
        }
    ]
  },
  {
    path:"/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path:"/login",
        Component: Login
      },
      {
        path:'/register',
        Component: Register
      }
    ]
  },
  {
    path:"/dashboard",
    element: <PrivetRoute>
      <DashboardLayout></DashboardLayout>
    </PrivetRoute>,
    children:[
      {
        path: "myParcels",
        
      }
    ]
  }
]);

export default router;