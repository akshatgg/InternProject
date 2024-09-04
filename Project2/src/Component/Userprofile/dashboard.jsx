import React from 'react';

const Dashboard = ({ name, email, phoneNumber, city }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white p-12 rounded-3xl shadow-2xl max-w-3xl w-full transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
          User Dashboard
        </h2>
        <div className="space-y-8">
          <div>
            <label className="block text-xl text-gray-600 font-semibold">
              Name:
            </label>
            <p className="text-2xl text-gray-900">{name}</p>
          </div>
          <div>
            <label className="block text-xl text-gray-600 font-semibold">
              Email:
            </label>
            <p className="text-2xl text-gray-900">{email}</p>
          </div>
          <div>
            <label className="block text-xl text-gray-600 font-semibold">
              Phone Number:
            </label>
            <p className="text-2xl text-gray-900">{phoneNumber}</p>
          </div>
          <div>
            <label className="block text-xl text-gray-600 font-semibold">
              City:
            </label>
            <p className="text-2xl text-gray-900">{city}</p>
          </div>
        </div>

        <div className='flex justify-center items-center text-center '>
          <button className="bg-blue-400 rounded-xl p-3 text-lg hover:bg-blue-500 mt-4">
            More activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
