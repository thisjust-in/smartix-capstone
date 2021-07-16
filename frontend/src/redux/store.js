import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./MetaMaskSlice";
import eventCardReducer from "./EventCardSlice";
import eventReducer from "./EventListSlice";
import tokenReducer from "./TokenSlice";
import userReducer from "./CheckUserSlice";
export default configureStore({
  reducer: {
    wallet: walletReducer,
    eventCard: eventCardReducer,
    eventlist: eventReducer,
    token: tokenReducer,
    users: userReducer
  },
});
