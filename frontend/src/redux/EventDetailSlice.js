import {
  createSlice
} from '@reduxjs/toolkit'

export const Slice = createSlice({
  name: 'eventdetail',
  initialState: {
    eventName: "",
    eventLocation: "",
    eventPhoto: "",
    eventDescription: "",
    eventDate: "",
    eventCapacity: "",
    eventType: "",
    isOnline: "",
    host: "",
    eventAddress: "",
    hostaddress: "",
    tokenName: "",
    tokenPrice: "",
    tokenQuantity: "",
  },
  reducers: {
    getDetailsFromDB(state, action) {
      state.eventName = action.payload.eventName;
      state.eventLocation = action.payload.eventLocation;
      state.eventPhoto = action.payload.eventPhoto;
      state.eventDescription = action.payload.eventDescription;
      state.eventDate = action.payload.eventDate;
      state.eventCapacity = action.payload.eventCapacity;
      state.eventType = action.payload.eventType;
      state.isOnline = action.payload.isOnline;
      state.host = action.payload.host;
    },
    getDetailsFromBC(state, action) {
      state.eventAddress = action.payload.eventAddress;
      state.hostaddress = action.payload.hostaddress;
      state.tokenName = action.payload.tokenName;
      state.tokenPrice = action.payload.tokenPrice;
      state.tokenQuantity = action.payload.tokenQuantity;
    },
  }
})

export const {
  getDetailsFromDB,
  getDetailsFromBC
} = Slice.actions
export default Slice.reducer