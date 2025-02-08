import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    status: "checking", 
    user: {},
    messageError: "",
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.messageError = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.messageError = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.messageError = { payload };
    },
    clearErrorMessage: () => {
      state.messageError = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  AuthSlice.actions;
