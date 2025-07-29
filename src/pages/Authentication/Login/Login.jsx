import React from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {register, handleSubmit, formState: {errors}} = useForm()

  const onSubmit = (data) => {
    console.log(data);
  }
   
  return (
    <div className="max-w-lg shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          {/* email  */}
          <label className="label">Email</label>
          <input type="email" {...register('email')} className="input" placeholder="Email" />
          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password',  {required:true, minLength:6})} className="input" placeholder="Password" />

          {
            errors.password?.type === "required" && <p className="text-red-500"> password is required</p>
          }
          {
            errors.password?.type === "minLength" && <p className="text-red-500">password must be 6 charecter oo longer</p>
          }
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
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

export default Login;
