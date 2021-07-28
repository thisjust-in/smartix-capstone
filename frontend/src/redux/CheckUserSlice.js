import { createSlice } from "@reduxjs/toolkit";
import web3 from "../web3";
import axios from "redaxios";

export const usersSlice = createSlice({
  name: "userSlice",
  initialState: {
    wallet_id: [],
    userID: [],
    contractAddress: [],
    profilepic: "",
  },
  reducers: {
    getWalletId(state, action) {
      state.wallet_id = action.payload;
    },
    setUserId(state, action) {
      state.userID = action.payload;
    },
    setProfilepic(state, action) {
      state.profilepic = action.payload;
    },
  },
});

export const checkWalletIDThunk = () => async (dispatch) => {
  async function check() {
    let data = await web3.eth.getAccounts();
    if (data[0]) {
      dispatch(checkUserActions.getWalletId(data));
      await axios
        .post(`${process.env.REACT_APP_SERVER}/api/findId`, {
          id: data,
        })
        .then((response) => {
          dispatch(checkUserActions.setUserId(response.data));
          return response.data;
        })
        .then((id) => {
          axios
            .post(`${process.env.REACT_APP_SERVER}/api/getInfo`, { id: id })
            .then((data) => {
              dispatch(
                checkUserActions.setProfilepic(data.data[0].userProfile_pic)
              );
            });
        });
    }
  }
  check();
};

export const checkUserActions = usersSlice.actions;
export default usersSlice.reducer;
