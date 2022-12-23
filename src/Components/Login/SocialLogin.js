import React, { useEffect } from 'react';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.init';
import { useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Shared/Loading';
import useToken from '../../hooks/useToken';
import { toast } from "react-toastify";


const SocialLogin = ({ children }) => {

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    let errorElement;
    const [token] = useToken(googleUser, githubUser);
    if (googleUser || githubUser) {
        navigate(from, { replace: true })
    }
    if (googleLoading || githubLoading) {
        <Loading />
    }
    console.log(googleUser || githubLoading);
    useEffect(() => {
        if (token) {
            toast.success("Social Login successfull");
            navigate(from, { replace: true });
        }
    }, [token, from, navigate]);

    if (googleError || githubError) {
        errorElement = (
            <p className=" px-1 pb-2">
                <small className="text-red-500">{googleError?.message || githubError?.message}</small>
            </p>
        );
    }

    return (

        <div>
            <div className="divider my-2">OR</div>
            <button
                onClick={() => signInWithGoogle()}
                className="btn btn-outline border-green-600  w-full max-w-xs my-2">
                <div>
                    <img className='w-50 mx-2' src="https://i.ibb.co/JqhBJYJ/google.png" alt="" />
                    {children}
                    </div>
                Login with Google
            </button>
            {errorElement}
            <button
                onClick={() => signInWithGithub()}
                className="btn btn-outline border-green-600 w-full max-w-xs my-2">
                <div>
                    <img className='w-50 mx-2' src="https://i.ibb.co/3Wjh3wv/github.png" alt="" />
                    {children}
                </div>
                Login with Github
            </button>
        </div>
    );
};

export default SocialLogin;