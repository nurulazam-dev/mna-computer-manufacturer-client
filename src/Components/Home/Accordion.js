import React from "react";
import "../../style/Accordion.css";

const Accordion = ({ id, title, ans, active, setActive }) => {
  return (
    <section className="">
      <div className="accordion">
        <div className="accordionHeading">
          <div className="containerBox">
            <p>{title}</p>
            <span onClick={() => setActive(id)}>
              {active === id ? "X" : "|||"}
            </span>
          </div>
        </div>
        <div className={(active === id ? "show" : "") + " accordionContent"}>
          <div className="containerBox">
            <p>{ans}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Accordion;
