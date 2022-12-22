import React from 'react';

const CountDownComponent = () => {
    return (
        <div>
            <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div className="flex flex-col p-2 bg-neutral  text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": 15 }}></span>
                    </span>
                    Day
                </div>
                <div className="flex flex-col p-2 bg-neutral text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": 10 }}></span>
                    </span>
                    Hour
                </div>
                <div className="flex flex-col p-2 bg-neutral text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": 24 }}></span>
                    </span>
                    Minute
                </div>
                <div className="flex flex-col p-2 bg-neutral text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                        <span style={{ "--value": 32 }}></span>
                    </span>
                    Second
                </div>
            </div>
        </div>
    );
};

export default CountDownComponent;