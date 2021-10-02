import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login-Register.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { onLogin } from '../reducers/Auth';
import { useHistory } from 'react-router';

function FormLogin(props) {

    const { register, handleSubmit } = useForm();

    const [mess, setMess] = useState();

    const [err, setErr] = useState(true);

    const dispatch = useDispatch();

    const history = useHistory();

    const submitFormLogin = (data) => {
        axios.post('http://localhost:4000/auth/login', {
            username: data.username,
            password: data.password
        }).then(res => {
            if (res.data.err) {
                setMess(res.data.err);
                setErr(false);
            } else {
                dispatch(onLogin(res.data));
                history.push('/');
            }
        }).catch(err => console.log(err))
    }

    return (

        <div className="flex justify-center items-center container-xl bg-gray-50 mt-2">
            <div className="mt-4 w-1/3 px-12">
                <img className="h-12 mx-auto w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />

                <h1 className="text-3xl text-center font-bold mt-2">Sign in to your account</h1>
                <p className="text-center font-xs text-gray-400 tracking-tighter">Sign in to continue to App.</p>

                <form className="mt-4 p-8 auth-form shadow-md" onSubmit={handleSubmit(submitFormLogin)} >
                    <div>
                        <p className="font-medium">Username</p>
                        <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            type="text"
                            {...register("username", { onChange: () => setErr(true) }, { required: true })}
                        />
                    </div>

                    <div className="mt-6">
                        <p className="font-medium">Password</p>
                        <input className="mb-1 focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                            type="password"
                            {...register("password", { onChange: () => setErr(true) }, { required: true })}
                        />
                        {!err && <span className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{mess}</span>}
                    </div>

                    <div className="flex items-center my-4">
                        <div className="flex items-center">
                            <input name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />

                            <span className="ml-2 block text-sm font-medium text-gray-400">
                                Remember me
                            </span>
                        </div>

                        <div className="text-sm ml-auto my-6">
                            <span className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </span>
                        </div>
                    </div>

                    <button className="text-white bg-indigo-600 text-center w-full py-2 border border-gray-300 rounded-md"
                        type="submit"
                    >
                        Sign in
                    </button>

                    <div className="my-6">
                        <div className="other-login">
                            <span>Or continue with</span>
                        </div>
                    </div>

                    <div className="flex">
                        <div className="flex-grow mx-2 text-center py-1 shadow-sm border-2 border-gray-200 rounded-lg">
                            <i className="fab fa-facebook text-xl text-gray-500"></i>
                        </div>

                        <div className="flex-grow mx-1 text-center py-1 shadow-sm border-2 border-gray-200 rounded-lg">
                            <i className="fab fa-twitter text-xl text-gray-500"></i>
                        </div>

                        <div className="flex-grow mx-2 text-center py-1 shadow-sm border-2 border-gray-200 rounded-lg">
                            <i className="fab fa-github text-xl text-gray-500"></i>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default FormLogin;