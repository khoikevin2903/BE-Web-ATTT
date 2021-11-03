import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './Login-Register.css'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { onLogin } from '../reducers/Auth';
import { useHistory } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import jwt_decode from 'jwt-decode';


function FormLogin(props) {

    const schema = yup.object().shape({
        username: yup.string().required().max(15),
        password: yup.string().required().max(32).min(6),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [mess, setMess] = useState();

    const [err, setErr] = useState(true);

    const [showPass, setShowPass] = useState(false);

    const dispatch = useDispatch();

    const history = useHistory();

    const submitFormLogin = (data) => {
        axios.post('http://localhost:4000/auth/login', {
            username: data.username,
            password: data.password
        }).then(res => {
            const info = jwt_decode(res.data.accessToken).data;
            console.log(info)
            dispatch(onLogin({
                info: info,
                accessToken: res.data.accessToken
            }))
            history.push('/');
        }).catch(err => console.log(err))
    }

    return (

        <div className="grid grid-cols-1 bg-gray-50 mt-2">
            <div className="mt-4 container-form">
                <img className="h-12 mx-auto w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />

                <h1 className="text-3xl text-center font-bold mt-2">Sign in to your account</h1>
                <p className="text-center font-xs text-gray-400 tracking-tighter">Sign in to continue to App.</p>

                <form className="mt-4 p-8 auth-form shadow-md" onSubmit={handleSubmit(submitFormLogin)} >
                    <div>
                        <label htmlFor="username" className="font-medium">Username</label>
                        <input
                            className="text"
                            type="text"
                            id="username"
                            {...register("username")}
                        />
                        {errors.username && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.username.message}</p>}
                    </div>

                    <div className="mt-6">
                        <label htmlFor="password" className="font-medium">Password</label>
                        <div className="password flex items-center">
                            <input
                                className="w-full focus:outline-none focus:border-none"
                                id="password"
                                type={`${showPass ? 'text' : 'password'}`}
                                {...register("password")}
                            />
                            <i className={`far fa-eye cursor-pointer duration-300 ${showPass ? 'text-blue-500' : 'text-gray-400  hover:text-gray-600'}`}
                                onClick={() => setShowPass(!showPass)}
                            ></i>
                        </div>
                        {errors.password && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.password.message}</p>}
                    </div>

                    {err && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{mess}</p>}

                    <button
                        className="btn-login mt-6"
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