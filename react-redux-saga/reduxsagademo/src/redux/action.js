import { ADD_TO_CART, REMOVE_TO_CART, EMPTY_TO_CART } from './constant'
export const addToCart = (data) => {
    console.log("action ADDTOCART", data)
    return {
        type: ADD_TO_CART,
        data
    }
}
export const removeToCart = (data) => {
    console.log("action REMOVETOCART", data)
    return {
        type: REMOVE_TO_CART,
        data
    }
}
export const emptyToCart = () => {
    console.log("action EMPTYTOCART")
    return {
        type: EMPTY_TO_CART,

    }
}

