import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import ManageAllOrdersRow from './ManageAllOrdersRow';

const ManageAllOrders = () => {
    const { data: orders, isLoading, refetch } = useQuery("orders", () =>
        fetch("https://mna-computer-manufacturer.onrender.com/orders", {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => res.json())
    );

    if (isLoading) {
        return <Loading></Loading>;
    }
    return (
        <section>
            <h2 className="text-center text-green-500 text-4xl font-semibold">Manage Orders </h2>
            <h2 className="text-center text-xl mt-3">Total Orders: {orders?.length} </h2>
            <div className="overflow-x-auto p-4">
                <table className="table w-full">
                    <thead>
                        <tr className='text-center'>
                            <th className='text-base'>S. No</th>
                            <th className='text-base'>Customer Name</th>
                            <th className='text-base'>Customer</th>
                            <th className='text-base'>Product / Part</th>
                            <th className='text-base'>Status</th>
                            <th className='text-base'>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map((order, index) => <>
                                <ManageAllOrdersRow
                                key={order._id}
                                index={index}
                                order={order}
                                refetch={refetch}
                                ></ManageAllOrdersRow>
                            </>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default ManageAllOrders;