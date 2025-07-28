import React from "react";
import { Outlet } from "react-router";
import AuthImg from "../assets/authImage.png";
import ProFastLogo from "../pages/shared/proFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      <div>
        <ProFastLogo></ProFastLogo>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={AuthImg} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
