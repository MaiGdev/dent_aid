import { useDispatch, useSelector } from "react-redux";
import { dentaidApi } from "../api/dentaidApi";
import { onSetUsers } from "../store";

export const useUserStore = () => {
  const { admin, dentists, patients } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const startGetUsers = async () => {
    try {
      const [adminResponse, dentistResponse, patientResponse] =
        await Promise.all([
          dentaidApi.get("user/", { params: { userType: "ADMIN_ROLE" } }),
          dentaidApi.get("user/", { params: { userType: "DENTIST_ROLE" } }),
          dentaidApi.get("user/", { params: { userType: "PATIENT_ROLE" } }),
        ]);

      const adminData = adminResponse.data;
      const dentistData = dentistResponse.data;
      const patientsData = patientResponse.data;

      dispatch(
        onSetUsers({
          admin: adminData,
          dentists: dentistData,
          patients: patientsData,
        })
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const startUpdateUser = async (id, userType, user) => {
    try {
      const userUpdated = await dentaidApi.put(
        `user/?id=${id}&userType=${userType}`,
        user
      );
      return userUpdated.data;
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const startUpdateProfessionalInfo = async (id, user) => {
    try {
      const userUpdated = await dentaidApi.put(`user/dentist?id=${id}`, user);
      return userUpdated.data;
    } catch (error) {
      console.error("Error updating professional dentist information:", error);
    }
  };
  const startUpdateMedicalInfo = async (id, user) => {
    try {
      const userUpdated = await dentaidApi.put(`user/patient?id=${id}`, user);
      return userUpdated.data;
    } catch (error) {
      console.error("Error updating medical patient informatiob:", error);
    }
  };

  return {
    admin,
    dentists,
    patients,

    /* Methods */
    startGetUsers,
    startUpdateUser,
    startUpdateProfessionalInfo,
    startUpdateMedicalInfo,
  };
};
