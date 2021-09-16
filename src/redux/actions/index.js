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
