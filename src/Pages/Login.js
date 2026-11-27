import { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  faShield,
  faUser,
  faEye,
  faEyeSlash,
  faEnvelope,
  faLock,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SocialLogin from "../Components/Login/SocialLogin";
import PageTitle from "../Components/Shared/PageTitle";
import auth from "../Firebase/firebase.init";
import useToken from "../hooks/useToken";
import brandLogo from "../assets/mna-computer-manufacturer-logo.webp";

const credentials = [
  {
    label: "Admin",
    email: "admin@computermanufacturer.com",
    pass: "Admin123",
    icon: faShield,
    description: "Full administrative access",
  },
  {
    label: "User",
    email: "user@computermanufacturer.com",
    pass: "User123",
    icon: faUser,
    description: "Standard user access",
  },
];

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [token] = useToken(user);

  useEffect(() => {
    if (token) {
      toast.success("Welcome to our Website");
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  const fillCredentials = (email, pass) => {
    setValue("email", email, { shouldValidate: true });
    setValue("password", pass, { shouldValidate: true });

    toast.info("Test credentials filled successfully");
  };

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(data.email.trim(), data.password);
    } catch (err) {
      toast.error(err.message || "Unable to login");
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10 mt-12 sm:px-6 lg:py-12">
      <PageTitle title="Login" />

      <div className="relative z-10 mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-r from-blue-600/10 via-slate-900 to-cyan-500/10">
          {/* ======Login Form======= */}
          <div className="flex items-center justify-center px-6 sm:px-10 lg:px-12">
            <div className="w-full max-w-md">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Login to Your Account
                </h2>

                <p className="mt-2 text-sm text-slate-400">
                  Enter your credentials to access your account.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
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
                      placeholder="Enter your email"
                      autoComplete="email"
                      className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-slate-600"
                      {...register("email", {
                        required: "Please provide your email",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please provide a valid email",
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
                      autoComplete="current-password"
                      className="w-full bg-transparent px-3 py-4 text-sm text-white outline-none placeholder:text-slate-600"
                      {...register("password", {
                        required: "Please provide your password",
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
                    <p className="mt-2 text-xs text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="mb-5 flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium text-blue-400 transition hover:text-blue-300"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {error && (
                  <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                    <p className="text-sm text-red-400">{error.message}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded bg-sky-600 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-500 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-5 border-t border-slate-800 bg-slate-950/40 p-6 sm:p-10 lg:border-l-0 lg:border-t-0 lg:p-12">
            <div className="lg:flex justify-center items-center hidden ">
              <img src={brandLogo} alt="" className="w-[300px]" />
            </div>
            <div>
              <SocialLogin />
            </div>

            <div className="border-t border-slate-800 pt-3">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-white">
                  Quick Test Access
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Select an account to auto-fill your credentials.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {credentials.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => fillCredentials(item.email, item.pass)}
                    className="group flex items-center gap-3 rounded border border-slate-700 bg-slate-900 px-3 py-2 text-left transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600/10"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/15 text-blue-400 transition group-hover:bg-blue-600 group-hover:text-white">
                      <FontAwesomeIcon icon={item.icon} />
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-bold text-white">{item.label}</h4>

                      <p className="mt-1 truncate text-[11px] text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
