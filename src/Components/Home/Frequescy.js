import React, { useState } from "react";
import { faqsData } from "../Shared/AllData";
import Accordion from "./Accordion";

const Frequency = () => {
  const [active, setActive] = useState(1);

  return (
    <section className="">
      <div className="text-center mb-2">
        <h2 className="text-4xl text-green-600 font-bold">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="lg:flex justify-around items-center">
        {/* video-frame part */}
        <div className="px-3">
          <iframe
            // className="video_frame"
            className="w-[99%] h-[190px] lg:w-[650px] lg:h-[380px]"
            src="https://www.youtube.com/embed/RZHDuzQHksM?si=yjHmBCLRV7gZqpGh"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        {/* FAQ part */}
        <div className="">
          {faqsData?.map((faq) => (
            <Accordion
              key={faq?.id}
              id={faq?.id}
              title={faq?.title}
              ans={faq?.ans}
              active={active}
              setActive={setActive}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Frequency;
