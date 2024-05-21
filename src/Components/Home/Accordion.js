import React from "react";
import "../../style/Accordion.css";

const Accordion = ({ id, title, ans, active, setActive }) => {
  return (
    <section className="my-5 px-2">
      <div className="flex items-center justify-between bg-[#090216] p-[14px] text-white">
        <div className="w-[100%] max-w-[530px] m-auto px-[10px] flex items-center justify-between">
          <p className="text-[15px] lg:text-[18px] pr-2">{title}</p>
          <span className="cursor-pointer" onClick={() => setActive(id)}>
            {active === id ? "X" : "|||"}
          </span>
        </div>
      </div>
      <div className={(active === id ? "show" : "") + " accordionContent"}>
        <div className="w-[100%] max-w-[530px] m-auto px-[10px] flex items-center justify-between">
          <p className="text-[13px] lg:text-[15px] leading-6">{ans}</p>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
