import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import '../../Auth/components/Login-Register.css';

function EditProfile(props) {

    const { register, handleSubmit } = useForm();

    const dispatch = useDispatch();

    const submitFormLogin = () => {

    }

    return (
        <div className="mt-4 px-12">
            <form className="mt-4 p-8 auth-form shadow-md" onSubmit={handleSubmit(submitFormLogin)}>
                <div>
                    <p className="font-medium">First Name</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        type="text"
                        {...register("firstName", { required: true })}
                    />
                </div>

                <div className="mt-6">
                    <p className="font-medium">Last Name</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        type="text"
                        {...register("lastName", { required: true })}
                    />
                </div>

                <div className="text-right mt-6">
                    <button className="text-white bg-red-500 hover:bg-red-700 text-center py-2 px-3 rounded-lg mr-4"
                        type="reset"
                    >
                        Reset
                    </button>

                    <button className="text-white bg-indigo-500 hover:bg-indigo-600 text-center py-2 px-4 rounded-lg"
                        type="submit"
                    >
                        Save
                    </button>
                </div>

            </form>
        </div>
    );
}

export default EditProfile;