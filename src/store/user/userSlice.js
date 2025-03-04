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
    userUpdateErrors: {
      fullName: "",
      email: "",
      identification: "",
      phoneNumber: "",
      gender: "",
      dateOfBirth: "",
      emergencyPhoneNumber: "",
      address: "",
    },
    dentistUpdateErrors: {
      speciality: "",
      workplace: "",
      university: "",
      yearsOfExperience: "",
      medicalLicenseNumber: "",
    },
    patientUpdateErrors: {
      bloodType: "",
      knownAllergies: "",
      medicalConditions: "",
    },
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
    onSetUserUpdateErrors: (state, { payload }) => {
      state.userUpdateErrors = payload;
    },
    onSetDentistUpdateErrors: (state, { payload }) => {
      state.dentistUpdateErrors = payload;
    },
    onSetPatientUpdateErrors: (state, { payload }) => {
      state.patientUpdateErrors = payload;
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
  onSetUserUpdateErrors,
  onSetDentistUpdateErrors,
  onSetPatientUpdateErrors,
} = UserSlice.actions;
