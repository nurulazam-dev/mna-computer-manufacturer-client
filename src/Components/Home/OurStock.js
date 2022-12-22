import React from 'react';
import Calender from './Calender';

const OurStock = () => {
    return (
        <section className='mt-10 mb-12'>
            <h2 className='text-4xl text-center text-orange-500 font-bold mb-4'>Our Available Product</h2>
            <div className="card mx-10">
                <div className="flex_block">
                    <div className=''>
                        <Calender />
                    </div>
                    <div className='px-3'>
                        <div><p>Processor</p><progress className="progress progress-warning w-full" value="96" max="100"></progress></div>
                        <div><p>Graphics Card</p><progress className="progress progress-warning w-96" value="60" max="100"></progress></div>
                        <div><p>Solid State Drive (SSD)</p><progress className="progress progress-warning w-96" value="70" max="100"></progress></div>
                        <div><p>Multimedia Keyboard</p><progress className="progress progress-warning w-96" value="40" max="100"></progress></div>
                        <div><p>Optical Mouse</p><progress className="progress progress-warning w-96" value="99" max="100"></progress></div>
                        <div><p>Webcam</p><progress className="progress progress-warning w-96" value="85" max="100"></progress></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurStock;