import React from "react";
import { Outlet } from "react-router";
import AuthImg from "../assets/authImage.png";
import ProFastLogo from "../pages/shared/proFastLogo/ProFastLogo";

const AuthLayout = () => {
  return (
    <div className="bg-base-300 min-h-screen">
      <div>
        <ProFastLogo></ProFastLogo>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={AuthImg} className="max-w-lg rounded-lg shadow-2xl" />
        <div className="w-full md:w-1/5  lg:w-1/3 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
