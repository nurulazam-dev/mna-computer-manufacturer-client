import React from 'react';
import {summarydata} from '../Shared/Datas';

const BusinessSummary = () => {
    return (
        <section className='my-8'>
            <div className='mb-5'>
                <h2 className='text-4xl text-center text-orange-500 font-bold'>Business Summary</h2>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-8'>
                {
                    summarydata.map(data => (
                        <div key={data.id} className="card lg:max-w-lg bg-base-100">
                            <div className="card-body">
                                <img className='h-44' src={data.img} alt='' />
                                <div className='text-center'>
                                    <div><h3 className='text-3xl text-blue-600 font-bold'>{data.count} +</h3></div>
                                    <div><h2 className='text-2xl font-semibold mt-2 '>{data.title}</h2></div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default BusinessSummary;