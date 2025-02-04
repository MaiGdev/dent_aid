import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    admin: [],
    dentists: [],
    patients: [],
  },
  reducers: {
    onSetUsers: (state, { payload }) => {
      const { admin = [], dentists = [], patients = [] } = payload;
      state.admin = admin;
      state.dentists = dentists;
      state.patients = patients;
    },
  },
});

export const { admin, dentists, patients, onSetUsers } = UserSlice.actions;
