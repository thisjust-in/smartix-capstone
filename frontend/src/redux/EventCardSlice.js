import { createSlice } from "@reduxjs/toolkit";
import axios from "redaxios";

const initialState = {
  eventHost: [],
  eventCount: [],
  loading: false,
  allEvent: [],
  error: "",
};

export const getAllEventThunk = () => async (dispatch) => {
  const getAllEvents = async () => {
    return axios.get(`${process.env.REACT_APP_SERVER}/api/eventHost`);
  };
  try {
    let response = await getAllEvents();
    dispatch(eventActions.getEvents(response.data));
  } catch (error) {
    console.log(error, "err");
  }
};

export const getEventHostThunk = () => async (dispatch) => {
  dispatch(eventActions.getEventHostRequest());
  const getHost = () => {
    return axios.get(`${process.env.REACT_APP_SERVER}/api/eventHost`);
  };
  try {
    let response = await getHost();
    dispatch(eventActions.getEventHostSuccess(response.data));
  } catch (err) {
    console.log("err", err);
    dispatch(eventActions.getEventHostFailure(err.message));
  }
};

export const eventCardSlice = createSlice({
  name: "eventCard",
  initialState: initialState,
  reducers: {
    getEvents(state, action) {
      state.allEvent.push(action.payload);
    },
    getEventHostSuccess(state, action) {
      let allEvent = action.payload;
      state.eventHost = allEvent;

      let counted = allEvent.reduce((allEvent, event) => {
        if (event.username in allEvent) {
          allEvent[event.username].count++;
        } else {
          allEvent[event.username] = {
            count: 1,
            pic: event.eventPhoto,
            id: event.id,
          };
        }

        return allEvent;
      }, {});
      state.eventCount = counted;
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

export const eventActions = eventCardSlice.actions;
export default eventCardSlice.reducer;
