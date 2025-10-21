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
import Payment from "../pages/Dashboard/Payment/Payment";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import PaymentHistory from "../pages/Dashboard/paymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/trackParcel/TrackParcel";
import BeARider from "../pages/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/pendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/activeRiders/ActiveRiders";


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
        }, 
        {
          path: "/beARider",
          loader: () => fetch("./serviceCenter.json"),
          element: <PrivetRoute><BeARider></BeARider></PrivetRoute>
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
        Component: MyParcels
        
      },
      {
        path: "payment/:parcelId",
        Component:Payment
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory
      },
      {
        path:"track",
        Component: TrackParcel
      },
      {
        path:"pending-riders",
        Component: PendingRiders
      },
      {
        path:"active-riders",
        Component: ActiveRiders
      }
    ]
  }
]);

export default router;