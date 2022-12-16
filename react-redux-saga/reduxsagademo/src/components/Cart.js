import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
    const cartData = useSelector((state) => state.cartData);
    let amount = cartData.length && cartData.map(item => item.price).reduce((prev, next) => prev + next)
    console.log(amount)

    return (
        <div >
            <Link to="/">
                Go to Product List
            </Link>
            <h1>Cart Page</h1>
            <div className="cart-page-container">
                <table>
                    <tr>
                        <td>Name</td>
                        <td>Color</td>
                        <td>Price</td>
                        <td>Brand</td>
                        <td>Category</td>
                    </tr>
                    {

                        cartData.map((item) =>
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.color}</td>
                                <td>{item.price}</td>
                                <td>{item.brand}</td>
                                <td>{item.category}</td>
                            </tr>
                        )

                    }
                </table>
                <div className="price-details">
                    <div className="adjust-price"><p>Amount</p><p>{amount}</p></div>
                    <div className="adjust-price"><p>Discount</p><p>{amount / 10}</p></div>
                    <div className="adjust-price"><p>Tax</p><p>0000</p></div>
                    <div className="adjust-price"><p>Total</p><p>{amount - amount / 10}</p></div>
                </div>

            </div>

        </div>
    );
}

export default Cart;
