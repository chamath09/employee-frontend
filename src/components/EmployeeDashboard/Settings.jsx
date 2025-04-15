import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../context/authContext'

const Settings = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const [settings, setSettings] = useState({
        userId: user._id,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(settings.newPassword !== settings.confirmPassword){
            setError('Passwords do not match');
        } else {
            try {
                const response = await axios.put(
                  "https://employee-api-nu.vercel.app/api/setting/change-password",
                  settings,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  }
                );

                
                if (response.data.success) {
                  navigate("/login");
                  setError("");
                }
            } catch (error) {
                if(error.response && !error.response.data.success){
                    setError(error.response.data.error);
                }
            }
        }
    };
    

  return (
    <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
        <p className='text-red-500'>{error}</p>;
        <form onSubmit={handleSubmit}>
            {/* Department Name */}
            <div>
                <label className='text-sm font-medium text-gray-700'>
                    Old Password
                </label>
                <input type="text"
                name='oldPassword'
                placeholder='Change Password'
                onChange={handleChange}
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                required
                />
            </div>

            <div>
                <label className='text-sm font-medium text-gray-700'>
                    New Password
                </label>
                <input type="text"
                name='newPassword'
                placeholder='New Password'
                onChange={handleChange}
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                required
                />
            </div>

            <div>
                <label className='text-sm font-medium text-gray-700'>
                    Confirm Password
                </label>
                <input type="text"
                name='confirmPassword'
                placeholder='Confirm Password'
                onChange={handleChange}
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                required
                />
            </div>

            <button className='w-full mt-6 bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded'>
                Change Password
            </button>

        </form>
    </div>
  )
}

export default Settings