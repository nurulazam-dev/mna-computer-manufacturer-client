import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { blogData } from "../../assets/data/AllData";

const Blog = () => {
  return (
    <section className="my-10 px-5 pt-8 container mx-auto ">
      <div className="mb-5">
        <h2 className="text-3xl text-center text-slate-50 font-bold">
          Our Latest Blogs
        </h2>
      </div>

      <div className="content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogData?.map((data) => (
          <div
            key={data?.id}
            className="h-[350px] lg:max-w-lg bg-slate-950 border rounded-lg shadow-xl"
          >
            <div className="">
              <div className="img">
                <img
                  src={data?.img}
                  alt=""
                  className="w-[420px] h-[220px] rounded-t-lg"
                />
              </div>
              <div className="p-5 pt-1">
                <div className="flex justify-between mb-2 text-[15px] text-slate-400">
                  <p>{data?.date}</p>
                  <div className="flex text-[15px]">
                    <i className="fas fa-user pt-1"></i>
                    <p className="ms-[6px]">ADMIN</p>
                  </div>
                </div>
                <div className="">
                  <h2 className="text-[18px] font-semibold">{data?.title}</h2>
                </div>
                <div className="my-1 flex justify-end items-center">
                  <button className="text-[13px] text-sky-500 hover:text-sky-400">
                    Read more...
                    <FontAwesomeIcon
                      className="ml-1"
                      icon={faArrowUpRightFromSquare}
                    ></FontAwesomeIcon>
                  </button>
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
