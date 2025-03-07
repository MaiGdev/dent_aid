import { Save, Settings } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import Swal from "sweetalert2";
import { healthInformationSchema } from "../../../helpers";
import { useAuthStore, useUserStore } from "../../../hooks";
import { onSetPatientUpdateErrors, onUpdatePatient } from "../../../store";
import { LoadingSpinner } from "../ui";
import { MedicalInfoDetails } from "./MedicalInformation/MedicalInfoDetails";
import { MedicalInfoForm } from "./MedicalInformation/MedicalInfoForm";

export const MedicalInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("usertype");
  const { startGetUser, user } = useAuthStore();
  const { startUpdateMedicalInfo } = useUserStore();
  const dispatch = useDispatch();
  const { updatedPatient } = useSelector((state) => state.userSlice);

  const transformToLabelType = (obj) => {
    if (obj)
      return obj.map((o) => ({
        label: `${o}`,
        value: `${o}`,
      }));
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await startGetUser({
          id: id,
          userType: userType,
        });
        if (data) {
          dispatch(
            onUpdatePatient({
              bloodType: data.bloodType,
              medicalConditions: transformToLabelType(data.medicalConditions),
              knownAllergies: transformToLabelType(data.knownAllergies),
            })
          );
        }
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    };

    fetchUser();
  }, [id, userType]);

  const onSubmit = async () => {
    console.log(updatedPatient);

    try {
      await healthInformationSchema.validate(updatedPatient, {
        abortEarly: false,
      });
      dispatch(onSetPatientUpdateErrors({}));

      try {
        const bloodType = updatedPatient.bloodType;
        const knownAllergies = updatedPatient.knownAllergies.map(
          (s) => s.label
        );
        const medicalConditions = updatedPatient.medicalConditions.map(
          (s) => s.label
        );

        const data = await startUpdateMedicalInfo(id, {
          bloodType,
          knownAllergies,
          medicalConditions,
        });
        if (data) {
          setIsEditing(false);
          Swal.fire({
            title: "Patient information updated successfully",
            icon: "success",
          });
          const transformedBloodType = transformToLabelType(
            data.user.bloodType
          );
          const transformedKnownAllergies = transformToLabelType(
            data.user.knownAllergies
          );
          const transformedMedicalConditions = transformToLabelType(
            data.user.medicalConditions
          );
          dispatch(
            onUpdatePatient({
              bloodType: transformedBloodType,
              knownAllergies: transformedKnownAllergies,
              medicalConditions: transformedMedicalConditions,
            })
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to update patient information",
            text: "Please try again later.",
          });
        }
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }

      console.log("Updated");
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      dispatch(onSetPatientUpdateErrors(validationErrors));
    }
  };

  if (!updatedPatient) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Grid2
        className=" flex items-center mb-8"
        sx={{
          justifyContent:
            user.role === "DENTIST_ROLE" ? "center" : "space-between",
        }}
      >
        <Typography className="!text-xl text-[#15192C]  w-full text-center sm:text-left ">
          Medical information
        </Typography>

        {user.role !== "DENTIST_ROLE" ? (
          isEditing ? (
            <Button
              onClick={onSubmit}
              className="bg-white !text-[#4285CB] !border-2 border-[#4285CB] !text-sm !font-semibold !rounded-lg !normal-case  items-center justify-center gap-2 hover:!bg-[#4285CB] hover:!text-white transition-all duration-300 !hidden sm:!flex"
              endIcon={<Save />}
            >
              Save
            </Button>
          ) : (
            <Button
              onClick={() => setIsEditing((prev) => !prev)}
              className=" bg-white !text-[#4285CB] !border-2 border-[#4285CB] !text-sm !font-semibold !rounded-lg !normal-case  items-center justify-center gap-2 hover:!bg-[#4285CB] hover:!text-white transition-all duration-300  !hidden sm:!flex"
              endIcon={<Settings />}
            >
              Edit
            </Button>
          )
        ) : null}
      </Grid2>
      <Grid2>
        {isEditing ? (
          <MedicalInfoForm />
        ) : (
          <>
            <MedicalInfoDetails />
          </>
        )}
      </Grid2>
    </Box>
  );
};
