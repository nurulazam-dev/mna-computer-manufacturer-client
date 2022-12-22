import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import SocialLogin from '../Components/Login/SocialLogin';
import auth from '../Firebase/firebase.init';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Loading from '../Components/Shared/Loading';
import useToken from '../hooks/useToken';
import { toast } from "react-toastify";

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth);
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
        <Loading />
    }
    if (error) {
        errorElement = <p className='text-yellow-600'> <small>{error?.message}</small> </p>
    }
    const onSubmit = async data => {
        console.log(data);
        await signInWithEmailAndPassword(data.email, data.password)
    }

    return (
        <div className='flex justify-center items-center h-screen mt-12'>
            <div className="mockup-phone border-primary">
                <div className="camera"></div>
                <div className="display">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">

                            <h2 className="text-center text-blue-600 text-4xl font-bold">Login</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control w-full max-w-xs my-3">
                                    <label className="input-group">
                                        <span>Email</span>
                                        <input type="email" placeholder="Email Address" className="input input-bordered w-full max-w-xs"
                                            {...register("email", {
                                                required: {
                                                    value: true,
                                                    message: 'Provide your email'
                                                },
                                                pattern: {
                                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                                    message: 'Provide a valid Email'
                                                }
                                            })} />
                                    </label>
                                    <label>
                                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-700">{errors.email.message}</span>}
                                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-700">{errors.email.message}</span>}
                                    </label>
                                </div>
                                <div className="form-control w-full max-w-xs mt-3">
                                    <label className="input-group">
                                        <span>Password</span>
                                        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs"
                                            {...register("password", {
                                                required: {
                                                    value: true,
                                                    message: 'Provide your password'
                                                },
                                                pattern: {
                                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,20}$/,
                                                    message: 'Provide the 6 characters longer and Strong password'
                                                }
                                            })} />
                                    </label>
                                    <label>
                                        {errors.password?.type === 'required' && <span className="label-text-alt text-red-700">{errors.password.message}</span>}
                                        {errors.password?.type === 'pattern' && <span className="label-text-alt text-red-700">{errors.password.message}</span>}
                                    </label>
                                </div>
                                <p>
                                    <button className='text-blue-600'><small>Forget Password?</small></button>
                                </p>
                                {errorElement}
                                <input className='btn w-full mt-5 max-w-xs text-white' type="submit" value='Login' />
                            </form>
                            <p className='text-center font-semibold'><small>Are you new ? <Link className='text-blue-500' to='/register'>Create An Account</Link> </small></p>
                            <SocialLogin />
                            <div className="text-center border-2 border-red-700 rounded-lg">
                                <p className="text-red-600 font-semibold mb-0 pb-0">Admin Login</p>
                                <small className="mx-2">Email: <span className="text-blue-700">mna@admin.com</span></small>
                                <small>Pass: <span className="text-blue-700">Admin92</span></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Login;