import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const CreateUser = ({ setIsLogin }) => {

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const submitCreated = (data) => {
        console.log(data);
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users', data)
            .then( () => {
                navigate('/')
                alert('User Created') 
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    alert('credencias invalidas');
                }
                console.log(error);
            })
    }

    return (
        <Form onSubmit={handleSubmit(submitCreated)} className='form-create'>
                    <p>Sing Up</p>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            {...register('firstName')}
                            type="text"
                            placeholder="First name" required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            {...register('lastName')}
                            type="text"
                            placeholder="Last name"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            {...register('email')}
                            type="email"
                            placeholder="Enter email"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            {...register('password')}
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicNumber">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            {...register('phone')}
                            type="number"
                            placeholder="Number"
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicRole">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            {...register('role')}
                            type="text"
                            placeholder="Role"
                            required
                        />
                    </Form.Group>

                    <Button variant="danger" type="submit">
                        Submit
                    </Button>
                    <div className='change-login'>
                        <span>Already have an account? </span>
                        <Link onClick={() => setIsLogin(true)}>Log In</Link>
                    </div>
                </Form>
    );
};

export default CreateUser;