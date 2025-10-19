import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import UseAuth from "../../../hooks/useAuth";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = UseAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const [profilePic, setProfilePic] = useState(' ')

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        // update user info in the database 

        // update user profile in firebase 
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        }
        updateUserProfile(userProfile).then(() => {
          console.log("profile name picture updated")
        }).catch(error => {
          console.log(error)
        })

        navigate(from);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const formdata = new FormData();
    formdata.append("image", image);



    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_KEY}`
    const res = await axios.post (imageUploadUrl, formdata)
    setProfilePic(res.data.data.url)
  };
  return (
    <div className="max-w-lg shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
          <div>
            <h1 className="text-4xl font-bold">Create an Account</h1>
            <p>Register with ProFast</p>
          </div>
          {/* Name field */}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input"
            placeholder="Name"
          />
          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}

          {/* Picture field */}
          <label className="label">Profile Picture</label>
          <input
            type="file"
            {...register("profile", {
              required: true,
              onChange: (e) => handleImageUpload(e), 
            })}
            className="input"
            placeholder="Your profile picture"
          />
          {errors.profile?.type === "required" && (
            <p className="text-red-500">Profile picture is required</p>
          )}

          {/* Email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* Password field */}
          <label className="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be at least 6 characters long
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
