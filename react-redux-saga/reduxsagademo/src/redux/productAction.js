import { PRODUCT_LIST, SEARCH_PRODUCT } from './constant'
export const productList = () => {
    // let data = "hello"
    // let data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    // data = await data.json()
    // console.log("action ADDTOCART", data)
    return {
        type: PRODUCT_LIST

    }
}
export const productSearch = (query) => {

    return {
        type: SEARCH_PRODUCT,
        query,

    }
}
