import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const Dashboard = ({ name, email, phoneNumber, city }) => {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-3xl w-full transform transition-transform duration-300 hover:scale-105">
        <h2 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          User Dashboard
        </h2>
        <div className="space-y-6">
          <div className="p-4 border-l-4 border-purple-500">
            <label className="block text-xl text-gray-600 font-semibold mb-1">
              Name:
            </label>
            <p className="text-2xl text-gray-900">{name}</p>
          </div>
          <div className="p-4 border-l-4 border-pink-500">
            <label className="block text-xl text-gray-600 font-semibold mb-1">
              Email:
            </label>
            <p className="text-2xl text-gray-900">{email}</p>
          </div>
          <div className="p-4 border-l-4 border-red-500">
            <label className="block text-xl text-gray-600 font-semibold mb-1">
              Phone Number:
            </label>
            <p className="text-2xl text-gray-900">{phoneNumber}</p>
          </div>
          <div className="p-4 border-l-4 border-yellow-500">
            <label className="block text-xl text-gray-600 font-semibold mb-1">
              City:
            </label>
            <p className="text-2xl text-gray-900">{city}</p>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Link to={`activities`}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md  duration-300 text-xl">
              More activities
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
