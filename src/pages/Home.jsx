import '../styles/home.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { addCartThunk } from '../store/slices/cart.slice';

const Home = () => {

  const listProducts = useSelector(state => state.products);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [filteredsIsVIsible, setFilteredsIsVisible] = useState(false)
  const [changeCategory, setChangeCategory] = useState(false);
  const [changePrice, setChangePrice] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
      .then(res => setCategories(res.data.data.categories))
  }, []);

  useEffect(() => {
    setProductsFiltered(listProducts)
  }, [listProducts])

  const filterCategory = (categoryId) => {
    // alert('filtrando producto con id: ' + categoryId);
    const filtered = listProducts.filter(products => products.category.id === categoryId)
    setProductsFiltered(filtered);
  }

  const filterPrice = (minPrice, maxPrice) => {
    const priceFiltered = listProducts.filter(products => Number(products.price) >= minPrice && Number(products.price) <= maxPrice)
    setProductsFiltered(priceFiltered);
    console.log(priceFiltered);
  }

  const searchProducts = () => {
    const filtered = listProducts.filter(products => products.title.toLowerCase().includes(searchValue.toLowerCase()))
    setProductsFiltered(filtered)
  }

  const addProductCart = (id) => {
    const purchase = {
        id: id,
        quantity: 1
    }
    dispatch(addCartThunk(purchase))
}

  return (
    <div className='home-container'>
      <div className={`filtered ${filteredsIsVIsible ? 'isActive' : ''}`}>
        <Button className='btn-return-filtered' onClick={() => setFilteredsIsVisible(false)}>
          <i className="fa-solid fa-x"></i>
        </Button>
        <p><b>Filters</b></p>
        <div className='filter-price'>
          <Button className='filter-btn' onClick={() => setChangePrice(!changePrice)}>
            price
            {
              changePrice ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>
            }
          </Button>
          <form className={`filter-price-item ${changePrice ? 'price-no-visible' : ''}`} onSubmit={() => filterPrice(minPrice, maxPrice)}>
            <div className='filter-price-input'>
              <label htmlFor="min-price">From</label>
              <input
                id='min-price'
                type='number'
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
              >
              </input>
            </div>
            <div className='filter-price-input'>
              <label htmlFor="max-price">To</label>
              <input
                id='max-price'
                type='number'
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              >
              </input>
            </div>
            <Button variant="danger" id="button-addon2" onClick={() => filterPrice(minPrice, maxPrice)}>
              Filter Price
            </Button>
          </form>
        </div>

        <div className='filter-category'>
          <Button className='filter-btn' onClick={() => setChangeCategory(!changeCategory)}>
            category
            {
              changeCategory ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>
            }
          </Button>
          <ul className={`filter-category-item ${changeCategory ? 'category-no-visible' : ''}`}>
            <li>
              <Button onClick={() => setProductsFiltered(listProducts)}>All Products</Button>
            </li>
            {
              categories.map(category => (
                <li key={category.id}>
                  <Button onClick={() => filterCategory(category.id)}>
                    {category.name}
                  </Button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className='home-products'>
        <form onSubmit={searchProducts} className='input-search'>
          <InputGroup className="mb-3" >
            <Form.Control
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2" onClick={searchProducts} >
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </InputGroup>
        </form>
        <Button className='btn-filters' onClick={() => setFilteredsIsVisible(!filteredsIsVIsible)}>
          <i className="fa-solid fa-filter"></i>
          filters
        </Button>
        <ul className='products-container'>
          {
            productsFiltered.map(product => (
              <li
                key={product.id}
                className='product-card'
                onClick={() => navigate(`/products/${product.id}`)}
              >
                <div className='product-card-image'>
                <img src={product.productImgs[1]} className='over' alt="" />
                  <img src={product.productImgs[0]} alt="" />
                </div>
                <div className='product-card-details'>
                  <h2>{product.title}</h2>
                  <div className='product-card-price'>
                    <span>Price</span>
                    <p><b>{product.price}</b></p>
                  </div>
                </div>
                <Button onClick={() => addProductCart(product.id)}>
                  <i className="fa-solid fa-cart-shopping"></i>
                </Button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

export default Home;