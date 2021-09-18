import { combineReducers } from "redux";
import cartReducer from "./cart";
import storeSlice from "./storeSlice";

const reducers = combineReducers({
  storeSlice,
  cart: cartReducer
});

export default reducers;
