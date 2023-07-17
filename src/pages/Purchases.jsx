import '../styles/purchases.css';
import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPruchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector(state => state.purchases);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {
        dispatch(getPruchasesThunk())
    }, [])

    const getDate = (datePurchase) => {
        const date = new Date(datePurchase).toLocaleDateString('en-us', options);
        return date;
    }

    // console.log(purchases);

    return (
        <div className='purchases-container'>
            <div className='history'>
                <button onClick={() => navigate('/')}>Home</button>
                <i className="fa-solid fa-circle"></i>
                <p>Purchases</p>
            </div>
            <h1>Purchases</h1>
            <div className='purchase-container'>
                {
                    purchases.map(purchase => (
                        <ListGroup key={purchase.id} className='purchase-item'>
                            <ListGroup.Item >
                                {getDate(purchase.createdAt)}
                            </ListGroup.Item>
                            {
                                purchase.cart.products.map(product => (
                                    <ListGroup.Item key={product.id} className='purchase-product' onClick={() => navigate(`/products/${product.id}`)}>
                                        <div className='purchase-product-item'>

                                            <div className='title'>
                                                {product.title}
                                            </div>
                                            <div className='quantity-purchase'>
                                                <div>
                                                    {product.productsInCart.quantity}
                                                </div>
                                            </div>
                                            <div className='price'>
                                                {product.price}
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    ))
                }
            </div>
        </div>
    );
};

export default Purchases;