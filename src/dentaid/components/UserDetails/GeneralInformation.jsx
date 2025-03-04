import { Save, Settings } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import Swal from "sweetalert2";
import { useAuthStore, useUserStore } from "../../../hooks";
import { onUpdateUser } from "../../../store";
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
  };

  return (
    <>
      <Grid2
        sx={{
          display: "flex",
          justifyContent:
            user.role === "DENTIST_ROLE" ? "center" : "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: user.role === "DENTIST_ROLE" ? "1.55rem" : "1.25rem",
            paddingBottom: user.role === "DENTIST_ROLE" ? "2rem" : "0",
            color: "#15192C",
          }}
        >
          General information
        </Typography>
        {user.role !== "DENTIST_ROLE" ? (
          isEditing ? (
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
          )
        ) : null}
      </Grid2>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          gap: "35px",
        }}
      >
        {isEditing && updatedUser ? (
          <GeneralInfoForm />
        ) : (
          /*   <></> */
          <GeneralInformationDetails />
        )}
      </Box>
    </>
  );
};
