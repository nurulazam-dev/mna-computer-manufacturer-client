import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Components/Shared/Loading';
import AdminPanel from './AdminPanel';


const MakeAdminPanel = () => {

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://mna-computer-manufacturer.onrender.com/users', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))
    if (isLoading) {
        return <Loading />
    }

    return (
        <section>
            <h2 className='text-2xl text-center'>All Users: {users?.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-1/2 mx-auto">
                    <thead>
                        <tr>
                            <th>S. No</th>
                            <th>User</th>
                            <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => <>
                            <AdminPanel
                             key={index}
                             index={index}
                             user={user}
                             refetch={refetch}
                            ></AdminPanel>
                            </>)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default MakeAdminPanel;