import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { summaryData } from "../Shared/AllData";

const BusinessSummary = () => {
  return (
    <section className="my-8">
      <div className="mb-5">
        <h2 className="text-4xl text-center text-orange-500 font-bold">
          Business Summary
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-8 bg-slate-100 py-3 rounded shadow-lg">
        {summaryData.map((data) => (
          <div key={data.id} className="">
            <div className="w-full flex justify-center mb-2 ">
              <FontAwesomeIcon
                icon={data?.icon}
                className="text-[50px] text-black"
              />
            </div>
            <div className="text-center">
              <h2 className="lg:text-3xl md:text-2xl text-xl text-blue-600 font-bold">
                {data.count} +
              </h2>

              <h3 className="lg:text-2xl md:text-xl text-[17px] font-semibold mt-[2px] ">
                {data.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessSummary;
