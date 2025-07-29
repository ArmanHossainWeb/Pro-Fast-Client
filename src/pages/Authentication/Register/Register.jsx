import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
            {...register("email", {required:true})}
            className="input"
            placeholder="Email"
          />
          {
            errors.email?.type === 'required' && <p className="text-red-500">Email is Required</p>
          }
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
          <button className="btn btn-neutral mt-4">Login</button>

          <div className="divider">OR</div>

          {/* Google */}
          <button className="btn bg-white text-black border-[#e5e5e5]">
            <FcGoogle />
            Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
