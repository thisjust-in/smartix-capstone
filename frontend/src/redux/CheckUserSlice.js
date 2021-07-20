import { createSlice } from "@reduxjs/toolkit";
import web3 from "../web3";
import axios from "redaxios";

export const usersSlice = createSlice({
  name: "userSlice",
  initialState: {
    wallet_id: [],
    userID: [],
    contractAddress: [],
  },
  reducers: {
    getWalletId(state, action) {
      state.wallet_id = action.payload;
    },
    setUserId(state, action) {
      state.userID = action.payload;
    },
    setContractAddress(state, action) {
      state.contractAddress = action.payload;
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

export const getContractAddress = () => (dispatch) => {
  async function findId() {
    let data = await web3.eth.getAccounts();
    let test = dispatch(checkUserActions.getWalletId(data));
    let walletID = test.payload[0];
    let id = dispatch(checkUserActions.setUserId(walletID));

    console.log("wkjfbweb", id);
    axios
      .post("http://localhost:8080/api/findContractAddress", {
        id: id,
      })
      .then((response) => {
        dispatch(checkUserActions.setContractAddress(response));
      });
  }
  findId();
};

export const checkUserActions = usersSlice.actions;
export default usersSlice.reducer;
