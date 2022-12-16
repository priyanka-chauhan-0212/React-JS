import { addToCart, removeToCart, emptyToCart } from '../redux/action';
import { useDispatch } from 'react-redux'
import { productList } from '../redux/productAction'
import { useSelector } from 'react-redux'
import { useEffect } from 'react';

function Main() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.productData);
    console.log("data in main component IN SAGA.. ", data)
    // const product = {
    //     name: 'i phone',
    //     type: 'mobile',
    //     price: 10000,
    //     color: 'red'
    // }
    useEffect(() => {
        dispatch(productList())
    }, [])
    return (
        <div className="App">
            {/* <button onClick={() => dispatch(addToCart(product))}>Add to cart</button>
            <div>
                <button onClick={() => dispatch(removeToCart(product.name))}>Remove from cart</button>
            </div> */}
            <div>
                <button onClick={() => dispatch(emptyToCart())}>Empty cart</button>
            </div>
            {/* <div>
                <button onClick={() => dispatch(productList())}>Get product List</button>
            </div> */}
            <div className='product-container'>
                {
                    data.map((item) => <div key={item.id} className='product-item'>
                        <img src={item.photo} alt="" />
                        <div>Name : {item.name}</div>
                        <div>Color : {item.color}</div>
                        <div>Brand : {item.brand}</div>
                        <div>Price : {item.price}</div>
                        <div>Category : {item.category}</div>
                        <div><button onClick={() => dispatch(addToCart(item))} >Add TO Cart</button>
                            <button onClick={() => dispatch(removeToCart(item.id))}>Remove TO Cart</button></div>
                    </div>)
                }

            </div>
        </div>
    );
}

export default Main;
