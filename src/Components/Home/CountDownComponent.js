import React from "react";

const CountDownComponent = () => {
  return (
    <div>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-1 lg:p-2 bg-neutral rounded-lg text-neutral-content h-[90%] lg:h-full">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": 15 }}></span>
          </span>
          days
        </div>
        <div className="flex flex-col p-1 lg:p-2 bg-neutral rounded-lg text-neutral-content h-[90%] lg:h-full">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": 10 }}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-1 lg:p-2 bg-neutral rounded-lg text-neutral-content h-[90%] lg:h-full">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": 24 }}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-1 lg:p-2 bg-neutral rounded-lg text-neutral-content h-[90%] lg:h-full">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": 28 }}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default CountDownComponent;
