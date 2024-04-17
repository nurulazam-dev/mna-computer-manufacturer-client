import React from "react";
import { blogData } from "../Shared/Datas";

const Blog = () => {
  return (
    <section className="my-10 px-5 pt-8 container mx-auto ">
      <div className="mb-5">
        <h2 className="text-3xl text-center text-orange-500 font-bold">
          Our Latest Blogs
        </h2>
      </div>

      <div className="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogData?.map((data) => (
          <div
            key={data?.id}
            className="h-[340px] lg:max-w-lg bg-white border rounded-none shadow-xl"
          >
            <div className="">
              <div className="img">
                <img src={data?.img} alt="" className="w-[420px] h-[220px]" />
              </div>
              <div className="p-5 pt-0">
                <div className="flex justify-between mb-2 text-[16px] text-[#3c3e41]">
                  <p>{data?.date}</p>
                  <div className="flex text-[16px]">
                    <i className="fas fa-user pt-1"></i>
                    <p className="ms-[6px]">Admin</p>
                  </div>
                </div>
                <div className="">
                  <h2 className="text-[18px] font-semibold">{data?.title}</h2>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
