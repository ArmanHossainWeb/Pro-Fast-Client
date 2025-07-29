import React, { Children } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({Children}) => {
    const authInfo = {

    }
    return (
        <AuthContext value={authInfo}>
            {Children}
        </AuthContext>
    );
};

export default AuthProvider;