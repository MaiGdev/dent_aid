import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth/authSlice";
import { UserSlice } from "./user/userSlice";
import { ScheduleSlice } from "./schedule/scheduleSlice";
import { AppointmentSlice } from "./appointment/appointmentSlice";

export const store = configureStore({
  reducer: {
    authSlice: AuthSlice.reducer,
    userSlice: UserSlice.reducer,
    scheduleSlice: ScheduleSlice.reducer,
    appointmentSlice: AppointmentSlice.reducer,
  },
});
