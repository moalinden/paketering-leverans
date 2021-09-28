import storeSlice from "../redux/reducers/storeSlice";
import { initialStore, addToStore } from "../redux/actions";

const initialState = {
  storedProducts: [],
  productCount: 0,
  products: [],
  wishList: [],
  total: 0,
};

test("should return initial state: ", () => {
  expect(storeSlice(undefined, {})).toEqual(initialState);
});

test("should add objects to storedProducts", () => {
  expect(storeSlice(initialState, initialStore([{}, {}]))).toEqual({
    storedProducts: [{}, {}],
    productCount: 0,
    products: [],
    wishList: [],
    total: 0,
  });
});

test("should add objects to products-array and value to product-count", () => {
  expect(storeSlice(initialState, addToStore([{}]))).toEqual({
    storedProducts: [],
    productCount: 1,
    products: [[{}]],
    wishList: [],
    total: 0,
  });
});

const occupiedState = {
  storedProducts: [],
  productCount: 1,
  products: [[{}]],
  wishList: [],
  count: 1,
  total: 3,
};
test("should add objets to occupied products-array and count", () => {
  expect(storeSlice(occupiedState, addToStore([{}]))).toEqual({
    storedProducts: [],
    productCount: 2,
    products: [{ 0: {}, count: NaN, total: NaN }],
    wishList: [],
    total: 4,
    total: 3,
    count: 2,
    count: 1,
  });
});

// test("should add objets to occupied products-array and count", () => {
//   expect(storeSlice(occupiedState, addToStore([{}]))).toEqual({
//     storedProducts: [],
//     productCount: 2,
//     products: [{ 0: {}, 1: 1, count: NaN, total: NaN }],
//     wishList: [],
//     total: 4,
//     total: 3,
//     count: 2,
//     count: 1,
//   });
// });
