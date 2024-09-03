import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const result = await response.json();
                setUsers(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    
    return (
        <div className="p-8">
            {loading ? (
                <p className="text-xl font-bold text-center">Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-3 px-6 border-b border-gray-200 text-left text-lg font-medium">ID</th>
                                <th className="py-3 px-6 border-b border-gray-200 text-left text-lg font-medium">Name</th>
                                <th className="py-3 px-6 border-b border-gray-200 text-left text-lg font-medium">Username</th>
                                <th className="py-3 px-6 border-b border-gray-200 text-left text-lg font-medium">Company</th>
                                <th className="py-3 px-6 border-b border-gray-200 text-left text-lg font-medium">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                                    <td className="py-4 px-6 border-b border-gray-200 text-lg">
                                        <Link to={`user/${user.id}`}>
                                            {user.id}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200 text-lg">
                                        <Link to={`user/${user.id}`}>
                                            {user.name}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200 text-lg">
                                        <Link to={`user/${user.id}`}>
                                            {user.username}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200 text-lg">
                                        <Link to={`user/${user.id}`}>
                                            {user.company.name}
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6 border-b border-gray-200 text-lg">
                                        <Link to={`user/${user.id}`}>
                                            {user.phone}
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Users;
