import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { productSearch } from '../redux/productAction';

const Header = () => {
    const result = useSelector((state) => state.cartData);
    console.log("redux data in header", result)
    const dispatch = useDispatch();
    return (
        <div className='header'>
            <Link to="/">
                <h1 className='logo'>E-comm</h1>

            </Link>
            <div className='search-box'>
                <input type="text" onChange={(event) => dispatch(productSearch(event.target.value))} placeholder='Search Product' />
            </div>
            <Link to="/cart">

                <div className='cart-div'>
                    <span>{result.length}</span>
                    <img src='https://static.vecteezy.com/system/resources/previews/004/999/463/original/shopping-cart-icon-illustration-free-vector.jpg' alt='' className='img-cart' />
                </div>
            </Link>
        </div>
    )
}
export default Header;