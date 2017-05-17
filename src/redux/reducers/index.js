import { combineReducers } from "redux"
import user from "./userReducer"
import poll from "./pollReducer"

export default combineReducers({
  user,
  poll
});
