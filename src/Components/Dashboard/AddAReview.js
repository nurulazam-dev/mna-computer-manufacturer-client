import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../Firebase/firebase.init";
import Loading from "../Shared/Loading";
import { LOCAL_BASE_URL } from "../../config";

const AddAReview = () => {
  const [user] = useAuthState(auth);
  const value = {
    defaultValues: {
      name: user?.name,
    },
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ value });

  const { isLoading } = useQuery("reviews", () => {
    fetch(`${LOCAL_BASE_URL}/reviews`).then((res) => res.json());
  });

  const imgStorageKey = "b81832e42347a65fbc19c2064f308dd5";

  const onSubmit = async (data, user) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const reviewData = {
            name: data.name,
            ratings: data.ratings,
            review: data.review,
            img: img,
          };
          // send data to database
          fetch(`${LOCAL_BASE_URL}/reviews`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(reviewData),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success("Review added successfully");
                reset();
              } else {
                toast.error("Review added fail. Please try again");
              }
            });
        }
      });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="border border-green-600 rounded mx-4">
      <div className="bg-green-600">
        <h2 className="text-white text-center p-1 text-2xl font-semibold">
          Add A Review
        </h2>
      </div>
      <div className="p-4">
        {/* form part */}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* inputs body */}
          {/* 1st line */}
          <div className="lg:flex md:flex justify-evenly gap-3">
            {/* Name field */}
            <div className="form-control w-full">
              <label className="label p-0">
                <span className="text-[18px] mb-[2px]">Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="bg-white input text-[16px] border border-black w-full "
                {...register("name", {
                  required: {
                    value: true,
                    message: "Provide your Name",
                  },
                })}
              />
              <label>
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            <div className="flex w-full gap-3">
              {/* Ratings field */}
              <div className="form-control w-full">
                <label className="label p-0">
                  <span className="text-[18px] mb-[2px]">Ratings</span>
                </label>
                <input
                  type="number"
                  placeholder="Ratings"
                  className="bg-white input text-[16px] border border-black w-full"
                  {...register("ratings", {
                    required: {
                      value: true,
                      message: "Provide your Ratings",
                    },
                    pattern: {
                      value: /[1-5]{1}/,
                      message: "Provide the Rating Number Between 1 to 5",
                    },
                  })}
                />
                <label>
                  {errors.ratings?.type === "required" && (
                    <span className="label-text-alt text-red-700">
                      {errors.ratings.message}
                    </span>
                  )}
                  {errors.ratings?.type === "pattern" && (
                    <span className="label-text-alt text-red-700">
                      {errors.ratings.message}
                    </span>
                  )}
                </label>
              </div>
              {/* img field */}
              <div className="form-control w-full">
                <label className="label p-0">
                  <span className="text-[18px] mb-[2px]">User Image</span>
                </label>
                <div className="form-control">
                  <label htmlFor="image" className="btn btn-outline btn-accent">
                    Upload Image
                  </label>
                  <input
                    type="file"
                    name=""
                    id="image"
                    className=" input-bordered hidden"
                    {...register("image", {
                      required: {
                        value: true,
                        message: "User's profile Image is Required",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.image?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.image.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <label className="label p-0">
              <span className="text-[18px] mb-[2px]">Review</span>
            </label>
            <textarea
              type="number"
              className="bg-white text-[16px] border border-black w-full p-4 rounded"
              placeholder="Your message"
              rows={4}
              {...register("review", {
                required: {
                  value: true,
                  message: "Provide your Review description",
                },
              })}
            ></textarea>
            <label>
              {errors.review?.type === "required" && (
                <span className="label-text-alt text-red-700">
                  {errors.review.message}
                </span>
              )}
            </label>
            <div className="flex justify-center items-center">
              <div className="w-64">
                <input
                  className="btn bg-blue-600 text-white border-blue-900 w-full hover:text-orange-500 lg:mt-0 mt-2"
                  type="submit"
                  value="Review Submit"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddAReview;
