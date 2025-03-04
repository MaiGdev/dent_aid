import { Save, Settings } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import Swal from "sweetalert2";
import { professionalInformationSchema } from "../../../helpers";
import { useAuthStore, useUserStore } from "../../../hooks";
import { onSetDentistUpdateErrors, onUpdateDentist } from "../../../store";
import { LoadingSpinner } from "../ui";
import { ProfInfoDetails } from "./ProfessionalInformation/ProfInfoDetails";
import { ProfInfoForm } from "./ProfessionalInformation/ProfInfoForm";

export const ProfessionalInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("usertype");
  const { startGetUser } = useAuthStore();
  const dispatch = useDispatch();
  const { updatedDentist } = useSelector((state) => state.userSlice);
  const { startUpdateProfessionalInfo } = useUserStore();

  const transformSpeciality = (speciality) => {
    return speciality.map((speciality) => ({
      label: `${speciality}`,
      value: `${speciality}`,
    }));
  };

  const onSubmit = async () => {
    console.log(updatedDentist);

    try {
      await professionalInformationSchema.validate(updatedDentist, {
        abortEarly: false,
      });
      dispatch(onSetDentistUpdateErrors({}));

      try {
        const speciality = updatedDentist.speciality.map((s) => s.label);
        const formData = { ...updatedDentist, speciality };

        const data = await startUpdateProfessionalInfo(id, formData);
        if (data) {
          setIsEditing((prev) => !prev);
          Swal.fire({
            title: "Dentist information updated successfully",
            icon: "success",
          });
          const transformedSpeciality = transformSpeciality(
            data.updatedUser.speciality
          );
          dispatch(
            onUpdateDentist({
              ...data.updatedUser,
              speciality: transformedSpeciality,
            })
          );
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to update dentist information",
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
      dispatch(onSetDentistUpdateErrors(validationErrors));
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await startGetUser({
          id: id,
          userType: userType,
        });
        if (data) {
          const transformedSpeciality = transformSpeciality(data.speciality);
          dispatch(
            onUpdateDentist({
              ...data,
              speciality: transformedSpeciality,
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

  if (!updatedDentist) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Grid2
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom:"2rem" 
        }}
      >
        
        <Typography className="" sx={{ fontSize: "1.25rem", color: "#15192C", textAlign:"center" }}>
          Profesional information
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
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "35px",
          }}
        >
          {isEditing && updatedDentist ? <ProfInfoForm /> : <ProfInfoDetails />}
        </Box>
      </Grid2>
    </Box>
  );
};
