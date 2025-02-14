import { useState } from "react";
import Swal from "sweetalert2";
import { dentaidApi } from "../api/dentaidApi";

export const useScheduleAppointmentApi = () => {
  const [schedule, setSchedule] = useState();
  const [appointments, setAppointments] = useState();

  const startGetDentistSchedule = async (dentistId) => {
    if (dentistId === "") return setSchedule(undefined);
    try {
      const schedule = await dentaidApi.get("schedule", {
        params: {
          dentistId: dentistId,
        },
      });

      if (!schedule) return false;

      setSchedule(schedule.data);
      return true;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong reloading your session. Please try again later.",
        });
      }
    }
  };
  const startGetAvailableSlots = async (dentistId, date) => {
    if (dentistId === "") return setSchedule(undefined);
    /*     if (date === "") return; */
    let schedule;

    const dayOfWeek = date.day();
    try {
      schedule = await dentaidApi.get("/schedule/availableSlots", {
        params: {
          dentistId: dentistId,
          dayOfWeek: dayOfWeek,
        },
      });

      if (schedule) {
        return setSchedule(schedule.data);
      } else {
        schedule = await startGetDentistSchedule(dentistId);
        if (schedule) {
          return setSchedule(schedule.data);
        } else {
          return setSchedule([]);
        }
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong reloading your session. Please try again later.",
        });
      }
    }
  };

  const startRegisterAppointment = async (formData) => {
    const { dentistId, patientId, date, start, end, description, dayOfWeek } =
      formData;
    try {
      const appointment = await dentaidApi.post("/appointments", {
        dentistId: dentistId,
        patientId: patientId,
        date: date,
        dayOfWeek: dayOfWeek,
        start: start,
        end: end,
        description: description,
        status: "pending",
      });

      return appointment;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong reloading your session. Please try again later.",
        });
      }
    }
  };

  const startPatientAppointment = async (id) => {
    try {
      const appointment = await dentaidApi.get(`/appointments/${id}`);
      return appointment.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong reloading your session. Please try again later.",
        });
      }
    }
  };

  const startAppointments = async (status) => {
    try {
      const appointments = await dentaidApi.get("/appointments", {
        params: { status: status },
      });
      if (!appointments) return false;
      setAppointments(appointments.data);
      return true;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong reloading your session. Please try again later.",
        });
      }
    }
  };

  return {
    schedule,
    appointments,
    startGetDentistSchedule,
    startGetAvailableSlots,
    startRegisterAppointment,
    startPatientAppointment,
    startAppointments,
  };
};
