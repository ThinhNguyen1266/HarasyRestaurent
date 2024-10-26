import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      accessToken: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload.data.user;
      state.login.accessToken = action.payload.data.accessToken;
    },
    loginFail: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    newAccessToken: (state, action) => {
      state.login.accessToken = action.payload.data.accessToken;
    },
  },
});
const persistConfig = {
  key: "auth",
  storage,
};

export const { loginStart, loginSuccess, loginFail, newAccessToken } =
  authSlice.actions;

export default persistReducer(persistConfig, authSlice.reducer);
