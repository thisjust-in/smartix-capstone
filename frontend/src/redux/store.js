import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "./MetaMaskSlice";
import eventCardReducer from "./EventCardSlice";
import eventReducer from "./EventListSlice";
import tokenReducer from "./TokenSlice";
import EventDetailReducer from "./EventDetailSlice";

export default configureStore({
  reducer: {
    wallet: walletReducer,
    eventCard: eventCardReducer,
    eventlist: eventReducer,
    token: tokenReducer,
    eventdetail: EventDetailReducer
  },
});
