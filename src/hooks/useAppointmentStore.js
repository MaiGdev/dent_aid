import { useState } from "react";
import Swal from "sweetalert2";
import { dentaidApi } from "../api/dentaidApi";

export const useAppointmentStore = () => {
  const [appointments, setAppointments] = useState();

  const startPatientAppointment = async (id, date) => {
    try {
      const appointment = await dentaidApi.get(`/appointments/${id}`);
      return appointment.data;
    } catch (error) {
      console.log(error);
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
        status: "scheduled",
      });

      return appointment;
    } catch (error) {
      console.log(error);
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

  const startGetAppointments = async (status) => {
    try {
      const appointments = await dentaidApi.get("/appointments", {
        params: { status: status },
      });
      if (!appointments) return false;
      setAppointments(appointments.data);
      return true;
    } catch (error) {
      console.log(error);
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

  const startGetPatientAppointments = async (id) => {
    try {
      const appointments = await dentaidApi.get(`/appointments/patient/${id}`);

      if (!appointments || typeof appointments.data === "string") return;

      setAppointments(appointments.data);
      return true;
    } catch (error) {
      console.log(
        "Error fetching patient appointments:",
        error.response?.data || error.message
      );
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      }
    }
  };

  const startGetDentistAppointments = async (id) => {
    try {
      const appointments = await dentaidApi.get(`/appointments/dentist/${id}`);
      if (!appointments) return false;
      setAppointments(appointments.data);
      return true;
    } catch (error) {
      console.log(
        "Error fetching patient appointments:",
        error.response?.data || error.message
      );
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
    appointments,
    startPatientAppointment,
    startRegisterAppointment,
    startGetAppointments,
    startGetPatientAppointments,
    startGetDentistAppointments,
  };
};
