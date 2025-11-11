import React, { use } from 'react';
import AuthProvider, { AuthContext } from '../AuthProvider/AuthProvider';
import { Navigate, useLocation } from 'react-router';
import Loader from '../../Components/Loader/Loader';

const PrivateRoute = ({children}) => {
    const {user,loading} = use(AuthContext)
    const location = useLocation() ;

    if(loading){
        return <Loader></Loader>
    }
    if(user && user?.email){
        return children
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRoute;