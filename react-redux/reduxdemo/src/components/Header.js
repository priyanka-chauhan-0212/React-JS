import React from 'react'

function Header(props) {
    console.warn("header", props.data)

    return (
        <div>
            <div className='add-to-cart'>
                <span className='cart-count'>{props.data.length}</span>

                <img src='https://cdn3.iconfinder.com/data/icons/e-commerce-2-1/256/2-512.png' alt='' />
            </div>


        </div>
    )
}
export default Header
