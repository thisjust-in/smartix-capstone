import { createSlice } from "@reduxjs/toolkit";
import axios from "redaxios";

const initialState = {
  eventHost: "",
  eventCount: 1,
  loading: false,
  error: "",
};

export const eventCardSlice = createSlice({
  name: "eventCard",
  initialState: initialState,
  reducers: {
    getEventHostSuccess(state, action) {
      state.eventHost = action.payload;
      state.loading = false;
    },
    getEventHostRequest(state, action) {
      state.loading = true;
    },
    getEventHostFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getEventHostThunk = () => async (dispatch) => {
  dispatch(eventActions.getEventHostRequest());
  const getHost = () => {
    return axios.get("http://localhost:8080/api/eventHost");
  };
  try {
    let response = await getHost();
    console.log(response.data);
    dispatch(eventActions.getEventHostSuccess(response.data));
  } catch (err) {
    console.log("err", err);
    dispatch(eventActions.getEventHostFailure(err.message));
  }
};

export const eventActions = eventCardSlice.actions;
export default eventCardSlice.reducer;
