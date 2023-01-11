import React, { useState } from 'react';
import Accordion from './Accordion';
import VideoFrame from './VideoFrame';
import {faqsData} from '../Shared/Datas';

const Frequescy = () => {
    const [active, setActive] = useState(1)
    return (
        <section className=''>
            <div className='text-center mb-6'>
                <h2 className='text-4xl mb-2 text-orange-500 font-bold'>Frequency</h2>
                <h4 className='text-2xl'>Your frequency question & answer</h4>
            </div>
            <div className='flex_block'>
                <div className=''>
                    <p className='text-center mb-5'>MNA Motivation Youtube Channel intro Video</p>
                    <VideoFrame />
                </div>
                <div className='' >
                    {
                        faqsData.map(faq=>(
                            <Accordion 
                            key={faq.id} id={faq.id} 
                            title={faq.title} ans={faq.ans} 
                            active={active} setActive={setActive} />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Frequescy;