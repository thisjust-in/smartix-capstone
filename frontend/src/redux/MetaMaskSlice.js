import { createSlice } from "@reduxjs/toolkit";
import axios from "redaxios";

const initialState = {
  walletAddress: [],
  isLoggedIn: null,
};

export const MetaMaskSlice = createSlice({
  name: "metamaskslice",
  initialState: initialState,
  reducers: {
    addWallet(state, action) {
      state.walletAddress.push(action.payload);
    },
    checkLogin(state, action) {
      state.isLoggedIn = window.ethereum.selectedAddress;
    },
  },
});

export const addWalletThunk = (data) => async (dispatch) => {
  //   console.log("adding wallet thunk");
  //   console.log("data", data);
  const newWalletAddress = async () => {
    await axios.post(`${process.env.REACT_APP_SERVER}/api/walletId`, {
      wallet_id: data,
    });
  };
  try {
    await newWalletAddress();
    dispatch(
      walletActions.addWallet({
        wallet_id: data,
      })
    );
  } catch (error) {
    console.log("error", error);
  }
};

export const checkLoginThunk = () => async (dispatch) => {
  try {
    dispatch(walletActions.checkLogin());
  } catch (err) {
    console.log("error", err);
  }
};

export const walletActions = MetaMaskSlice.actions;
export default MetaMaskSlice.reducer;
