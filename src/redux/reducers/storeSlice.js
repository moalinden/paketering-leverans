const initialState = {
    storedProducts: JSON.parse(localStorage.getItem("/api/products")),
    productCount: 0,
    products: [],
};
const storeSlice = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_STORE":
            let trueOrFalse = false;
            state.products.forEach((element) => {
                if (element.id === action.payload.id) {
                    trueOrFalse = true;
                }
                if (element.id !== action.payload.id) {
                    return false;
                }
            });

            if (trueOrFalse) {
                let count = action.payload.count;
                return {
                    ...state,
                    productCount: state.productCount + 1,
                    products: state.products.map((object) => {
                        if (object.id === action.payload.id) {
                            return {
                                ...object,
                                count: count + 1
                            };
                        } else {
                            return {
                                ...object
                            };
                        }
                    }),
                };
            } else {
                return {
                    ...state,
                    productCount: state.productCount + 1,
                    products: [...state.products, action.payload],
                };
            }
            case "DELETE_PRODUCT":
                return {
                    ...state,
                    products: state.products.filter((cartItem) => cartItem.id !== action.payload.id),
                };
            case "EDIT_QUANTITY":
                return {
                    ...state,
                    products: state.products.map(cartItem => cartItem.id === action.payload.id ? {
                            ...cartItem,
                            count: action.payload.count
                        } : cartItem
                    ),
                };
        case "SHOW_ITEM":
            return {
                    ...state,
                    products: state.products.filter((cartItem) => cartItem.id !== action.payload.id),
                };
            case "RESET":
                return (state = 0);
            default:
                return state;
    }
};

export default storeSlice;