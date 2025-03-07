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
      <Grid2 className="flex justify-between items-center mb-8 sm:px-5 lg:px-1.5">
        <Typography className="!text-xl text-[#15192C]  w-full text-center sm:text-left ">
          Profesional information
        </Typography>
        {isEditing ? (
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
        )}
      </Grid2>
      <Grid2>
        {isEditing && updatedDentist ? (
          <ProfInfoForm />
        ) : (
          <>
            <ProfInfoDetails />
            {isEditing ? (
              <Button
                onClick={onSubmit}
                className="w-full bg-white !text-[#01448A] !border border-[#01448A] !text-sm !font-semibold !rounded-lg !normal-case  items-center justify-center gap-2 hover:!bg-[#01448A] hover:!text-white transition-all duration-300 flex sm:!hidden"
                endIcon={<Save />}
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing((prev) => !prev)}
                className="w-full bg-white  !text-[#01448A] !border border-[#01448A] !text-sm !font-semibold !rounded-lg !normal-case  items-center justify-center gap-2 hover:!bg-[#01448A] hover:!text-white transition-all duration-300  flex sm:!hidden"
                endIcon={<Settings />}
              >
                Edit
              </Button>
            )}
          </>
        )}
      </Grid2>
    </Box>
  );
};
