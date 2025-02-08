import dayjs from "dayjs";
import { useState } from "react";

const initialScheduleData = {
  Monday: {
    start: dayjs("2023-01-01 09:00"),
    end: dayjs("2023-01-01 18:00"),
    isNonWorking: false,
    breaks: [],
  },
  Tuesday: {
    start: dayjs("2023-01-02 09:00"),
    end: dayjs("2023-01-02 18:00"),
    isNonWorking: false,
    breaks: [],
  },
  Wednesday: {
    start: dayjs("2023-01-03 09:00"),
    end: dayjs("2023-01-03 18:00"),
    isNonWorking: false,
    breaks: [],
  },
  Thursday: {
    start: dayjs("2023-01-04 09:00"),
    end: dayjs("2023-01-04 18:00"),
    isNonWorking: false,
    breaks: [],
  },
  Friday: {
    start: dayjs("2023-01-05 09:00"),
    end: dayjs("2023-01-05 18:00"),
    isNonWorking: false,
    breaks: [],
  },
  Saturday: {
    start: dayjs("2023-01-06 09:00"),
    end: dayjs("2023-01-06 18:00"),
    isNonWorking: false,
    breaks: [],
  },
  slotDuration: 30,
};

export const useScheduleState = () => {
  const [formState, setFormState] = useState(initialScheduleData);

  const onInputChange = (event) => {
    if (event?.target) {
      const { name, value, type, checked } = event.target;

      if (name === "slotDuration") {
        setFormState((prev) => ({
          ...prev,
          [name]: value,
        }));
      } else {
        const [day, field] = name.split(".");

        const finalValue = type === "checkbox" ? checked : value;

        setFormState((prev) => ({
          ...prev,
          [day]: {
            ...prev[day],
            [field]: finalValue,
          },
        }));
      }
    }
  };

  const updateDayBreaks = (day, newBreaks) => {
    setFormState((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        breaks: newBreaks,
      },
    }));
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
    updateDayBreaks,
    /*  */
  };
};
