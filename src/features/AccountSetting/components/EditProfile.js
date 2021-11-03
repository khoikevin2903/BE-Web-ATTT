import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import '../../Auth/components/Login-Register.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import jwt_decode from 'jwt-decode';
import { onLogin } from '../../Auth/reducers/Auth';
import swal from 'sweetalert'

function EditProfile(props) {

    const token = useSelector(state => state.Auth.accessToken);

    const info = useSelector(state => state.Auth.info)

    const { firstName, lastName, email, _id } = info;

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().required().email()
    }).required();

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useDispatch();

    const submitFormProfile = (data) => {
        axios.post(`http://localhost:4000/me/${_id}/edit`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                swal("Thay đổi thông tin thành công!","Nhấn ok để trở lại!", "success");
                const info = jwt_decode(res.data.accessToken).data;
                console.log(info)
                dispatch(onLogin({
                    info: info,
                    accessToken: res.data.accessToken
                }))
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setValue("firstName", firstName);
        setValue("lastName", lastName);
        setValue("email", email);
    }, [firstName, lastName, email, setValue])

    return (
        <div className="mt-4 px-12">
            <form className="mt-4 p-8 shadow-md" onSubmit={handleSubmit(submitFormProfile)}>
                <div>
                    <p className="font-medium">First Name</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        autoComplete="off"
                        type="text"
                        {...register("firstName")}
                    />
                    {errors.firstName && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.firstName.message}</p>}
                </div>

                <div className="mt-6">
                    <p className="font-medium">Last Name</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        autoComplete="off"
                        type="text"
                        {...register("lastName")}
                    />
                    {errors.lastName && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.lastName.message}</p>}

                </div>

                <div className="mt-6">
                    <p className="font-medium">Email</p>
                    <input className="focus:ring-indigo-500 focus:border focus:border-indigo-500 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        autoComplete="off"
                        type="text"
                        {...register("email")}
                    />
                    {errors.email && <p className="text-sm text-red-600 ml-2 tracking-tighter font-semibold">{errors.email.message}</p>}

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