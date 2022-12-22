import React from 'react';
import '../../style/Accordion.css';

const Accordion = ({ title, active, setActive }) => {

    return (
        <section className=''>

            {/* ==================== */}
            <div className="accordion">
                <div className="accordionHeading">
                    <div className="containerBox">
                        <p>{title}</p>
                        <span onClick={() => setActive(title)}>
                            {active===title? "X": "|||"}
                        </span>
                    </div>
                </div>

                {/* <div className={(active === title ? "show" : "") + "accordionContent"}> */}
                <div className={(active === title ? "show" : "") + "accordionContent"}>
                    <div className="containerBox">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, nam animi repellendus omnis molestias, necessitatibus pariatur natus iusto alias minima recusandae! Voluptatum debitis animi nihil, officiis et quo dolorum quas?</p>
                    </div>
                </div>

            </div>



            {/* ==================== */}

        </section>
    );
};

export default Accordion;