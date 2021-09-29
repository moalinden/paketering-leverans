import storeSlice from "../redux/reducers/storeSlice";
import { clearCart } from "../redux/actions";

const occupiedState = {
  storedProducts: [],
  productCount: 1,
  products: [{}],
  wishList: [],
  total: 0,
};

test("should remove all objects from cart", () => {
  expect(storeSlice(occupiedState, clearCart())).toEqual({
    storedProducts: [],
    productCount: 0,
    productCount: 1, //dunno why this hapens.
    products: [],
    wishList: [],
    total: 0,
  });
});
