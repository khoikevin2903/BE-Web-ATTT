import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLogout } from '../../features/Auth/reducers/Auth';
import axios from 'axios'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'

function Header(props) {

    const firstName = useSelector(auth => auth.Auth.info ? auth.Auth.info.firstName : "");

    const lastName = useSelector(auth => auth.Auth.info ? auth.Auth.info.lastName : "");

    const accessToken = useSelector(auth => auth.Auth.accessToken);

    const role = useSelector(auth => auth.Auth.info ? auth.Auth.info.role : "");

    const history = useHistory();

    const dispatch = useDispatch();

    const [dropdownUser, setDropdownUser] = useState(false);

    const Logout = () => {
        setDropdownUser(false);
        axios.post('http://localhost:4000/auth/logout', {
            accessToken: accessToken
        }).then(res => {
            dispatch(onLogout());
            history.push('/login');
        }).catch(err => console.log(err))
    }

    return (
        <div className="shadow-md">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center py-4">
                    <img
                        className="h-12 w-auto cursor-pointer"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                        onClick={() => history.push('/')}
                    />
                    {(firstName === "" || typeof firstName === "undefined") ?
                        <div className="flex items-center ml-auto">
                            <Link to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                Sign in
                            </Link>
                            <Link to="/signup" className="ml-8 animate-pulse whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                                Sign up
                            </Link>
                        </div> :

                        <div className="relative inline-block text-left ml-auto">
                            <div onClick={() => setDropdownUser(!dropdownUser)}>
                                <div className="cursor-pointer flex items-center rounded w-full px-4 py-2 text-xl font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    <p>{`${firstName} ${lastName}`}</p>
                                    <svg className="-mr-1 ml-2 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" aria-hidden="true">
                                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                    </svg>
                                </div>
                            </div>

                            {dropdownUser && <div className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="divide-y divide-fuchsia-300" role="none">
                                    <Link
                                        to="/account-setting"
                                        className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 transition duration-300 ease-in-out"
                                        onClick={() => setDropdownUser(false)}
                                    >
                                        <i className="fas fa-user-cog w-1/5"></i>
                                        <span>Account setting</span>
                                    </Link>
                                    {
                                        role !== "USER" &&
                                        <Link
                                            to={`/${role.toLowerCase()}/user-management`}
                                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 transition duration-300 ease-in-out"
                                            onClick={() => setDropdownUser(false)}
                                        >
                                            <i className="fas fa-users-cog w-1/5"></i>
                                            <span>User management</span>
                                        </Link>
                                    }
                                    <button className="text-gray-700 w-full rounded-b-md text-left px-4 py-2 text-sm hover:bg-gray-100 transition duration-300 ease-in-out"
                                        onClick={Logout}
                                    >
                                        <i class="fas fa-sign-out-alt w-1/5"></i>
                                        <span>Sign out</span>
                                    </button>
                                </div>
                            </div>}
                        </div>

                    }

                </div>
            </div>
        </div>

    );
}

export default Header;