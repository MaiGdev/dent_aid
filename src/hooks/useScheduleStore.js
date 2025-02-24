import { useState } from "react";
import Swal from "sweetalert2";
import { dentaidApi } from "../api/dentaidApi";
import { useScheduleLogic } from "./useScheduleLogic";

export const useScheduleStore = () => {
  const [schedule, setSchedule] = useState();
  const { formatScheduleDataForAPI } = useScheduleLogic();

  const startGetAvailableSlots = async (dentistId, date) => {
    if (dentistId === "") return setSchedule(undefined);
    let schedule;

    const dayOfWeek = date.day();
    try {
      schedule = await dentaidApi.get("/schedule/availableSlots", {
        params: {
          dentistId: dentistId,
          dayOfWeek: parseInt(dayOfWeek),
        },
      });

      if (schedule) {
        return schedule.data;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      } else {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong reloading your session. Please try again later.",
        });
      }
    }
  };

  const startGetSchedule = async ({ idDentist }) => {
    try {
      const response = await dentaidApi.get(`schedule?dentistId=${idDentist}`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const startRegisterSchedule = async ({ formState, id }) => {
    try {
      const scheduleData = formatScheduleDataForAPI({ formState });

      const formData = {
        schedule: scheduleData,
        dentist: id,
      };
      const response = await dentaidApi.post("/schedule", formData);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const startUpdateSchedule = async ({ formState, id }) => {
    try {
      const scheduleData = formatScheduleDataForAPI({ formState });
      const formData = {
        schedule: scheduleData,
        dentist: id,
      };
      console.log(formData);
      const response = await dentaidApi.put("/schedule", formData);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  return {
    schedule,
    startGetAvailableSlots,
    startGetSchedule,
    startRegisterSchedule,
    startUpdateSchedule,
  };
};
