import { createSlice } from "@reduxjs/toolkit";
import axios from "redaxios";

const initialState = {
  eventHost: "",
  eventCount: "",
};

export const eventCardSlice = createSlice({
  name: "eventCard",
  initialState: initialState,
  reducers: {
    getEventHost(state, action) {
      state.eventHost = action.payload;
    },
  },
});

export const getEventHostThunk = async () => {
  const getEventHost = () => {
    return axios.get("http://localhost:8080/api/eventHost");
  };
  try {
    let response = await getEventHost();
    dispatch(linkActions.getEventHost(response.data));
  } catch (err) {
    console.log("err", err);
  }
};

export const eventActions = eventCardSlice.actions;
export default eventCardSlice.reducer;
