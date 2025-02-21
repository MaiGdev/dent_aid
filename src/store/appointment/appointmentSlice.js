import { createSlice } from "@reduxjs/toolkit";

export const AppointmentSlice = createSlice({
  name: "Appointment",
  initialState: {
    appointmentDay: null,
    patientAppointments: [],
  },
  reducers: {
    updateAppointmentDayState: (state, { payload }) => {
      state.appointmentDay = payload;
    },
    updateAppointmentsState: (state, { payload }) => {
      state.patientAppointments = payload;
    },
  },
});

export const { updateAppointmentDayState, updateAppointmentsState } =
  AppointmentSlice.actions;
