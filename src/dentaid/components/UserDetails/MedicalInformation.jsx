import { Save, Settings } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import Swal from "sweetalert2";
import { useAuthStore, useUserStore } from "../../../hooks";
import { onUpdatePatient } from "../../../store";
import { MedicalInfoDetails } from "./MedicalInformation/MedicalInfoDetails";
import { MedicalInfoForm } from "./MedicalInformation/MedicalInfoForm";

export const MedicalInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("usertype");
  const { startGetUser } = useAuthStore();
  const { startUpdateMedicalInfo } = useUserStore();
  const dispatch = useDispatch();
  const { updatedPatient } = useSelector((state) => state.userSlice);

  const transformToLabelType = (obj) => {
    if (obj)
      return obj.map((o) => ({
        label: `${o}`,
        type: `${o}`,
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
              medicalConditions: transformToLabelType(
                data.medicalConditions
              ),
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
    setIsEditing((prev) => !prev);

    try {
      const bloodType = updatedPatient.bloodType;
      const knownAllergies = updatedPatient.knownAllergies.map((s) => s.label);
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
        const transformedBloodType = transformToLabelType(data.user.bloodType);
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
  };
  return (
    <Box>
      <Grid2
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.25rem", color: "#15192C" }}>
          Medical information
        </Typography>
        {isEditing ? (
          <Button
            onClick={onSubmit}
            sx={{
              backgroundColor: "#fff",
              color: "#4285CB",
              border: "2px solid #4285CB",
              fontSize: "0.875rem",
              fontWeight: "600",
              borderRadius: ".5rem",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              "&:hover": {
                backgroundColor: "#4285CB",
                color: "#fff",
              },
              transition: "all 0.3s",
            }}
            endIcon={<Save />}
          >
            Save
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditing((prev) => !prev)}
            sx={{
              backgroundColor: "#fff",
              color: "#01448A",
              border: "2px solid #01448A",
              fontSize: "0.875rem",
              fontWeight: "600",
              borderRadius: ".5rem",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              "&:hover": {
                backgroundColor: "#01448A",
                color: "#fff",
              },
              transition: "all 0.3s",
            }}
            endIcon={<Settings />}
          >
            Edit
          </Button>
        )}
      </Grid2>
      <Grid2
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "35px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "35px",
              width: "490px",
            }}
          >
            {isEditing ? <MedicalInfoForm /> : <MedicalInfoDetails />}
          </Grid2>
        </Box>
      </Grid2>
    </Box>
  );
};
