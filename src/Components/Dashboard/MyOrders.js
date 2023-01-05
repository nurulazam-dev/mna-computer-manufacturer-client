import React, { useState } from 'react';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase/firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import Loading from '../Shared/Loading';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import OrderDeleteModal from './OrderDeleteModal';

const MyOrders = () => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);
    const [deleteOrder, setDeleteOrder] = useState(null);

    const { data: orders, isLoading, refetch } = useQuery(["order", user?.email], () =>
            fetch(`https://mna-computer-manufacturer.onrender.com/order?customer=${user?.email}`, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }).then((res) => res.json())
            .then((res) => {
                if (res.status === 403 || res.status === 401) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                    navigate("/");
                    toast.error("Access Token expire");
                }
                return res;
            })
        );
    // console.log(orders);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <section>
            <h2 className="text-center text-green-500 text-4xl font-semibold">My Orders </h2>
            {/* <h2 className="text-center text-xl">My Total Orders: {orders.length} </h2> */}
            <div className="overflow-x-auto p-4">
                <table className="table w-full">
                    <thead>
                        <tr className='text-center'>
                            <th className='text-base'>S. No</th>
                            <th className='text-base'>Product / Part</th>
                            <th className='text-base'>Quantity</th>
                            <th className='text-base'>Price</th>
                            <th className='text-base'>Total Price</th>
                            <th className='text-base'>TransactionId</th>
                            <th className='text-base'>Delete</th>
                        </tr>
                    </thead>

                     <tbody className='text-sm'>
                        {
                            orders?.map((o, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{o?.productName}</td>
                                    <td className='text-center'>{o?.quantity}</td>
                                    <td className='text-center'>{o?.price}</td>
                                    <td className='text-center'>{o?.shouldPay}</td>
                                    <td className="text-center">
                                        {!o?.paid && (
                                            <div className="tooltip tooltip-info" data-tip="Complete Payment" >
                                                <button className="btn btn-info btn-sm text-white" onClick={() => navigate(`/dashboard/payment/${o?._id}`)
                                                } >pay</button>
                                            </div>
                                        )}
                                        {o?.paid && (
                                            <>
                                                <p className="text-primary">Paid</p>
                                                <div className="tooltip tooltip-secondary" data-tip="Transaction Id" >
                                                    <p className="text-gray-700 font-semibold"> {o?.transactionId} </p>
                                                </div>
                                            </>
                                        )}
                                    </td>
                                    <td>
                                        {!o?.paid ? (
                                            <div className="tooltip tooltip-error" data-tip="Cancel This Order" >
                                                <label htmlFor="delete-my-order-modal" className="btn modal-button btn-error btn-sm text-white "
                                                    onClick={() => setDeleteOrder(o)} > 
                                                    <FontAwesomeIcon className='mr-2' icon={faTrashAlt}></FontAwesomeIcon>
                                                    Delete </label>
                                            </div>
                                        ) : (
                                            <div className="tooltip tooltip-primary" data-tip="Can not cancel order after payment" > 
                                            <p className="text-gray-700 font-semibold">Disabled</p>
                                            </div>
                                        )}
                                    </td>
                                    {/* <td className='text-center'><button
                                        onClick={() => handleDelete(order?._id)}
                                        className='btn bg-red-500 border-0 h-5'>
                                        <FontAwesomeIcon className='' icon={faTrashAlt}></FontAwesomeIcon>
                                    </button></td> */}
                                </tr>
                            ))}
                    </tbody> 
                </table>
            </div>
            {deleteOrder && (
                <OrderDeleteModal deleteOrder={deleteOrder} setDeleteOrder={setDeleteOrder} refetch={refetch}></OrderDeleteModal>
            )}
        </section>
    );
};

export default MyOrders;
