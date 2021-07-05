import {
  createSlice
} from '@reduxjs/toolkit'

export const Slice = createSlice({
  name: 'eventlist',
  initialState: {
    event_list: [],
  },
  reducers: {
    getEventDetails(state, action) {
      state.event_list = action.payload
    }
  }
})

export const {
  getEventDetails,
} = Slice.actions
export default Slice.reducer