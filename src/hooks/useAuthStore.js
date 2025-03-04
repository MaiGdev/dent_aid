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

      if (data.user.patientId) {
        dispatch(
          onLogin({
            email: email,
            id: data.user.id,
            name: data.user.name,
            role: data.user.role,
            patientId: data.user.patientId,
          })
        );
      }
      if (data.user.dentistId) {
        dispatch(
          onLogin({
            email: email,
            id: data.user.id,
            name: data.user.name,
            role: data.user.role,
            dentistId: data.user.dentistId,
          })
        );
      }
      dispatch(
        onLogin({
          email: email,
          id: data.user.id,
          name: data.user.name,
          role: data.user.role,
        })
      );

      return true;
    } catch (error) {
      console.log({ message: error.response.data.message });

      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      } else {
        if (error.response?.status === 401) {
          return Swal.fire({
            icon: "warning",
            title: "Unauthorized",
            text: "Please check your login credentials.",
          });
        }
        /* 
        if (error.code !== "ERR_BAD_RESPONSE") {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong. Please try again later.",
          });
          console.log(error);
        } */
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
    identification,
    phoneNumber,
    emergencyPhoneNumber,
    address,
    dateOfBirth,
    role,
    /* Dentist */
    medicalLicenseNumber = undefined,
    filteredSpeciality: speciality = undefined,
    university = undefined,
    workplace = undefined,
    yearsOfExperience = undefined,
    /* Pacient */
    bloodType = undefined,
    gender = undefined,
    filteredKnownAllergies: knownAllergies = undefined,
    filteredMedicalConditions: medicalConditions = undefined,
    /*  */
    createdByAdmin,
  }) => {
    if (!createdByAdmin) {
      dispatch(onChecking());
    }

    const userData = {
      fullName,
      email,
      password,
      identification,
      phoneNumber,
      emergencyPhoneNumber,
      address,
      dateOfBirth,
      role,
      /* Dentist */
      medicalLicenseNumber,
      speciality,
      university,
      workplace,
      yearsOfExperience,
      /* Pacient */
      bloodType,
      gender,
      knownAllergies,
      medicalConditions,
    };

    try {
      const filteredData = Object.fromEntries(
        Object.entries(userData).filter(([_, value]) => value !== undefined)
      );
      const { data } = await dentaidApi.post("/auth/register", filteredData);

      if (!createdByAdmin) {
        localStorage.setItem("token", data.token);
        dispatch(
          onLogin({
            email: data.user.email,
            id: data.user.id,
            name: data.user.name,
            role: data.user.role,
          })
        );
      }
      return true;
    } catch (error) {
      console.log({ message: error.response.data.message });

      if (error.code === "ERR_NETWORK") {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Cannot reach the server. Please check your connection or contact support.",
        });
      }
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: `${error.response.data.message}`,
      });

      dispatch(onLogout({ message: error.message }));
      return false;
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        dispatch(onChecking());
        const { data } = await dentaidApi.post("auth/renew", {
          token,
        });

        if (data?.token) {
          localStorage.setItem("token", data.token);
          dispatch(
            onLogin({
              email: data.user.email,
              name: data.user.name,
              id: data.user.id,
              role: data.user.role,
            })
          );
          return;
        }
        return;
      } catch (error) {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          Swal.fire({
            icon: "error",
            title: "Network Error",
            text: "Cannot reach the server to reload your session. Please check your connection or contact support.",
          });
        } else {
          if (
            error.response.data.error !==
            "Cannot destructure property 'id' of '(intermediate value)' as it is null."
          ) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong. Please try again later.",
            });
            console.log(error);
          }
        }
        dispatch(onLogout());
      }
    }
  };

  const startGetUser = async ({ id, userType }) => {
    try {
      const response = await dentaidApi.get("/user/getUser", {
        params: { id, userType },
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
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
    checkAuthToken,
    startGetUser,
  };
};
