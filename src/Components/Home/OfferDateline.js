import React from 'react';
import CountDownComponent from './CountDownComponent';
import bgImg from '../../assets/counDownBg.jpeg';
import vectorImg from '../../assets/counDownVector.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const OfferDateline = () => {
    const navigate = useNavigate();

    return (
        <section style={{ background: `url(${bgImg})`, backgroundSize: 'cover' }} className="py-5 px-10 bg-no-repeat mb-10">
            <div className='flex_block'>
                <div className=''>
                    <div className='mb-3 text-[14px] font-semibold'>
                        <h5 className="text-3xl font-bold">Offer Dateline</h5>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore dolorem molestiae est? Lorem, ipsum.</p>
                        <p>consectetur adipisicing elit Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore dolorem?</p>
                    </div>
                    <CountDownComponent />
                    <button className="btn bg-green-600 border-blue-900 max-w-xs mt-5"
                        onClick={() => navigate("products")}>
                        Select your product
                        <FontAwesomeIcon className='mx-4' icon={faArrowUpRightFromSquare} />
                    </button>
                </div>
                <div className='mt-4 md:mt-0 lg:mt-0'>
                    <img src={vectorImg} alt="" />
                </div>
            </div>
        </section>
    );
};

export default OfferDateline;