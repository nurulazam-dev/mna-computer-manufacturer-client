import React from "react";
import BarChart from "./AnalysisDashboard/BarChart";
import Calender from "./AnalysisDashboard/Calender";

const AnalysisDashboard = () => {
  return (
    <section className="mx-5 px-5 ">
      {/* ========calender & BarChart line========= */}
      <div className="lg:flex w-full">
        <div className="lg:w-1/3">
          <Calender />
        </div>
        <div className="lg:w-2/3 ">
          <BarChart />
        </div>
      </div>
    </section>
  );
};

export default AnalysisDashboard;
