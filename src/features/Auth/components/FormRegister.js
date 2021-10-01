import React from 'react';
import './Login-Register.css'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import axios from 'axios';

function FormRegister(props) {

    const { register, handleSubmit } = useForm();

    const history = useHistory();

    const submitFormRegister = (data) => {
        axios.post('http://localhost:4000/auth/sign-up', {
            ...data
        }).then(() => {
            history.push('/login');
        }).catch(err => console.log(err))
    }

    return (
        <div className="flex justify-center items-center container-xl bg-gray-50" >
            <div className="mt-4 w-1/3 px-12">
                <img className="h-12 mx-auto w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />

                <h1 className="text-3xl text-center font-bold mt-2">Register Account</h1>
                <p className="text-center font-xs text-gray-400 tracking-tighter">Get your free account now.</p>

                <form className="mt-4 p-8 auth-form shadow-md" onSubmit={handleSubmit(submitFormRegister)}>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-medium">First Name</p>
                            <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                type="text"
                                {...register("firstName", { required: true })}
                            />
                        </div>

                        <div className="">
                            <p className="font-medium">Last Name</p>
                            <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                                type="text"
                                {...register("lastName", { required: true })}
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="font-medium">Email</p>
                        <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            type="text"
                            {...register("email", { required: true })}
                        />
                    </div>

                    <div className="mt-4">
                        <p className="font-medium">Username</p>
                        <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            type="text"
                            {...register("username", { required: true })}
                        />
                    </div>

                    <div className="mt-4">
                        <p className="font-medium">Password</p>
                        <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            type="password"
                            {...register("password", { required: true })}
                        />
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="flex items-center">
                            <input name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />

                            <span className="ml-2 block text-sm font-medium text-gray-400">
                                I accept Terms and Conditions
                            </span>
                        </div>

                    </div>

                    <button className="mt-4 text-white bg-indigo-600 text-center w-full py-2 border border-gray-300 rounded-md"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>

    );
}

export default FormRegister;