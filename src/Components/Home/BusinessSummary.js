import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { summaryData } from "../Shared/AllData";

const BusinessSummary = () => {
  const [counterState, setCounterState] = useState(false);

  return (
    <section className="my-8">
      <ScrollTrigger
        onEnter={() => setCounterState(true)}
        onExit={() => setCounterState(false)}
      >
        <div className="mb-5">
          <h2 className="text-4xl text-center text-green-600 font-bold">
            Our Company's
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mx-8 py-3 ">
          {summaryData.map((data) => (
            <div key={data.id} className="bg-slate-100 py-3 rounded shadow-lg">
              <div className="w-full flex justify-center mb-2 ">
                <FontAwesomeIcon
                  icon={data?.icon}
                  className="text-[50px] text-black"
                />
              </div>
              <div className="text-center">
                <h2 className="lg:text-4xl md:text-3xl text-2xl text-blue-600 font-bold">
                  {counterState && (
                    <CountUp start={0} end={data.count} duration={2.75} />
                  )}{" "}
                  +{/* {data.count} + */}
                </h2>

                <h3 className="lg:text-2xl text-xl font-semibold mt-[2px] ">
                  {data.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </ScrollTrigger>
    </section>
  );
};

export default BusinessSummary;
