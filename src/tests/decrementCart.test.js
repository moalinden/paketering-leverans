import storeSlice from "../redux/reducers/storeSlice";
import { decrementItem } from "../redux/actions";

const initialState = {
  storedProducts: [],
  productCount: 0,
  products: [],
  wishList: [],
  total: 0,
};

const occupiedState = {
  storedProducts: [],
  productCount: 1,
  products: [{}, {}],
  wishList: [],
  total: 0,
};

test("should return initial state: ", () => {
  expect(storeSlice(undefined, {})).toEqual(initialState);
});

test("should remove object from products", () => {
  expect(storeSlice(occupiedState, decrementItem([{}]))).toEqual({
    storedProducts: [],
    productCount: 1,
    products: [{}],
    wishList: [],
    total: 0,
  });
});
