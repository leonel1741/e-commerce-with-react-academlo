import '../styles/cart.css';
import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProductCartThunk, getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';

const CartSideBar = ({ show, handleClose }) => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    let priceCartTotal = 0;

    const getTotalPrice = (pricePerProduct, quantityPerProduct) => {
        const pricePerProductTotal = pricePerProduct * quantityPerProduct;
        priceCartTotal = priceCartTotal + pricePerProductTotal;
        return pricePerProductTotal;
    }

    useEffect(() => {
        dispatch(getCartThunk());
    }, []);

    return (
        <Offcanvas show={show} onHide={handleClose} placement={'end'}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup className='cart-product-container'>
                    {
                        cart.map(product => (
                            <ListGroup.Item key={product.id} className='cart-product-item'>
                                <div className='brand-delete'>
                                    <span>{product.brand}</span>
                                    <Button onClick={() => dispatch(deleteProductCartThunk(product.id))}>
                                        <i className="fa-regular fa-trash-can"></i>
                                    </Button>
                                </div>
                                <Link to={`/products/${product.id}`} className='title-product-item'>{product.title}</Link>
                                <div className='quantity-product-item'>
                                    <div>{product.productsInCart.quantity}</div>
                                </div>
                                <div className='price-product-item'>
                                    <span>Total:</span>
                                    {getTotalPrice(product.price, product.productsInCart.quantity)}
                                </div>
                            </ListGroup.Item>
                        ))
                    }
                    <ListGroup className='total-price-checkout'>
                        <div className='total-price'>
                            <span>Total: </span>
                            {priceCartTotal}
                        </div>
                        <div className='checkout'>
                            <Button  onClick={() => dispatch(purchaseCartThunk())} variant='danger'>Checkout</Button>
                        </div>
                    </ListGroup>
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartSideBar;