import { useEffect, useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import MyNavBar from './components/MyNavBar'
import LoadingScreen from './components/LoadingScreen'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsThunk } from './store/slices/products.slice'
import ProtectedRoutes from './components/ProtectedRoutes'
import UserDetail from './components/UserDetail'
import Footer from './components/Footer'

function App() {

  const isLoading = useSelector(state => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [])

  return (
    <HashRouter>
      <MyNavBar />
      {isLoading && <LoadingScreen />}
      <div className='App'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/purchases' element={<Purchases />} />
            <Route path='/user' element={<UserDetail />}/>
          </Route>
        </Routes>
      </div>
      <Footer />
    </HashRouter>
  )
}

export default App
