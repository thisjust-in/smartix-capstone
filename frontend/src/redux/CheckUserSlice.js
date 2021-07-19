import { createSlice } from "@reduxjs/toolkit";
import web3 from "../web3";
import axios from "redaxios";

export const usersSlice = createSlice({
  name: "userSlice",
  initialState: {
    wallet_id: [],
    userID: [],
  },
  reducers: {
    getWalletId(state, action) {
      state.wallet_id = action.payload;
    },
    setUserId(state, action) {
      state.userID = action.payload;
    },
  },
});

export const checkWalletIDThunk = () => async (dispatch) => {
  let data;
  async function check() {
    data = await web3.eth.getAccounts();
    dispatch(checkUserActions.getWalletId(data));
    axios
      .post("http://localhost:8080/api/findId", {
        id: data,
      })
      .then((response) => {
        dispatch(checkUserActions.setUserId(response.data));
      });
  }
  check();
};

export const checkUserActions = usersSlice.actions;
export default usersSlice.reducer;
