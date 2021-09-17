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
