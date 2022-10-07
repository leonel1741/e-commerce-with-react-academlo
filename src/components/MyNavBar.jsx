import React, { useState } from 'react';
import '../styles/navbar.css';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartSideBar from './CartSideBar';
import { useSelector } from 'react-redux';

const MyNavBar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user = useSelector(state => state.user);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(user);

    return (
        <>
            <Navbar bg="danger" variant='dark' expand="lg" className='nav-bar'>
                <Container>
                    <Navbar.Brand to='/' as={Link}>E-Commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className='navbar-toggler' />
                    <Navbar.Collapse
                        id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link to='/purchases' as={Link} className='link-item'>
                                <i className="fa-solid fa-store"></i>
                                purchases
                            </Nav.Link>
                            <Nav.Link className='link-item' onClick={handleShow}>
                                <i className="fa-solid fa-cart-shopping"></i>
                                cart
                            </Nav.Link>
                            {token === "" ? <Nav.Link to='/login' as={Link} className='link-item'>
                                <i className="fa-regular fa-user"></i>
                                Login
                            </Nav.Link> : <Nav.Link to='/user' as={Link} className='link-item'>
                                <i className="fa-regular fa-user"></i>
                                {localStorage.getItem('userName')}
                            </Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSideBar show={show} handleClose={handleClose} />
        </>
    );
};

export default MyNavBar;