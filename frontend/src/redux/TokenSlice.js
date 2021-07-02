import {createSlice} from '@reduxjs/toolkit'

export const Slice = createSlice({
  name: 'eventlist',
  initialState: {
    id: '',
    token_name:'',
    price: '',
    quantity: '',
    events_id: '',
  },
  reducers: {
    getTokenDetails(state, action) {
      state.id = action.payload.id
      state.token_name = action.payload.token_name
      state.price = action.payload.price
      state.quantity = action.payload.quantity
      state.events_id = action.payload.events_id
    }
  }
})

export const {
  getTokenDetails,
} = Slice.actions
export default Slice.reducer