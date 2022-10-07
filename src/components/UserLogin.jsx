import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const UserLogin = ({ setIsLogin }) => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submit = (data) => {
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login/', data)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('userName', res.data.data.user.firstName + " " + res.data.data.user.lastName);
                localStorage.setItem('email', res.data.data.user.email)
                localStorage.setItem('phone', res.data.data.user.phone)
                navigate('/');
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    alert('credencias invalidas');
                }
                console.log(error);
            })
    }

    return (
        <>
            <Form onSubmit={handleSubmit(submit)} className='form-login'>
                <p><b>Welcome! Enter your email and password to continue</b></p>
                <span className='message-alert'>You have to Log In to access to your cart</span>
                <div className='test-data'>
                    <p>Test Data</p>
                    <div className='test-data-item'>
                        <i className="fa-regular fa-envelope"></i>
                        <span>pedro@gmail.com</span>
                    </div>
                    <div className='test-data-item'>
                        <i className="fa-solid fa-lock"></i>
                        <span>pedro1234</span>
                    </div>
                </div>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control {...register('email')} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register('password')} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="danger" type="submit">
                    Login
                </Button>
                <div className='change-login'>
                    <span>Don't have an account? </span>
                    <Link onClick={() => setIsLogin(false)} >Sing Up</Link>
                </div>
            </Form>
        </>
    );
};

export default UserLogin;