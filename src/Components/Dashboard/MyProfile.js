import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../Firebase/firebase.init";
import Loading from "../Shared/Loading";

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

  const { education, address, contact, portfolio, linkedIn } =
    currentUser || "";

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
    <section className="border border-green-600 rounded">
      {/* ===================================
                      My profile section
            ==================================== */}
      <div className="bg-green-600">
        <h2 className="text-white text-center p-1 text-2xl font-semibold">
          My Profile
        </h2>
      </div>
      <div className="lg:flex px-3">
        {user && (
          <div className="lg:w-[350px] pt-1">
            {photoURL ? (
              <div className="avatar card items-center w-full justify-center">
                <div className="w-40 rounded mr-2">
                  <img src={photoURL} alt="User Avatar" />
                </div>
                <h3>{displayName}</h3>
              </div>
            ) : (
              <div className="avatar card items-center w-full justify-center">
                <div className="w-36 rounded ring ring-primary ring-offset-base-100 ring-offset-2 m-2">
                  <FontAwesomeIcon
                    className="pt-2 mx-26 text-[8em]"
                    icon={faUser}
                  ></FontAwesomeIcon>
                </div>
                <h3 className="text-xl font-semibold mt-2">{displayName}</h3>
              </div>
            )}
          </div>
        )}
        {/* form fields part */}
        <div className="w-full px-2">
          {/* 1st line */}
          <div className="lg:flex md:flex justify-evenly gap-3">
            <div className="form-control w-full my-3">
              <label className="flex w-full border items-center py-2 rounded">
                <span className="px-2 border-r-2 text-[18px]">Email</span>
                <input
                  type="email"
                  value={email}
                  name="email"
                  className="bg-white px-4 text-[16px] input-bordered w-full"
                  disabled
                />
              </label>
            </div>
            {/* contact field */}
            <div className="form-control w-full my-3">
              <label className="flex w-full border items-center py-2 rounded">
                <span className="px-2 border-r-2 text-[18px]">Contact</span>
                <input
                  type="number"
                  value={contact ? contact : "Not Updated"}
                  className="bg-white px-4 text-[16px] input-bordered w-full"
                  disabled
                />
              </label>
            </div>
          </div>
          {/* 2nd line */}
          <div className="lg:flex md:flex justify-evenly gap-3">
            {/* education field */}
            <div className="form-control w-full my-3">
              <label className="flex w-full border items-center py-2 rounded">
                <span className="px-2 border-r-2 text-[18px]">Education</span>
                <input
                  type="text"
                  value={education ? education : "Not Updated"}
                  className="bg-white px-4 text-[16px] input-bordered w-full"
                  disabled
                />
              </label>
            </div>
            {/* location field */}
            <div className="form-control w-full my-3">
              <label className="flex w-full border items-center py-2 rounded">
                <span className="px-2 border-r-2 text-[18px]">Address</span>
                <input
                  type="text"
                  value={address ? address : "Not Updated"}
                  className="bg-white px-4 text-[16px] input-bordered w-full"
                  disabled
                />
              </label>
            </div>
          </div>
          {/* 3rd line */}
          <div className="lg:flex md:flex justify-evenly gap-3">
            {/* Portfolio field */}
            <div className="form-control w-full my-3">
              <label className="flex w-full border items-center py-2 rounded">
                <span className="px-2 border-r-2 text-[18px]">Portfolio</span>
                <input
                  type="text"
                  value={portfolio ? portfolio : "Not Updated"}
                  className="bg-white px-4 text-[16px] input-bordered w-full"
                  disabled
                />
              </label>
            </div>

            {/* linkedIn field */}
            <div className="form-control w-full my-3">
              <label className="flex w-full border items-center py-2 rounded">
                <span className="px-2 border-r-2 text-[18px]">LinkedIn</span>
                <input
                  type="text"
                  value={linkedIn ? linkedIn : "Not Updated"}
                  className="bg-white px-4 text-[16px] input-bordered w-full"
                  disabled
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* ===================================
                      Update profile section
            ==================================== */}
      <div className="shadow-xl">
        <div className="bg-green-600">
          <h2 className="text-white text-center p-1 text-2xl font-semibold">
            Profile Update
          </h2>
        </div>
        <div className="p-3 pt-2">
          <form onSubmit={handleSubmit}>
            {/* 1st line */}
            <div className="lg:flex md:flex justify-evenly gap-3 mb-3">
              {/* Contact field */}
              <div className="form-control w-full">
                <label className="label p-0">
                  <span className="text-[18px] mb-[2px]">Contact</span>
                </label>
                <input
                  type="number"
                  name="contact"
                  required
                  placeholder="Provide your Contact Number"
                  className="bg-white input text-[16px] border border-black w-full "
                  defaultValue={contact}
                />
              </div>
              {/* education field */}
              <div className="form-control w-full">
                <label className="label p-0">
                  <span className="text-[18px] mb-[2px]">Education</span>
                </label>
                <input
                  type="text"
                  placeholder="Educational Qualification"
                  name="education"
                  required
                  className="bg-white input text-[16px] border border-black w-full"
                  defaultValue={education}
                />
              </div>
              {/* location field */}
              <div className="form-control w-full">
                <label className="label p-0">
                  <span className="text-[18px] mb-[2px]">Address</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Your Address"
                  required
                  className="bg-white input text-[16px] border border-black w-full"
                  defaultValue={address}
                />
              </div>
            </div>
            {/* 2nd line */}
            <div className="lg:flex md:flex justify-between items-end gap-3">
              <div className="lg:w-2/3 lg:flex md:flex gap-3">
                {/* Portfolio field */}
                <div className="form-control w-full">
                  <label className="label p-0">
                    <span className="text-[18px] mb-[2px]">Portfolio</span>
                  </label>
                  <input
                    type="text"
                    name="portfolio"
                    placeholder="Portfolio Website Link"
                    required
                    className="bg-white input text-[16px] border border-black w-full"
                    defaultValue={portfolio}
                  />
                </div>
                {/* linkedIn field */}
                <div className="form-control w-full">
                  <label className="label p-0">
                    <span className="text-[18px] mb-[2px]">LinkedIn</span>
                  </label>
                  <input
                    type="text"
                    name="linkedIn"
                    placeholder="LinkedIn Account Link"
                    required
                    className="bg-white input text-[16px] border border-black w-full"
                    defaultValue={linkedIn}
                  />
                </div>
              </div>

              <input
                type="submit"
                className="btn bg-blue-600 text-white border-blue-900 w-full lg:w-[200px] hover:text-orange-500 lg:mt-0 mt-2"
                value="Update"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
