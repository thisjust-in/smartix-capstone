import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./MetaMaskSlice";
import eventReducer from './EventListSlice'
import tokenReducer from './TokenSlice'

export default configureStore({
  reducer: {
    wallet: walletReducer,
    event: eventReducer,
    token: tokenReducer
  },
});
