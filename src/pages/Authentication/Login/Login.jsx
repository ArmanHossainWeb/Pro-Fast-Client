import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import UseAuth from "../../../Hooks/UseAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = UseAuth();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
    .then(result => {
      console.log(result.user);
    })
    .catch(error => {
      console.log(error);
    })
  };

  return (
    <div className="max-w-lg shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          <div>
            <h1 className="text-4xl font-bold">Welcome Back</h1>
            <p>Login with ProFast</p>
          </div>
          {/* email  */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
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

          <div>
            <a className="link link-hover text-red-500">Forgot password?</a>
            {/* naviage user to login page  */}
            <p className="items-center">
              Don't Have Account ?
              <Link
                className="btn btn-link text-secondary  p-0"
                to={"/register"}
              >
                Register
              </Link>
            </p>
          </div>
          <button className="btn btn-primary text-black mt-4">Login</button>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
