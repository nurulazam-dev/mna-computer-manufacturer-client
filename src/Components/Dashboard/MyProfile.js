import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.init';
import Loading from '../Shared/Loading';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const { email, displayName, photoURL } = user;

    const {
        data: currentUser,
        isLoading,
        refetch,
    } = useQuery(["user", email], () =>
        fetch(`https://mna-computer-manufacturer.onrender.com/users/${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => res.json())
    );

    if (isLoading) {
        return <Loading></Loading>;
    }

    const { education, address, contact, portfolio, linkedIn } = currentUser || "";

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedUser = {
            education: event.target.education.value,
            address: event.target.address.value,
            contact: event.target.contact.value,
            linkedIn: event.target.linkedIn.value,
            portfolio: event.target.portfolio.value,
        };

        fetch(`https://mna-computer-manufacturer.onrender.com/users/${email}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(updatedUser),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    toast.success("Your profile has been updated successfully");
                } else {
                    toast.error("We are sorry. Some error occurred. Please try again");
                }
                console.log(data);
                refetch();
            });
    };

    return (
        <>
            <div className='flex justify-center'>
                {/* ===================================
            My Profile Section/Card
            ==================================== */}
                <div className="card w-2/5 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className='text-center text-fuchsia-600 text-4xl font-semibold'>My Profile</h2>
                        {
                            user && <>
                                {photoURL ? (<div className="avatar card items-center w-full justify-center">
                                    <div className="w-22 rounded mr-2">
                                        <img src={photoURL} alt="User Avatar" />
                                    </div>
                                    <h3 >{displayName}</h3>
                                </div>) : (<div class="avatar card items-center w-full justify-center">
                                    <div className="w-22 rounded ring ring-primary ring-offset-base-100 ring-offset-2 m-2">
                                        <FontAwesomeIcon className="pt-2 mx-2" icon={faUser} size="4x"></FontAwesomeIcon>
                                    </div>
                                    <h3 className="text-2xl font-semibold">{displayName}</h3>
                                </div>)}
                            </>
                        }

                        <div>
                            <div className="form-control w-full my-3">
                                <label className="input-group">
                                    <span>Email</span>
                                    <input type="email" value={email} name='email' className="input text-xl input-bordered w-full" disabled />
                                </label>
                            </div>
                            {/* contact field */}
                            <div className="form-control w-full my-3">
                                <label className="input-group">
                                    <span>Contact</span>
                                    <input type="number" value={contact ? contact : "Your contact wasn't updated"} className="input text-xl input-bordered w-full" disabled />
                                </label>
                            </div>
                            {/* education field */}
                            <div className="form-control w-full my-3">
                                <label className="input-group">
                                    <span>Education</span>
                                    <input type="text" value={education ? education : "Your education wasn't updated"} className="input text-xl input-bordered w-full" disabled />
                                </label>
                            </div>
                            {/* location field */}
                            <div className="form-control w-full my-3">
                                <label className="input-group">
                                    <span>Address</span>
                                    <input type="text" value={address ? address : "Your address wasn't updated"} className="input text-xl input-bordered w-full " disabled />
                                </label>
                            </div>
                            {/* Portfolio field */}
                            <div className="form-control w-full my-3">
                                <label className="input-group">
                                    <span>Portfolio</span>
                                    <input type="text" value={portfolio ? portfolio : "Your portfolio link wasn't updated"} className="input text-xl input-bordered w-full " disabled />
                                </label>
                            </div>

                            {/* linkedIn field */}
                            <div className="form-control w-full my-3">
                                <label className="input-group">
                                    <span>LinkedIn</span>
                                    <input type="text" value={linkedIn ? linkedIn : "Your linkedIn link wasn't updated"} className="input text-xl input-bordered w-full " disabled />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ===================================
            Update profile section/card
            ==================================== */}
                <div className="card w-2/6 bg-base-100 shadow-xl mx-7">
                    <div className="card-body">
                        <h2 className='text-center text-orange-500 text-4xl font-semibold'>Profile Update</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-control w-full  my-2">
                                <label className="label">
                                    <span className="label-text text-xl">Contact</span>
                                </label>
                                <input type="number" name="contact" placeholder="Provide your Contact Number" className="input text-xl input-bordered w-full " defaultValue={contact} />
                            </div>
                            {/* education field */}
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text text-xl">Education</span>
                                </label>
                                <input type="text" placeholder="Educational Qualification" name='education' className="input text-xl input-bordered w-full" defaultValue={education} />
                            </div>
                            {/* location field */}
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text text-xl">Address</span>
                                </label>
                                <input type="text" name='address' placeholder="Your Address" className="input text-xl input-bordered w-full" defaultValue={address} />
                            </div>
                            {/* Portfolio field */}
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text text-xl">Portfolio</span>
                                </label>
                                <input type="text" name='portfolio' placeholder="Portfolio Website Link" className="input text-xl input-bordered w-full" defaultValue={portfolio} />
                            </div>
                            {/* linkedIn field */}
                            <div className="form-control w-full my-2">
                                <label className="label">
                                    <span className="label-text text-xl">LinkedIn</span>
                                </label>
                                <input type="text" name='linkedIn' placeholder="LinkedIn Account Link" className="input text-xl input-bordered w-full" defaultValue={linkedIn} />
                            </div>
                            <input type='submit' className='btn my-2 text-white btn-active w-full' value='Update' />

                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;