import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert'
import { FetchList } from '../reducers/ListUser';

function UserManagement(props) {

    const dispatch = useDispatch();

    const ListUser = useSelector(state => state.ListUser);

    const token = useSelector(state => state.Auth.accessToken);

    const [listUser, setListUSer] = useState(ListUser);

    console.log(ListUser);
    useEffect(() => {
        dispatch(FetchList(token));
    }, [dispatch, token])

    useEffect(() => {
        setListUSer(ListUser)
    }, [ListUser])


    const ChangeBlockUser = (item) => {
        const newItem = { ...item, isBlock: !item.isBlock }
        swal({
            title: "Are you sure?",
            text: `${!item.isBlock ? 'Once block, If this account is locked, the user of this account cannot log in!' : 'If this account is unlocked, users of this account can login normally!'}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.put(`http://localhost:4000/me/${item._id}/block`, newItem, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }).then(() => {
                        dispatch(FetchList(token));
                        swal(`${!item.isBlock ? 'Poof! This account has been locked!' : 'Poof! This account has been unlocked!'}`, {
                            icon: "success",
                        });
                    }).catch(err => console.log(err))
                }
            });
    }

    const convertListUser = (list) => {
        if (list.length > 0) {
            const result = list.map((item, index) => {
                return (
                    <tr key={index} className="hover:bg-gray-50 transition duration-300 ease-in-out">
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="">
                                <div>
                                    <div className="text-sm font-medium text-gray-900">
                                        {item.lastName} {item.firstName}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{item.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm ">
                            <i className={`fas fa-user-lock cursor-pointer ${item.isBlock ? 'text-gray-700' : 'text-gray-400'}`}
                                title={`${item.isBlock ? 'Unblock' : 'Block'}`}
                                onClick={() => ChangeBlockUser(item)}
                            ></i>
                        </td>
                    </tr>
                )
            })
            return result;
        }
    }

    return (
        <div className="flex flex-col max-w-7xl mx-auto px-4 mt-10">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border border-gray-300 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Role
                                    </th>
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {convertListUser(listUser)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;