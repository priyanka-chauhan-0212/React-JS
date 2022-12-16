import { ADD_TO_CART } from './constant'
import { REMOVE_TO_CART } from './constant';
import { EMPTY_TO_CART } from './constant';

export const cartData = (data = [], action) => {
    // if (action.type === "ADD_TO_CART") {
    //     console.log("reducer called", action)
    //     return action.data

    // } else {
    //     return "no action match"
    // }
    switch (action.type) {
        case ADD_TO_CART:
            console.log("ADD_TO_CART CONDITION", action)
            return [action.data, ...data]
        case REMOVE_TO_CART:
            console.log("REMOVE_TO_CART CONDITION", action)
            // data.length = data.length ? data.length - 1 : [];
            const remaingItem = data.filter((item) => item.id !== action.data);
            console.log("remaingItem", remaingItem)
            return [...remaingItem]
        case EMPTY_TO_CART:
            console.log("EMPTY_TO_CART CONDITION", action)
            data = []
            return [...data]
        default:
            return data;
    }
}