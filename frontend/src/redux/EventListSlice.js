import {createSlice} from '@reduxjs/toolkit'

export const Slice = createSlice({
  name: 'eventlist',
  initialState: {
    event_name: '',
    location:'',
    event_pic: '',
    description: '',
    event_date: '',
    capacity: '',
    event_type: '',
    isOnline: '',
    artist: '',
    profile_pic: '',
  },
  reducers: {
    getEventDetails(state, action) {
      state.event_name = action.payload.name
      state.location = action.payload.location
      state.event_pic = action.payload.Event_picture
      state.description = action.payload.description
      state.event_date = action.payload.event_date
      state.capacity = action.payload.capacity
      state.event_type = action.payload.event_type
      state.isOnline = action.payload.isOnline
      state.event_price = action.payload.event_price
      state.artist = action.payload.users_id
      state.profile_pic = action.payload.profile_pic
    }
  }
})

export const {
  getEventDetails,
} = Slice.actions
export default Slice.reducer