import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../Components/Shared/Loading";
import { LOCAL_BASE_URL } from "../../config";

const AddAProduct = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { isLoading } = useQuery("products", () => {
    fetch(`${LOCAL_BASE_URL}/products`).then((res) => res.json());
  });

  const imgStorageKey = process.env.REACT_APP_IMGSTORE_API;

  const onSubmit = async (data) => {
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
          const product = {
            name: data.name,
            description: data.description,
            minOrderQuantity: data.minOrderQuantity,
            availQuantity: data.availQuantity,
            price: data.price,
            img: img,
          };
          // send data to database
          fetch(`${LOCAL_BASE_URL}/products`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(product),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success("Product added successfully");
                reset();
              } else {
                toast.error("Product added fail. Please try again");
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
          Add A Product
        </h2>
      </div>
      <div className="px-4 py-2">
        {/* form part */}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <form> */}
          {/* ===================================
                          1st line
        =================================== */}
          <div className="lg:flex md:flex justify-evenly w-full gap-3">
            {/* Product Name field */}
            <div className="form-control ld:w-2/3 md:w-3/4 w-full">
              <label className="label p-0">
                <span className="text-[18px] mb-[2px]">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="bg-white input text-[16px] border border-black w-full "
                {...register("name", {
                  required: {
                    value: true,
                    message: "Provide the product name",
                  },
                })}
              />
              <label className="label">
                {errors.name?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </label>
            </div>
            {/* Product img field */}
            <div className="form-control ld:w-1/3 md:w-1/4 w-full">
              <label className="label p-0">
                <span className="text-[18px] mb-[2px]">Product Image</span>
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
                  {...register("img", {
                    required: {
                      value: true,
                      message: "Product Image is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.img?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.img.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
          {/* ===================================
                          2nd line
        =================================== */}
          <div className="lg:flex md:flex justify-evenly gap-3 mb-2">
            {/* Price field */}
            <div className="form-control w-full">
              <label className="label p-0">
                <span className="text-[18px] mb-[2px]">Price</span>
              </label>
              <input
                type="number"
                placeholder="Per Unit Product Price"
                className="bg-white input text-[16px] border border-black w-full "
                {...register("price", {
                  required: {
                    value: true,
                    message: "Provide the Per Unit Product Price",
                  },
                })}
              />
              <label>
                {errors.price?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.price.message}
                  </span>
                )}
              </label>
            </div>
            {/* available field */}
            <div className="form-control w-full">
              <label className="label p-0">
                <span className="text-[18px] mb-[2px]">Available Product</span>
              </label>
              <input
                type="number"
                placeholder="Available Product"
                className="bg-white input text-[16px] border border-black w-full"
                {...register("availQuantity", {
                  required: {
                    value: true,
                    message: "Provide Available Product Quantity",
                  },
                })}
              />
              <label>
                {errors.availQuantity?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.availQuantity.message}
                  </span>
                )}
              </label>
            </div>
            {/* Minimum Order field */}
            <div className="form-control w-full">
              <label className="label p-0">
                <span className="text-[18px] mb-[2px]">Minimum Order</span>
              </label>
              <input
                type="number"
                placeholder="Minimum Order Quantity"
                className="bg-white input text-[16px] border border-black w-full"
                {...register("minOrderQuantity", {
                  required: {
                    value: true,
                    message: "Provide the Minimum Product order number",
                  },
                })}
              />
              <label>
                {errors.minOrderQuantity?.type === "required" && (
                  <span className="label-text-alt text-red-700">
                    {errors.minOrderQuantity.message}
                  </span>
                )}
              </label>
            </div>
          </div>
          {/* ===================================
                          3rd line
        =================================== */}
          {/* description */}
          <div className="w-full">
            <label className="label p-0">
              <span className="text-[18px] mb-[2px]">Description</span>
            </label>
            <textarea
              type="text"
              className="bg-white text-[16px] border border-black w-full p-4 rounded"
              placeholder="Product Description"
              rows={4}
              {...register("description", {
                required: {
                  value: true,
                  message: "Provide Product Description",
                },
              })}
            ></textarea>
            <label className="label">
              {errors.description?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.description.message}
                </span>
              )}
            </label>

            <div className="flex justify-center items-center">
              <div className="w-64">
                <input
                  className="btn bg-blue-600 text-white border-blue-900 w-full hover:text-orange-500 lg:mt-0 mt-2"
                  type="submit"
                  value="Add Product"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddAProduct;
