import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SocialLogin from "../Components/Login/SocialLogin";
import Loading from "../Components/Shared/Loading";
import PageTitle from "../Components/Shared/PageTitle";
import auth from "../Firebase/firebase.init";
import useToken from "../hooks/useToken";

const LoginCopy = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  let errorElement;
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [token] = useToken(user);
  useEffect(() => {
    if (token) {
      toast.success("Welcome to our Website");
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  if (loading) {
    <Loading />;
  }
  if (error) {
    errorElement = (
      <p className="text-yellow-600">
        {" "}
        <small>{error?.message}</small>{" "}
      </p>
    );
  }
  const onSubmit = async (data) => {
    console.log(data);
    await signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="h-screen mt-12 py-12">
      <PageTitle title="Login"></PageTitle>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center border border-green-600 p-5 rounded shadow-lg">
          {/* info side */}
          <div className="w-96 bg-white px-4 py-2 border">
            <div className="w-full mb-4">
              <img
                src="https://i.ibb.co/dK4hBS7/app-login-security-4897468-4077880.webp"
                alt=""
              />
            </div>
            <div className="text-center border-2 border-green-600 rounded-lg">
              <h6 className="text-black font-semibold text-[16px] mb-0 pb-0 bg-green-600 ">
                Admin Login
              </h6>
              <div className="flex justify-center">
                <p className="mx-2 text-[16px]">
                  Email: <span className="text-blue-700">mna@admin.com</span>
                </p>
                <p className="text-[16px]">
                  Password: <span className="text-blue-700">Admin92</span>
                </p>
              </div>
            </div>
          </div>
          {/* login form side */}
          <div className="w-96 bg-white p-4">
            <div className="">
              <h2 className=" text-blue-600 text-4xl font-bold mb-2">Login</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="border border-black px-3 py-2 rounded flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-7 h-7 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="bg-white outline-none px-2 text-[17px]"
                    placeholder="Email"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Provide your email",
                      },
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: "Provide a valid Email",
                      },
                    })}
                  />
                </label>
                <label>
                  {errors.email?.type === "required" && (
                    <span className="label-text-alt text-red-700">
                      {errors.email.message}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="label-text-alt text-red-700">
                      {errors.email.message}
                    </span>
                  )}
                </label>
                {/* ========password field======== */}
                <label className="border border-black px-3 py-2 rounded flex items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-7 h-7 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    className="bg-white outline-none px-2 text-[17px]"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Provide your password",
                      },
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
                        message:
                          "Provide the 6 characters longer and Strong password",
                      },
                    })}
                  />
                </label>
                <label>
                  {errors.password?.type === "required" && (
                    <span className="label-text-alt text-red-700">
                      {errors.password.message}
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="label-text-alt text-red-700">
                      {errors.password.message}
                    </span>
                  )}
                </label>
                <div className="flex justify-between items-center p-0">
                  <div className="form-control">
                    <label className="p-0 label cursor-pointer">
                      <input type="checkbox" className="checkbox mr-2" />
                      <span className="text-[13px] text-slate-600">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center">
                    <button className="label-text-alt link link-hover hover:text-blue-600 text-slate-600">
                      Forgot Password ?
                    </button>
                  </div>
                </div>

                {/* <button className="text-[14px] text-blue-600 text-right">
              Forget Password?
            </button> */}
                {errorElement}

                <input
                  className="border shadow-lg bg-green-600 hover:bg-black py-[10px] rounded font-mono font-semibold w-full mt-4 mb-1 text-white hover:text-orange-500"
                  type="submit"
                  value="Login"
                />
              </form>
              <p className="text-center text-[13px]">
                New Here?{" "}
                <Link className="text-blue-500" to="/register">
                  Create account
                </Link>
              </p>
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCopy;
