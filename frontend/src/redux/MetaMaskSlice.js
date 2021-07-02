import { createSlice } from "@reduxjs/toolkit";
import axios from "redaxios";


const initialState = {
  walletAddress: [],
  isLoggedIn: false,
};

export const MetaMaskSlice = createSlice({
  name: "metamaskslice",
  initialState: initialState,
  reducers: {
    addWallet(state, action) {
      state.walletAddress.push(action.payload);
      state.isLoggedIn = action.payload;
    },
  },
});

export const addWalletThunk = (data) => async (dispatch) => {
  //   console.log("adding wallet thunk");
  //   console.log("data", data);
  const newWalletAddress = async () => {
    await axios.post("http://localhost:8080/api/walletId", {
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

export const walletActions = MetaMaskSlice.actions;
export default MetaMaskSlice.reducer;
