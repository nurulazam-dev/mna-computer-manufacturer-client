import {
  faArrowRight,
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import SocialLogin from "../Components/Login/SocialLogin";
import PageTitle from "../Components/Shared/PageTitle";
import auth from "../Firebase/firebase.init";
import brandLogo from "../assets/mna-computer-manufacturer-logo.webp";
import useToken from "../hooks/useToken";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, {
      sendEmailVerification: true,
    });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  const [token] = useToken(user);

  let errorElement;

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      toast.success("User Registration Success");
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  if (error || updateError) {
    errorElement = (
      <p className="px-1 pb-2">
        <small className="text-red-400">
          {error?.message || updateError?.message}
        </small>
      </p>
    );
  }

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
    navigate(from, { replace: true });
  };

  console.log(user);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 mt-12 sm:px-6 lg:py-12">
      <PageTitle title="Register" />

      <div className="relative z-10 mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40">
        <div className="grid grid-cols-1 bg-gradient-to-r from-blue-600/10 via-slate-900 to-cyan-500/10 lg:grid-cols-2">
          {/* ====== Register Form ====== */}
          <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Register
                </h2>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* ======== Name Field ======== */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Full Name
                  </label>

                  <div
                    className={`flex items-center rounded border bg-slate-950 px-4 transition-all duration-300 ${
                      errors.name
                        ? "border-red-500"
                        : "border-slate-700 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-blue-500/10"
                    }`}
                  >
                    <FontAwesomeIcon icon={faUser} className="text-slate-500" />

                    <input
                      id="name"
                      type="text"
                      placeholder="Full Name"
                      autoComplete="name"
                      className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-slate-600"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Provide your name",
                        },
                      })}
                    />
                  </div>

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* ======== Email Field ======== */}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Email Address
                  </label>

                  <div
                    className={`flex items-center rounded border bg-slate-950 px-4 transition-all duration-300 ${
                      errors.email
                        ? "border-red-500"
                        : "border-slate-700 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-blue-500/10"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="text-slate-500"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="Email"
                      autoComplete="email"
                      className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-slate-600"
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
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* ======== Password Field ======== */}
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-300"
                  >
                    Password
                  </label>

                  <div
                    className={`flex items-center rounded border bg-slate-950 px-4 transition-all duration-300 ${
                      errors.password
                        ? "border-red-500"
                        : "border-slate-700 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-blue-500/10"
                    }`}
                  >
                    <FontAwesomeIcon icon={faLock} className="text-slate-500" />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-slate-600"
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

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="ml-2 text-slate-500 transition hover:text-blue-400"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-xs text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* ====Firebase Error==== */}
                {errorElement}

                <button
                  type="submit"
                  disabled={loading || updating}
                  className="group flex w-full items-center justify-center gap-3 rounded bg-sky-600 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading || updating ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Registering...
                    </>
                  ) : (
                    <>
                      Register
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  className="font-semibold text-blue-400 transition hover:text-blue-300"
                  to="/login"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

          {/* ====== Information Side ====== */}
          <div className="flex flex-col justify-center gap-5 border-t border-slate-800 bg-slate-950/40 p-6 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
            {/* Brand Logo */}
            <div className="hidden items-center justify-center lg:flex">
              <img
                src={brandLogo}
                alt=""
                className="w-[300px] object-contain"
              />
            </div>

            {/* <div className="hidden w-full items-center justify-center sm:flex">
              <img
                src="https://i.ibb.co/hVm1vHL/register-vector-2.jpg"
                alt=""
                className="w-full max-w-sm rounded-xl object-contain"
              />
            </div> */}

            {/* ====Social Login==== */}
            <div className="border-t border-slate-800 pt-5">
              <SocialLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
