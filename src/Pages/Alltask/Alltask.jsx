import React, { useEffect, useState } from 'react'
import BaseLayout from '../../Layouts/BaseLayout'
import CreateTask from './Modal/CreateTask';
import Editmodal from './Modal/Editmodal';
import axios from 'axios';
import Api from '../../Api/BaseUrl';
import { useSelector } from "react-redux";

const Alltask = () => {
    const myToken = useSelector((e) => e.token);
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1', status: 'Pending' },
        { id: 2, title: 'Task 2', status: 'In Progress' },
        { id: 3, title: 'Task 3', status: 'Complete' },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [error, setError] = useState('');


    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${Api.BASEURL}/tasks/${id}`, {
                headers: {
                    'authorization': `Bearer ${myToken}`,
                },
            });


        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error occurred while deleting task.');
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-200 text-yellow-700';
            case 'inrogress':
                return 'bg-blue-200 text-blue-700';
            case 'complete':
                return 'bg-green-200 text-green-700';
            default:
                return 'bg-gray-200 text-gray-700';
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${Api.BASEURL}/tasks`, {
                    headers: {
                        'authorization': `Bearer ${myToken}`,
                    },
                });
                setTasks(response.data.tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <BaseLayout>

            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">Task List</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Create Task
                    </button>
                </div>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-gray-600 font-medium">Title</th>
                            <th className="px-6 py-3 border-b text-left text-gray-600 font-medium">Status</th>
                            <th className="px-6 py-3 border-b text-center text-gray-600 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td className="px-6 py-4 border-b">{task.taskName}</td>
                                <td className="px-6 py-4 border-b">
                                    <span
                                        className={`px-2 py-1 rounded ${getStatusClass(task.status)}`}
                                    >
                                        {task.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 border-b text-center">
                                    <button
                                        onClick={() => setShowModal2(true)}

                                        className="text-blue-500 hover:underline mr-3"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task._id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <CreateTask
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
            {showModal2 && (
                <Editmodal
                    isOpen={showModal2}
                    onClose={() => setShowModal2(false)}
                    tasks={tasks}
                />
            )}


        </BaseLayout>
    )
}

export default Alltask