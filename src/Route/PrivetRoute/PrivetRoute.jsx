import React from 'react';
import UseAuth from '../../Hooks/UseAuth';
import Loader from '../../pages/shared/Loader/Loader';
import { Navigate } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user,loading}= UseAuth()

    if(loading){
        return Loader;
    }
    if(!user) {
        <Navigate to={"/login"}></Navigate>
    }

    return children;
};

export default PrivetRoute;