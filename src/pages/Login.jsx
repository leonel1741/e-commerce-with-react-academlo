import '../styles/login.css';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import UserLogin from '../components/UserLogin';
import CreateUser from '../components/CreateUser';

const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    return (
        <div className='login-container'>
            { isLogin ? <UserLogin setIsLogin={setIsLogin} /> : <CreateUser setIsLogin={setIsLogin}/> }
        </div>
    );
};

export default Login;