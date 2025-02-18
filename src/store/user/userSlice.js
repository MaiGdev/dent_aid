import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    updatedUser: null,
    updatedDentist: null,
    updatedPatient: null,
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
    onUpdateDentist: (state, { payload }) => {
      state.updatedDentist = payload;
    },
    onUpdatePatient: (state, { payload }) => {
      state.updatedPatient = payload;
    },
  },
});

export const {
  updatedUser,
  updatedDentist,
  updatedPatient,
  admin,
  dentists,
  patients,
  onSetUsers,
  onUpdateUser,
  onUpdateDentist,
  onUpdatePatient,
} = UserSlice.actions;
