import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { dentaidApi } from "../api/dentaidApi";
import { onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {
  const { status, user, messageError } = useSelector(
    (state) => state.authSlice
  );
  const dispatch = useDispatch();

  const startLogin = async ({ email, password }) => {
    dispatch(onChecking());

    try {
      const { data } = await dentaidApi.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      dispatch(
        onLogin({
          email: email,
          id: data.existingUser.id,
          name: data.existingUser.fullName,
        })
      );

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
          text: "Something went wrong. Please try again later.",
        });
      }

      dispatch(onLogout({ message: error.message }));
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
  };

  const startRegisterUser = async ({
    fullName,
    email,
    password,
    gender,
    identification,
    phoneNumber,
    emergencyPhoneNumber,
    address,
    dateOfBirth,
    role,
  }) => {
    dispatch(onChecking());
    try {
      const { data } = await dentaidApi.post("/auth/register", {
        fullName,
        email,
        password,
        gender,
        identification,
        phoneNumber,
        emergencyPhoneNumber,
        address,
        dateOfBirth,
        role,
      });
      localStorage.setItem("token", data.token);
      dispatch(
        onLogin({
          email: data.user.email,
          id: data.user.id,
          name: data.user.name,
        })
      );
      return data.user.id;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      }
      dispatch(onLogout({ message: error.message }));
    }
  };
  const startRegisterDentist = async ({
    medicalLicenseNumber,
    filteredSpeciality: speciality,
    university,
    workplace,
    yearsOfExperience,
    user,
  }) => {
    try {
      const { data } = await dentaidApi.post("/user/dentist", {
        medicalLicenseNumber,
        speciality,
        university,
        workplace,
        yearsOfExperience,
        user,
      });
      dispatch(onLogin({ dentistId: data.dentist.user }));
      return data.dentist.user;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      }
      dispatch(onLogout({ message: error.message }));
    }
  };
  const startRegisterPatient = () => {};

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        dispatch(onChecking());
        const { data } = await dentaidApi.post("auth/renew", {
          token,
        });
        console.log(data);

        if (data?.token) {
          localStorage.setItem("token", data.token);
          dispatch(
            onLogin({ email: data.email, name: data.name, id: data.id })
          );
          return;
        }
        return;
      } catch (error) {
        console.error("Error renewing token:", error);
      }
    }

    dispatch(onLogout());
  };

  return {
    /* Properties */
    status,
    user,
    messageError,
    /* Methods */
    startLogin,
    startLogout,
    startRegisterUser,
    startRegisterDentist,
    startRegisterPatient,
    checkAuthToken,
  };
};
