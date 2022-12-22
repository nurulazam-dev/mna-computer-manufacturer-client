import { faAward, faHandHoldingDollar, faHeadset, faMoneyCheckDollar, faRotateRight, faShieldHalved, faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import chooseImg from '../../assets/why_choose_us.webp'

const WhyChooseUs = () => {
    return (
        <section className='mb-12'>
            <h6 className="text-center text-4xl mb-2 font-bold">Why We're Best?</h6>
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row">
                    <div className=''>
                        <img src={chooseImg} alt="" className="w-96" />
                    </div>

                    <div className=''>
                        <div>
                            <h1 className="text-3xl lg:text-3xl font-bold capitalize">We always try to present our business in the best way</h1>
                            <div className='text-[14px]'>
                                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi, nam?Lorem ipsum dolor, Lorem ipsum dolor sit, amet Lorem ipsum</p>
                                <p>sit amet consectetur Lorem ipsum dolor sit, amet adipisicing elit. Accusantium, ea.sit amet consectetur adipisicing elit. Accusantium,</p>
                            </div>
                        </div>
                        {/* card */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

                            <div className="flex items-center shadow-2xl px-2 lg:px-5 py-3">
                                <div className='mr-3'>
                                    <FontAwesomeIcon icon={faTruckFast} className='text-green-600 text-[32px]' />
                                </div>
                                <div>
                                    <p className="font-semibold">Free Shipping</p>
                                    <p className="text-[14px]">Order over $100</p>
                                </div>
                            </div>

                            <div className="flex items-center shadow-2xl px-2 lg:px-5 py-3">
                                <div className='mr-3'>
                                    <FontAwesomeIcon icon={faMoneyCheckDollar} className='text-green-600 text-[32px]' />
                                </div>
                                <div>
                                    <p className="font-semibold">Easy Payment</p>
                                    <p className="text-[14px]">100 Secure payment</p>
                                </div>
                            </div>

                            <div className="flex items-center shadow-2xl px-2 lg:px-5 py-3">
                                <div className='mr-3'>
                                    <FontAwesomeIcon icon={faHeadset} className='text-green-600 text-[32px]' />
                                </div>
                                <div>
                                    <p className="font-semibold">24/7 Service</p>
                                    <p className="text-[14px]">Call us anytime</p>
                                </div>
                            </div>
                            <div className="flex items-center shadow-2xl px-2 lg:px-5 py-3">
                                <div className='mr-3'>
                                    <FontAwesomeIcon icon={faShieldHalved} className='text-green-600 text-[32px]' />
                                </div>
                                <div>
                                    <p className="font-semibold">Security</p>
                                    <p className="text-[14px]">High Property Security</p>
                                </div>
                            </div>
                            <div className="flex items-center shadow-2xl px-2 lg:px-5 py-3">
                                <div className='mr-3'>
                                    <FontAwesomeIcon icon={faAward} className='text-green-600 text-[32px]' />
                                </div>
                                <div>
                                    <p className="font-semibold">Certified</p>
                                    <p className="text-[14px]">Government Certified</p>
                                </div>
                            </div>
                            <div className="flex items-center shadow-2xl px-2 lg:px-5 py-3">
                                <div className='mr-3'>
                                    <FontAwesomeIcon icon={faHandHoldingDollar} className='text-green-600 text-[32px]' />
                                </div>
                                <div>
                                    <p className="font-semibold">Best Price Offer</p>
                                    <p className="text-[14px]">Best product, Low price</p>
                                </div>
                            </div>

                            <div className="flex items-center shadow-2xl px-2 lg:px-5 py-3">
                                <div className='mr-3'>
                                    <FontAwesomeIcon icon={faRotateRight} className='text-green-600 text-[32px]' />
                                </div>
                                <div>
                                    <p className="font-semibold">Easy Returns</p>
                                    <p className="text-[14px]">10 Days Returns</p>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;