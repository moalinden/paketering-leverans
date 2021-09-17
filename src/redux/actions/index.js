export const addToStore = (payload) => {
  return {
    type: "ADD_TO_STORE",
    value: 1,
    payload: payload,
  };
};

export const decrementItem = (payload) => {
    return {
        type: "DECREMENT_ITEM",
        payload: payload,
    };
};

export const storeWishList = (payload) => {
    return {
        type: "FETCH-WISHLIST",
        payload: payload,
    };
};

export const removeWishList = (payload) => {
    return {
        type: "REMOVE_WISHLIST",
        payload: payload,
    };
};

export const deleteProduct = (cartItemID) => {
    return {
        type: "DELETE_PRODUCT",
        payload: {
            cartItemID: cartItemID,
        },
    };
};

export const editQuantity = (cartItemID, value) => {
    return {
        type: "EDIT_QUANTITY",
        id: cartItemID,
        count: value,
    };
};
export const showItem = (cartItem) => {
    return {
        type: "SHOW_ITEM",
        payload: cartItem,
    };
};
