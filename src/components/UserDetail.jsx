import '../styles/userDetail.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import userPhotoPerfil from '../assets/image-user-no-photo-perfil.jpeg';
import { Navigate, useNavigate } from 'react-router-dom';

const UserDetail = () => {

    const navigate = useNavigate();
    // const user = useSelector(state => state.user);
    const logout = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("userName", "");
        localStorage.setItem("email", "");
        localStorage.setItem("phone", "");
        navigate("/login");
    };

    // console.log(user);

    return (
        <div className='user-detail-container'>
            <div className='user-detail-item'>
                <div className='image-perfil'>
                    <img src={userPhotoPerfil} alt="" />
                </div>
                <p className='user-name'>{localStorage.getItem('userName')}</p>
                <p>Email <br />{localStorage.getItem('email')}</p>
                <p>Phone <br />{localStorage.getItem('phone')}</p>
                <Button onClick={logout} className='link-item'>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Log Out
                </Button>
            </div>
        </div >
    );
};

export default UserDetail;