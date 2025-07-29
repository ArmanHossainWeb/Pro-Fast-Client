import React from "react";
import { FcGoogle } from "react-icons/fc";
import UseAuth from "../../../Hooks/UseAuth";

const SocialLogin = () => {
  const {googleLogin} = UseAuth();

  const handleGoogleLogin = () => {
    googleLogin()
    .then(result => {
        console.log(result.user);
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
