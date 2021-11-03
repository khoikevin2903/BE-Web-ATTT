import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import FormLogin from '../components/FormLogin';


function LoginPage(props) {

    const token = useSelector(auth => auth.Auth.accessToken);
    if (token === "") {
        return <FormLogin />
    } else {
        return <Redirect to="/" />
    }

}

export default LoginPage;