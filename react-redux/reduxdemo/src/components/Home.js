import React from 'react'

function Home(props) {
    // console.warn("home", props.data)
    console.log("props", props)

    return (
        <div>
            {/* <div className='add-to-cart'>
                <span className='cart-count'>{props.data.length}</span>

                <img src='https://cdn3.iconfinder.com/data/icons/e-commerce-2-1/256/2-512.png' alt='' />
            </div> */}
            <h1>Home component</h1>
            <div className='cart-wrapper'>
                <div className='img-wrapper item'>
                    <img src='https://cdn1.smartprix.com/rx-iqbaWsIqS-w1200-h1200/qbaWsIqS.jpg' alt='' className='cart' height={50} />
                </div>
                <div className='text-wrapper item'>
                    <span>
                        I-pho
                    </span>
                    <span>
                        Price: $1000
                    </span>
                </div>
                <div className='btn-wrapper item'>
                    <button onClick={() => props.addToCartHandler({ price: 1000, name: 'i phone' })}>Add to Cart</button>
                    <button className='removebtn' onClick={() => props.removeToCartHandler({ price: 1000, name: 'i phone' })}>Remove to Cart</button>
                </div>
            </div>
        </div>
    )
}
export default Home
