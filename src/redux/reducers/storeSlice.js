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
        if (
          (count > 0 && state.productCount > 0) ||
          (count < 0 && state.productCount < 0)
        ) {
          const list = state.products.map((object) => {
            if (object.id === action.payload.id) {
              return {
                ...object,
                count: count - 1,
              };
            }
          });
          return {
            ...state,
            productCount: state.productCount - 1,
            products: state.products
              .map((object) => {
                if (object.id === action.payload.id) {
                  return {
                    ...object,
                    count: count - 1,
                  };
                } else {
                  return object;
                }
              })
              .filter((cartItem) => cartItem.count !== 0),
          };
        } else {
          return state;
        }
        case "FETCH-WISHLIST":
          return {
            ...state,
            wishList: action.payload,
          };

        case "REMOVE_WISHLIST": {
          const wishListToRemove = state.wishList.find(
            (element) => element === action.payload
          );

          let {
            storedProducts,
            wishList
          } = state;
          let product = storedProducts.find((item) => item.id === action.payload.id);
          if (product) {
            product['isFavorite'] = false;
            console.log(storedProducts, product);
            console.log(wishList, "wishList");
            for (let i = 0; i < wishList.length; i++) {
              if (wishList[i].id === action.payload.id) {
                wishList.splice(i, 1);
                break;
              }
            }

            return {
              ...state,
              storedProducts: storedProducts,
              wishList: wishList
            };
          }
          return state;
        }

        case "EMPTY_CART":
          return {
            ...state,
            products: [],
          };

        case "DELETE_FROM_CART":
          return {
            ...state,
            products: [
                state.products.filter((cartItem) => cartItem !== action.payload),
              ],
              productCount: state.productCount - action.payload.count,
          };

        case "MARK_FAV_IN_CART":
          let {
            storedProducts, wishList
          } = state;
          let product = storedProducts.find((item) => item.id === action.payload.id);
          if (product) {
            product['isFavorite'] = true;
            console.log(storedProducts, wishList, "wishList");
            wishList.push(product);
            return {
              ...state,
              storedProducts: storedProducts,
              wishList: wishList
            };
          }
          return state;

        case "RESET":

          return (state = 0);
        default:
          return state;
  }
};

export default storeSlice;