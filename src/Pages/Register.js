import React, { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../Firebase/firebase.init';
import useToken from '../hooks/useToken';
import Loading from '../Components/Shared/Loading';
import SocialLogin from '../Components/Login/SocialLogin';
import { toast } from "react-toastify";
import PageTitle from '../Components/Shared/PageTitle';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createUserWithEmailAndPassword, user, loading,error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    const [updateProfile, updating,updateError] = useUpdateProfile(auth);
    const [token]=useToken(user)
    let errorElement;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    useEffect(() => {
        if (token) {
          toast.success("User Registration Successfull");
          navigate(from, { replace: true });
        }
      }, [token, from, navigate]);

    if (loading || updating) {
        <Loading />
    }
    if (error || updateError ) {
        errorElement = (
          <p className=" px-1 pb-2">
            <small className="text-red-500">
              {error?.message || updateError?.message }
            </small>
          </p>
        );
      }
      const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        navigate(from, { replace: true })
    };
    console.log(user);


    return (
        <div className='flex justify-center items-center h-screen mt-12'>
            <PageTitle title='Register'></PageTitle>
            <div className="mockup-phone border-primary">
                <div className="camera"></div>
                <div className="display">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="text-center text-4xl text-blue-600 font-bold">Register</h2>
                            
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control w-full max-w-xs my-3">
                                    <label className="input-group">
                                        <span>Name</span>
                                        <input type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs"
                                            {...register("name", {
                                                required: {
                                                    value: true,
                                                    message: 'Provide your name'
                                                }
                                            })} />
                                    </label>
                                    <label>
                                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-700">{errors.name.message}</span>}
                                    </label>
                                </div>
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
                                <div className="form-control w-full max-w-xs my-3">
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
                                {errorElement}
                                <input className='btn w-full max-w-xs text-white' type="submit" value='Register' />
                            </form>
                            <p className='text-center font-semibold'><small>If you have an account ? <Link className='text-blue-600' to='/login'>Please Login</Link> </small></p>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;