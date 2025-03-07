import { Save, Settings } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import Swal from "sweetalert2";
import { personalInformationSchema } from "../../../helpers";
import { useAuthStore, useUserStore } from "../../../hooks";
import { onSetUserUpdateErrors, onUpdateUser } from "../../../store";
import { LoadingSpinner } from "../ui";
import { GeneralInfoForm } from "./GeneralInformation/GeneralInfoForm";
import { GeneralInformationDetails } from "./generalInformation/GeneralInformationDetail";

export const GeneralInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { startGetUser, user } = useAuthStore();
  const { startUpdateUser } = useUserStore();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("usertype");
  const view = queryParams.get("view");
  const boxUpdateRef = useRef(null);
  const [boxUpdateWidth, setUpdateWidth] = useState(0);

  const { updatedUser } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let data;
        if (user.id === id && user.role === userType) {
          data = await startGetUser({ id });
          dispatch(onUpdateUser(data));
        } else {
          data = await startGetUser({ id, userType });
          dispatch(onUpdateUser(data.user));
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    };
    fetchUser();
  }, [id, userType]);

  useEffect(() => {
    if (boxUpdateRef.current) {
      setUpdateWidth(boxUpdateRef.current.offsetWidth);
    }
  }, [isEditing]);

  if (!updatedUser) {
    return <LoadingSpinner />;
  }

  const onSubmit = async () => {
    try {
      await personalInformationSchema.validate(updatedUser, {
        abortEarly: false,
      });
      dispatch(onSetUserUpdateErrors({}));
      try {
        let data;
        if (location.search.includes("&account=true")) {
          data = await startUpdateUser(id, "", updatedUser);
        } else {
          data = await startUpdateUser(id, userType, updatedUser);
        }
        if (data) {
          Swal.fire({
            title: "User updated successfully",
            icon: "success",
          });

          dispatch(onUpdateUser(data.user));
          setIsEditing(false);
          setUserToUpdate(data.user);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      dispatch(onSetUserUpdateErrors(validationErrors));
    }
  };

  return (
    <>
      <Grid2
        className="flex items-center mb-4 sm:mb-0 sm:px-5 lg:px-1.5"
        sx={{
          justifyContent:
            view === "patient-history" ? "center" : "space-between",
        }}
      >
        <Typography
          className=" !text-xl text-[#15192C]  w-full text-center sm:text-left "
          sx={
            {
              /*  fontSize: view === "patient-history" ? "1.55rem" : "1.25rem", */
              /*   paddingBottom: view === "patient-history" ? "2rem" : "0", */
            }
          }
        >
          General information
        </Typography>
        {view !== "patient-history" ? (
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
              className="bg-white !text-[#4285CB] !border-2 border-[#4285CB] !text-sm !font-semibold !rounded-lg !normal-case  items-center justify-center gap-2 hover:!bg-[#4285CB] hover:!text-white transition-all duration-300 !hidden sm:!flex"
              endIcon={<Settings />}
            >
              Edit
            </Button>
          )
        ) : null}
      </Grid2>
      <Box className="flex  flex-col lg:gap-[25px] xl:gap-[35px] justify-start items-start sm:justify-center sm:items-center lg:!px-4.5">
        {isEditing && updatedUser ? (
          <>
            <GeneralInfoForm />
            {view !== "patient-history" ? (
              isEditing ? (
                <Button
                  onClick={onSubmit}
                  className="w-full bg-white !text-[#4285CB] !border border-[#4285CB] !text-sm !font-semibold !rounded-lg !normal-case  items-center justify-center gap-2 hover:!bg-[#4285CB] hover:!text-white transition-all duration-300 flex sm:!hidden"
                  endIcon={<Save />}
                >
                  Save
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="w-full bg-white !text-[#4285CB] !border border-[#4285CB] !text-sm !font-semibold !rounded-lg !normal-case  items-center justify-center gap-2 hover:!bg-[#4285CB] hover:!text-white transition-all duration-300  flex sm:!hidden"
                  endIcon={<Settings />}
                >
                  Edit
                </Button>
              )
            ) : null}
          </>
        ) : (
          <>
            <GeneralInformationDetails />
            {view !== "patient-history" ? (
              isEditing ? (
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
              )
            ) : null}
          </>
        )}
      </Box>
    </>
  );
};
