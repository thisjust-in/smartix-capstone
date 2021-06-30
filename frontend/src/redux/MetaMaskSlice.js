import { createSlice } from "@reduxjs/toolkit";
import axios from "redaxios";

const initialState = {
  walletAddress: [],
};

export const MetaMaskSlice = createSlice({
  name: "metamaskslice",
  initialState: initialState,
  reducers: {
    addWallet(state, action) {
      console.log("Payload", action.payload);
      state.walletAddress.push(action.payload);
    },
  },
});

export const addWalletThunk = (data) => async (dispatch) => {
  console.log("adding wallet thunk");
  console.log("data", data);
  const newWalletAddress = async () => {
    return axios.post("http://localhost:8080/api/walletId", {
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
  } catch (err) {
    console.log(err, "err");
  }
};

export const walletActions = MetaMaskSlice.actions;
export default MetaMaskSlice.reducer;
