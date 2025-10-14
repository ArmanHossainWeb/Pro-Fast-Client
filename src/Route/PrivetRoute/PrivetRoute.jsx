import React from 'react';
import Loader from '../../pages/shared/Loader/Loader';
import { Navigate, useLocation } from 'react-router';
import UseAuth from '../../hooks/useAuth';

const PrivetRoute = ({children}) => {
    const {user,loading}= UseAuth()
    const location = useLocation();
    console.log(location)

    if(loading){
        return Loader;
    }
    if(!user) {
       return <Navigate state={{from: location.pathname}} to={"/login"}></Navigate>
    }

    return children;
};

export default PrivetRoute;