import React from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router";
import UseAuth from "../../../hooks/useAuth";
import UseAxios from "../../../Hooks/UseAxios";

const SocialLogin = () => {
  const { googleLogin } = UseAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const axiosInstance = UseAxios()

  const handleGoogleLogin = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;
        console.log(result.user);
        //update userInfo in the database 
        const userInfo = {
          email: user.email,
          role: "user", // default value
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        const res = await axiosInstance.post("/users", userInfo);
        console.log("user update info",res.data);

        navigate(from);
      })
      .catch((error) => {
        console.log(error);
      });
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
