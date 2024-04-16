import {
  faQuoteRight,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useQuery } from "react-query";
import { FreeMode, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../Shared/Loading";

const Review = () => {
  const { data: reviews, isLoading } = useQuery("reviews", () =>
    fetch("https://mna-computer-manufacturer.onrender.com/reviews").then(
      (res) => res.json()
    )
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <section className="my-8 mx-2">
      <div className="mb-2">
        <h2 className="text-4xl text-center text-orange-500 font-bold">
          Reviews
        </h2>
      </div>
      {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-8'> */}
      <Swiper
        navigation={true}
        pagination={true}
        freeMode={true}
        grabCursor={true}
        modules={[FreeMode, Pagination, Navigation]}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        <div>
          {reviews?.map((review) => (
            <SwiperSlide key={review._id} className="pb-5 px-10 lg:px-4">
              <div className="card h-80 max-w-md lg:max-w-lg my-5 bg-white shadow-xl">
                <div className="flex justify-between px-5 items-center my-2">
                  <div className="avatar">
                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={review.img} alt="" />
                    </div>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faQuoteRight}
                      className="text-[120px] opacity-10"
                    />
                  </div>
                </div>
                <div className="mx-3 pb-3 text-[16px]">
                  <h2 className="text-xl mx-2 font-semibold text-violet-500">
                    {review.name}
                  </h2>

                  <p className="mb-2">
                    <span className="mx-2">Ratings:</span>
                    <small className="text-yellow-500">
                      <FontAwesomeIcon
                        className="icon"
                        icon={faStarHalfStroke}
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        className="icon"
                        icon={faStarHalfStroke}
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        className="icon"
                        icon={faStarHalfStroke}
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        className="icon"
                        icon={faStarHalfStroke}
                      ></FontAwesomeIcon>
                      <FontAwesomeIcon
                        className="icon"
                        icon={faStarHalfStroke}
                      ></FontAwesomeIcon>
                    </small>
                    <span className="mx-2 text-blue-500">
                      {review.ratings} stars
                    </span>
                  </p>
                  <hr />
                  <p className="mx-2 pt-2">
                    {review.review.slice(0, 125)}
                    <span className="font-bold">...</span>{" "}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </section>
  );
};

export default Review;
