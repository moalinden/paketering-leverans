const initialState = {
  storedProducts: [],
  productCount: 0,
  products: [],
  wishList: [],
  total: 0,
};
const storeSlice = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_STORE":
      return {
        ...state,
        storedProducts: action.payload,
      };

    case "ADD_TO_STORE":
      let trueOrFalse = false;
      state.products.forEach((element) => {
        if (element.id === action.payload.id) {
          trueOrFalse = true;
        } else {
          trueOrFalse = false;
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
                count: count + 1,
                total: state.total + action.payload.price,
              };
            } else {
              return {
                ...object,
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

    case "DECREMENT_ITEM":
      let count = action.payload.count;
      if (count > 0 && state.productCount > 0) {
        return {
          ...state,
          productCount: state.productCount - 1,
          products: state.products.map((object) => {
            if (object.id === action.payload.id) {
              return {
                ...object,
                count: count - 1,
              };
            } else {
              return object;
            }
          }),
        };
      } else {
        return {
          ...state,
          products: state.products.filter(
            (element) => element.id !== action.payload.id
          ),
        };
      }
    case "LOAD_WISHLIST":
      return {
        ...state,
        wishList: [...state.wishList, action.payload],
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

    case "EMPTY_CART":
      return {
        ...state,
        products: [],
      };

    case "DELETE_FROM_CART":
      return {
        ...state,
        products: state.products.filter(
          (cartItem) => cartItem !== action.payload
        ),

        productCount: state.productCount - action.payload.count,
      };

    case "REMOVE_WISHLIST":
      return {
        ...state,
        wishList: [],
      };

    case "RESET":
      return (state = 0);
    default:
      return state;
  }
};

export default storeSlice;
