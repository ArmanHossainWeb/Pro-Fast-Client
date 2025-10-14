import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import UseAuth from "../../../Hooks/UseAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from =location.state?.from || "/"


  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        navigate(from)
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="max-w-lg shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          <div>
            <h1 className="text-4xl font-bold">Create an Account</h1>
            <p>Register with ProFast</p>
          </div>
          {/* email field  */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is Required</p>
          )}
          {/* password */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500"> password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              password must be 6 charecter oo longer
            </p>
          )}

          {/* naviage user to login page  */}
          <p className="items-center">
            Already Have Account ?{" "}
            <Link className="btn btn-link text-secondary  p-0" to={"/login"}>
              Login
            </Link>{" "}
          </p>

          <button className="btn btn-primary text-black mt-4">Register</button>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
