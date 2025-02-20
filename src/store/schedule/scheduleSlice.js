import { createSlice } from "@reduxjs/toolkit";

const initialScheduleData = {
  Monday: {
    start: "00:00",
    end: "00:00",
    isNonWorking: false,
    breaks: [],
  },
  Tuesday: {
    start: "00:00",
    end: "00:00",
    isNonWorking: true,
    breaks: [],
  },
  Wednesday: {
    start: "00:00",
    end: "00:00",
    isNonWorking: true,
    breaks: [],
  },
  Thursday: {
    start: "00:00",
    end: "00:00",
    isNonWorking: true,
    breaks: [],
  },
  Friday: {
    start: "00:00",
    end: "00:00",
    isNonWorking: true,
    breaks: [],
  },
  Saturday: {
    start: "00:00",
    end: "00:00",
    isNonWorking: true,
    breaks: [],
  },
  slotDuration: undefined,
};

export const ScheduleSlice = createSlice({
  name: "Schedule",
  initialState: {
    schedule: [],
    formState: initialScheduleData,
  },
  reducers: {
    onGetScheduleFromApi: (state, { payload }) => {
      state.schedule = payload;
    },
    updateFormState: (state, { payload }) => {
      const { name, value } = payload;

      if (name === "slotDuration") {
        state.formState.slotDuration = value;
      } else {
        if (name != "" && name !== undefined) {
          const [day, field] = name?.split(".");
          const formattedTime = value;
          console.log(formattedTime);
          state.formState[day][field] = formattedTime;
        } else {
          const entries = Object.entries(payload);
          for (const [day, payload] of entries) {
            state.formState[day] = payload;
          }
        }
      }
    },

    updateDayBreaks: (state, { payload }) => {
      const { day, breaks } = payload;
      console.log(state.formState[day]);
      state.formState[day].breaks = breaks;
    },

    resetFormState: (state) => {
      state.formState = initialScheduleData;
    },
    resetScheduleState: (state) => {
      state.schedule = [];
    },
  },
});

export const {
  onGetScheduleFromApi,
  updateFormState,
  updateDayBreaks,
  resetFormState,
  resetScheduleState,
} = ScheduleSlice.actions;
