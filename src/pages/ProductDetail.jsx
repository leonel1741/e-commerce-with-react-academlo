import '../styles/productDetail.css'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Galery from '../components/Galery';
import { Button } from 'react-bootstrap';
import { addCartThunk } from '../store/slices/cart.slice';

const ProductDetail = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [rate, setRate] = useState(1);
    const dispatch = useDispatch();

    const productsList = useSelector(state => state.products);

    const productDetail = productsList.find(product => product.id === Number(id));

    const imagesProductDetail = productDetail?.productImgs;

    const listSimilarProducts = productsList.filter(product => product.category.name === productDetail.category.name)

    useEffect(() => {
        setRate(1);
    }, [id]);

    const addProduct = () => {
        const purchase = {
            id: id,
            quantity: rate
        }
        dispatch(addCartThunk(purchase))
    }

    const addProductSimilar = (id) => {
        const purchase = {
            id: id,
            quantity: 1
        }
        dispatch(addCartThunk(purchase))
    }

    return (
        <div className='product-detail-container'>
            <div className='history'>
                <button onClick={() => navigate('/')}>Home</button>
                <i className="fa-solid fa-circle"></i>
                <p >{productDetail?.title}</p>
            </div>
            <div className='product-detail-item'>
                <div className='product-detail-image'>
                    <Galery productImages={imagesProductDetail} />
                </div>
                <div className='product-detail-description'>
                    <div className='product-detail-title'>
                        <h2>{productDetail?.title}</h2>
                    </div>
                    <div className='description'>
                        <p>{productDetail?.description}</p>
                    </div>
                    <div className='price-quantity'>
                        <div className='price'>
                            <span>Price</span>
                            <p><b>$ {productDetail?.price}</b></p>
                        </div>
                        <div className='quantity'>
                            <span>Quantity</span>
                            <div className='quantity-rate'>
                                <div className='minus-rate'>
                                    <Button className='me-3' onClick={() => setRate(rate - 1)}>
                                        <i className="fa-solid fa-minus"></i>
                                    </Button>
                                </div>
                                <div className='rate'>
                                    <p>{rate}</p>
                                </div>
                                <div className='add-rate'>
                                    <Button className='me-3' onClick={() => setRate(rate + 1)}>
                                        <i className="fa-sharp fa-solid fa-plus"></i>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='add-cart'>
                        <Button variant='danger' onClick={addProduct}>
                            Add to cart
                            <i className="fa-solid fa-cart-shopping"></i>
                        </Button>
                    </div>
                </div>
            </div>
            <h2 className='similar-items-title'>Discover similar items</h2>
            <ul className='similar-items-container'>
                {
                    listSimilarProducts.map(product => (
                        <li
                            key={product.id}
                            className='similar-product-card'
                            onClick={() => {
                                navigate(`/products/${product.id}`)
                                window.scrollTo({ top: 0, behavior: "smooth", })
                            }}
                        >
                            <div className='similar-product-image'>
                                <img src={product.productImgs[1]} className='similar-product-image-over' alt="" />
                                <img src={product.productImgs[0]} alt="" />
                            </div>
                            <div className='similar-product-detail'>
                                <h3>{product.title}</h3>
                                <div>
                                    <span>Price</span>
                                    <h3>$ {product.price}</h3>
                                </div>
                            </div>
                            <div className='similar-product-cart-btn'>
                                <Button onClick={() => addProductSimilar(product.id)}>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                </Button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default ProductDetail;