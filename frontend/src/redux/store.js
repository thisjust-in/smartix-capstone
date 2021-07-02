import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./MetaMaskSlice";
import eventCardReducer from "./EventCardSlice";

export default configureStore({
  reducer: {
    wallet: walletReducer,
    eventCard: eventCardReducer,
  },
});
