import Swal from "sweetalert2";
import { dentaidApi } from "../api/dentaidApi";

export const useAppointmentStore = () => {
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

  return {
    startPatientAppointment,
  };
};
