import { createStore, combineReducers } from "redux";
import { roomReducer } from "./roomSlice";
import { gameLogReducer } from "./gameLogSlice";

// by default switch cases, combineReducers returns the state tree:
// {gameLog: [...], app:{...}}
const rootReducer = combineReducers({
  room: roomReducer,
  gameLog: gameLogReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
