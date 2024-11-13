import React, { useEffect, useState } from 'react';
import BaseLayout from '../../Layouts/BaseLayout';
import axios from 'axios';
import Api from '../../Api/BaseUrl';
import { useSelector } from "react-redux";

const HomeComponent = () => {
    const myToken = useSelector((e) => e.token);
    const [taskCounts, setTaskCounts] = useState({
        total: 0,
        pending: 0,
        inprogress: 0,
        complete: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTaskCounts = async () => {
            try {
                const response = await axios.get(`${Api.BASEURL}/tasksdetails`, {
                    headers: {
                        'authorization': `Bearer ${myToken}`,
                    },
                });
                if (response.data.success) {
                    setTaskCounts(response.data.data);
                }
            } catch (err) {
                setError('Error fetching task counts');
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTaskCounts();
    }, []);



    return (
        <BaseLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold">Tasks</h2>
                    <p className="text-3xl font-bold">{taskCounts.total}</p>
                </div>

                <div className="bg-green-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold">Completed</h2>
                    <p className="text-3xl font-bold">{taskCounts.complete}</p>
                </div>

                <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold">In Progress</h2>
                    <p className="text-3xl font-bold">{taskCounts.inprogress}</p>
                </div>

                <div className="bg-red-500 text-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold">Pending</h2>
                    <p className="text-3xl font-bold">{taskCounts.pending}</p>
                </div>
            </div>
        </BaseLayout>
    );
};

export default HomeComponent;
