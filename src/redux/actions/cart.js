import { ADD_CART, REMOVE_FROM_CART } from "../action-types/cart"


export const addToCart = (cartItem) => async(dispatch) => {
    try {

        dispatch({
            type: ADD_CART,
            payload: cartItem
       })
         
    } catch (error) {
        console.log(error)
     }
}


export const removeFromCart = (id) => async(dispatch) => {

    try {

        dispatch({
            type: REMOVE_FROM_CART,
            payload: id
        })
       
    } catch (error) {
        console.log(error)
   }

}