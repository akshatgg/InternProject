import React, { useState, useEffect } from 'react';
import Dashboard from './dashboard.jsx';
import { useParams } from 'react-router-dom';

function Profile() {
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const result = await response.json();
                setDetails(result);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
            } finally {
                setLoading(false); // Set loading to false after the fetch is complete or if an error occurs
            }
        };

        fetchDetails();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    const user = details.find(user => user.id === parseInt(id, 10));

    if (loading) {
        return <div>Loading...</div>; // Show a loading message while fetching data
    }

    if (!user) {
        return <div>User not found</div>; // Show a message if the user with the given id is not found
    }

    return (
        <div className="">
            <Dashboard 
                name={user.name} 
                email={user.email} 
                phoneNumber={user.phone} 
                city={user.address.city} 
            />
        </div>
    );
}

export default Profile;
