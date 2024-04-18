import React, { useEffect } from "react";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../Firebase/firebase.init";
import useToken from "../../hooks/useToken";
import Loading from "../Shared/Loading";

const SocialLogin = ({ children }) => {
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);
  const [signInWithGithub, githubUser, githubLoading, githubError] =
    useSignInWithGithub(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  let errorElement;
  const [token] = useToken(googleUser, githubUser);
  if (googleUser || githubUser) {
    navigate(from, { replace: true });
  }
  if (googleLoading || githubLoading) {
    <Loading />;
  }
  console.log(googleUser || githubLoading);
  useEffect(() => {
    if (token) {
      toast.success("Social Login successful");
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  if (googleError || githubError) {
    errorElement = (
      <p className=" px-1 pb-2">
        <small className="text-red-500">
          {googleError?.message || githubError?.message}
        </small>
      </p>
    );
  }

  return (
    <div>
      <div className="divider my-2 text-[14px] text-slate-400">
        Or Sign Up With
      </div>
      <div className="flex justify-center gap-3 w-full">
        <button
          onClick={() => signInWithGoogle()}
          className="btn btn-outline border-green-600 rounded-xl w-1/2 hover:bg-orange-500 hover:border-black"
        >
          <img
            className="w-50 h-50"
            src="https://i.ibb.co/JqhBJYJ/google.png"
            alt=""
          />
          {children}
        </button>
        {errorElement}
        <button
          onClick={() => signInWithGithub()}
          className="btn btn-outline border-green-600 rounded-xl w-1/2 hover:bg-orange-500 hover:border-black"
        >
          <img
            className="w-50 h-50"
            src="https://i.ibb.co/3Wjh3wv/github.png"
            alt=""
          />
          {children}
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
