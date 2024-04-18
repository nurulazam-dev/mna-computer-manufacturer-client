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

const Login = () => {
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
    <div className="flex justify-center items-center h-screen mt-12">
      <PageTitle title="Login"></PageTitle>
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-blue-600 text-4xl font-bold">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="border border-black px-3 py-2 rounded flex items-center mb-3">
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
            <label className="border border-black px-3 py-2 rounded flex items-center mb-3">
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
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
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
            <p>
              <button className="text-blue-600">
                <small>Forget Password?</small>
              </button>
            </p>
            {errorElement}

            <input
              className="btn w-full mt-5 max-w-xs text-white"
              type="submit"
              value="Login"
            />
          </form>
          <p className="text-center font-semibold">
            <small>
              Are you new ?{" "}
              <Link className="text-blue-500" to="/register">
                Create An Account
              </Link>{" "}
            </small>
          </p>
          <SocialLogin />
          <div className="text-center border-2 border-red-700 rounded-lg">
            <p className="text-red-600 font-semibold mb-0 pb-0">Admin Login</p>
            <small className="mx-2">
              Email: <span className="text-blue-700">mna@admin.com</span>
            </small>
            <small>
              Pass: <span className="text-blue-700">Admin92</span>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
