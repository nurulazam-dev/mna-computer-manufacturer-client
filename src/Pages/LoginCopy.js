import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SocialLogin from "../Components/Login/SocialLogin";
import Loading from "../Components/Shared/Loading";
import PageTitle from "../Components/Shared/PageTitle";
import auth from "../Firebase/firebase.init";
import brandLogo from "../assets/brandLogo.png";
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
      <PageTitle title="Register"></PageTitle>
      <div className="flex justify-center items-center">
        <div className="lg:flex justify-center items-center border border-green-600 p-5 rounded shadow-lg">
          {/* info side */}
          <div className="hidden lg:block w-96 bg-white px-4 py-2">
            <div className="flex justify-center items-center mb-6">
              <img src={brandLogo} alt="" className="w-[200px]" />
            </div>
            <div className="w-full">
              <img
                src="https://i.ibb.co/hVm1vHL/register-vector-2.jpg"
                alt=""
              />
            </div>
          </div>
          {/* divider */}
          <div className="hidden lg:block border w-[1px] mx-2 h-[400px]"></div>
          {/* Register form side */}
          <div className="w-96 bg-white px-4">
            <div className="">
              <h2 className=" text-blue-600 text-4xl font-bold mb-4">
                Register
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* ========name field======== */}
                <label className="border border-black px-3 py-2 rounded flex items-center mb-4">
                  <FontAwesomeIcon
                    className="w-6 h-6 opacity-60 mr-2"
                    icon={faUser}
                  />
                  <input
                    type="text"
                    className="bg-white outline-none text-black px-2 text-[17px]"
                    placeholder="Full Name"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Provide your name",
                      },
                    })}
                  />
                </label>
                <label>
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-700">
                      {errors.name.message}
                    </span>
                  )}
                </label>
                {/* ========email field======== */}
                <label className="border border-black px-3 py-2 rounded flex items-center mb-4">
                  <FontAwesomeIcon
                    className="w-6 h-6 opacity-60 mr-2"
                    icon={faEnvelope}
                  />
                  <input
                    type="email"
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
                  <FontAwesomeIcon
                    className="w-6 h-6 opacity-60 mr-2"
                    icon={faKey}
                  />
                  <input
                    type="password"
                    placeholder="Password"
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
                {errorElement}

                <input
                  className="border shadow-lg bg-green-600 hover:bg-black py-[10px] rounded font-semibold w-full mt-4 mb-1 text-white hover:text-orange-500"
                  type="submit"
                  value="Register"
                />
              </form>
              <p className="text-center text-[13px]">
                Already have an account?{" "}
                <Link className="text-blue-500" to="/login">
                  Log in
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
