import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import '../../Auth/components/Login-Register.css';

function ChangePassword(props) {

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const submitFormLogin = () => {

    }

    return (
        <div className="mt-4 px-12">
            <form className="mt-4 p-8 auth-form shadow-md" onSubmit={handleSubmit(submitFormLogin)}>
                <div>
                    <p className="font-medium">Current Password</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        type="password"
                        {...register("firstName", { required: true })}
                    />
                </div>

                <div className="mt-6">
                    <p className="font-medium">New Password</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        type="password"
                        {...register("lastName", { required: true })}
                    />
                </div>

                <div className="mt-6">
                    <p className="font-medium">Confirm Password</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        type="password"
                        {...register("lastName", { required: true })}
                    />
                </div>

                <button className="text-white bg-blue-500 hover:bg-blue-600 text-center w-full py-2 shadow rounded-md mt-6 font-medium"
                    type="submit"
                >
                    <span>
                        Change Password
                    </span>
                </button>

            </form>
        </div>
    );
}

export default ChangePassword;