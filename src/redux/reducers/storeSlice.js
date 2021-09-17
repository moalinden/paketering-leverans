const initialState = {
  storedProducts: JSON.parse(localStorage.getItem("/api/products")),
  productCount: 0,
  products: [],
  wishList: [],
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
              return { ...object, count: count + 1 };
            } else {
              return { ...object };
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
    case "DECREMENT_ITEM":
      let count = action.payload.count;
      if (count > 0 && state.productCount > 0) {
        return {
          ...state,
          productCount: state.productCount - 1,
          products: state.products.map((object) => {
            if (object.id === action.payload.id) {
              return { ...object, count: count - 1 };
            }
          }),
        };
      } else {
        return state;
      }
    case "FETCH-WISHLIST":
      return {
        ...state,
        wishList: action.payload,
      };

    case "REMOVE_WISHLIST":
      const wishListToRemove = state.wishList.find(
        (element) => element === action.payload
      );
      if (!wishListToRemove) {
        return {
          ...state,
          error: "No matching key was found",
        };
      }
      return {
        ...state,
        keyToRemove: wishListToRemove,
      };
    case "RESET":
      return (state = 0);
    default:
      return state;
  }
};

export default storeSlice;
