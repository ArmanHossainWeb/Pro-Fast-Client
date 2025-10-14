import React from "react";
import { FcGoogle } from "react-icons/fc";
import UseAuth from "../../../Hooks/UseAuth";
import {  useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const {googleLogin} = UseAuth();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?. from || "/"

  const handleGoogleLogin = () => {
    googleLogin()
    .then(result => {
        console.log(result.user);
      navigate(from)
    })
    .catch(error => {
        console.log(error);
    })
  };
  return (
    <div>
      <div className="divider">OR</div>

      {/* Google */}
      <button
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5] w-full"
      >
        <FcGoogle />
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
