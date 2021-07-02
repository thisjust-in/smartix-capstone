import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./MetaMaskSlice";
import eventCardReducer from "./EventCardSlice";
import eventReducer from "./EventListSlice";
import tokenReducer from "./TokenSlice";

export default configureStore({
  reducer: {
    wallet: walletReducer,
    eventCard: eventCardReducer,
    event: eventReducer,
    token: tokenReducer,
  },
});
