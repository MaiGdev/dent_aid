import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth/authSlice";
import { UserSlice } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    authSlice: AuthSlice.reducer,
    userSlice: UserSlice.reducer,
  },
});
