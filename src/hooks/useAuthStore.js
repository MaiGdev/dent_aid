import { useDispatch, useSelector } from "react-redux";
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
    } catch (error) {
      console.error(error);
      dispatch(onLogout(error));
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
      console.error(error);
      dispatch(onLogout(error));
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
      return data.dentist.user;
    } catch (error) {
      console.error(error);
    }

    dispatch(onLogin({ dentistId: data.dentist.user }));
  };
  const startRegisterPatient = () => {};

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        dispatch(onChecking());
        const data = await dentaidApi.post("auth/renew", {
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
