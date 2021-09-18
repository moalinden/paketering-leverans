import { ADD_CART, REMOVE_FROM_CART } from "../action-types/cart"

const initialState = {
    cart: []
}


const cartReducer = (state = initialState, action) => {
    

    switch (action.type) {
        case ADD_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(x => x.id !== action.payload)
            };
        default:
            return state;
    }

    
}


export default cartReducer;