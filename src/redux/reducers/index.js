import { combineReducers, applyMiddleware, createStore } from "redux";
import storeSlice from "./storeSlice";

const reducers = combineReducers({
  storeSlice,
});

//const middleware = [thunk];

//const store = createStore(
//  reducers,
//  composeWithDevtools(applyMiddleware(...middleware))
//);

export default reducers;
