import React, { useState } from 'react';
import '../styles/navbar.css';
import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartSideBar from './CartSideBar';

const MyNavBar = () => {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(localStorage.getItem("token"));

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
                        {/* {getUser()} */}
                        {localStorage.getItem("token") ? <Nav.Link to='/user' as={Link} className='link-item'>
                            <i className="fa-regular fa-user"></i>
                            {localStorage.getItem('userName')}
                        </Nav.Link> : <Nav.Link to='/login' as={Link} className='link-item'>
                            <i className="fa-regular fa-user"></i>
                            login
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