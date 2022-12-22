import React, { useState } from 'react';
import Accordion from './Accordion';
import VideoFrame from './VideoFrame';

const Frequescy = () => {
    const [active, setActive] = useState("Title1")
    return (
        <section className=''>
<div className='text-center mb-6'>
        <h2 className='text-4xl mb-2 text-orange-500 font-bold'>Frequency</h2>
        <h4 className='text-2xl'>Your frequency question & answer</h4>
      </div>
            <div className='flex_block'>
                <div>
                    <p className='text-center mb-5'>MNA Motivation Youtube Channel intro Video</p>
                    <VideoFrame />
                </div>
                <div className='border-3'>
                    {/* <p className='text-center'>Accordion section</p> */}
                    <Accordion title='Title1' active={active} setActive={setActive} />
                    <Accordion title='Title2' active={active} setActive={setActive} />
                    <Accordion title='Title3' active={active} setActive={setActive} />
                    <Accordion title='Title4' active={active} setActive={setActive} />
                </div>
            </div>
        </section>
    );
};

export default Frequescy;