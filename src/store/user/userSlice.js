import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    updatedUser: null,
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
    onUpdateUser: (state, { payload }) => {
      state.updatedUser = payload;
    },
  },
});

export const { updatedUser, admin, dentists, patients, onSetUsers, onUpdateUser } =
  UserSlice.actions;
