import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./MetaMaskSlice";

export default configureStore({
  reducer: {
    wallet: walletReducer,
  },
});
