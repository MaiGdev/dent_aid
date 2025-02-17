import { Save, Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid2,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router";
import Swal from "sweetalert2";
import { useAuthStore, useForm, useUserStore } from "../../../hooks";
import { onUpdateUser } from "../../../store";
import { LoadingSpinner } from "../ui";
import { GeneralInformationDetails } from "./GeneralInformationDetail";

export const GeneralInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { startGetUser } = useAuthStore();
  const { startUpdateUser } = useUserStore();
  const [userToUpdate, setUserToUpdate] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userType = queryParams.get("usertype");
  const boxUpdateRef = useRef(null);
  const [boxUpdateWidth, setUpdateWidth] = useState(0);

  const dispatch = useDispatch();

  const {
    identification,
    phoneNumber,
    gender,
    emergencyPhoneNumber,
    dateOfBirth,
    address,
    onInputChange,
    formState,
    setFormState,
  } = useForm({
    identification: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    emergencyPhoneNumber: "",
    address: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await startGetUser({
          id: id,
          userType: userType,
        });
        setUserToUpdate(data.user);
      } catch (error) {
        console.error("API Error:", error);
        throw error;
      }
    };

    fetchUser();
  }, [id, userType]);

  useEffect(() => {
    if (userToUpdate) {
      setFormState({
        identification: userToUpdate.identification || "",
        phoneNumber: userToUpdate.phoneNumber || "",
        gender: userToUpdate.gender,
        emergencyPhoneNumber: userToUpdate.emergencyPhoneNumber,
        dateOfBirth: userToUpdate.dateOfBirth,
        address: userToUpdate.address,
      });
    }
  }, [userToUpdate, setFormState]);

  useLayoutEffect(() => {
    if (boxUpdateRef.current) {
      setUpdateWidth(boxUpdateRef.current.offsetWidth);
    }
  }, [isEditing]);

  if (!userToUpdate || !formState) {
    return <LoadingSpinner />;
  }
  const onSubmit = async () => {
    try {
      const data = await startUpdateUser(id, formState);
      if (data) {
        Swal.fire({
          title: "User updated successfully",
          icon: "success",
        });

        dispatch(
          onUpdateUser({
            ...data.user,
          })
        );
        setIsEditing(false);
        setUserToUpdate(user);
      }
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  return (
    <>
      <Grid2
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.25rem", color: "#15192C" }}>
          General information
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          gap: "35px",
        }}
      >
        {isEditing && userToUpdate && formState ? (
          <>
            <Grid2
              ref={boxUpdateRef}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "90px",
              }}
            >
              <Grid2
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: "35px",
                }}
              >
                <Grid2 xs={12}>
                  <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                    Email
                  </Typography>
                  <Input
                    id="email"
                    placeholder="Email Address"
                    type="text"
                    name="email"
                    disabled
                    value={userToUpdate?.email}
                    variant="filled"
                    fullWidth
                    sx={{
                      fontSize: "0.875rem",
                      height: "2.063rem",
                      borderRadius: ".5rem",
                      border: "1px solid #cccccc",
                      padding: "0.5rem 1rem",
                      marginTop: "0.5rem",
                      "&::before, &::after": {
                        borderBottom: "none !important",
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none !important",
                      },
                      "&:focus": {
                        borderColor: "#2A3E54",
                      },
                    }}
                  />
                </Grid2>
                <Grid2 size={12}>
                  <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                    Date of Birth
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      label="Date of birth"
                      sx={{
                        marginTop: "0.5rem",
                        "& .MuiInputBase-root": {
                          fontSize: "0.875rem",
                          height: "2.063rem",
                          borderRadius: ".5rem",
                          textAlign: "left",
                        },
                        "& .MuiInputLabel-root": {
                          transform: "translate(14px, 5px) scale(1)",
                          "&.Mui-focused, &.MuiInputLabel-shrink": {
                            transform:
                              "translate(14px, -8px) scale(0.75) !important",
                          },
                        },
                      }}
                      fullWidth
                      value={dayjs(dateOfBirth) || dayjs()}
                      onChange={(e) => {
                        onInputChange({
                          target: {
                            name: "dateOfBirth",
                            value: dayjs(e).format("YYYY-MM-DD"),
                          },
                        });
                      }}
                    />
                  </LocalizationProvider>
                </Grid2>
                <Grid2 xs={12}>
                  <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                    Phone number
                  </Typography>
                  <Input
                    id="phoneNumber"
                    placeholder="Phone number"
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => {
                      onInputChange({
                        target: {
                          name: "phoneNumber",
                          value: e.target.value,
                        },
                      });
                    }}
                    variant="filled"
                    fullWidth
                    sx={{
                      fontSize: "0.875rem",
                      height: "2.063rem",
                      borderRadius: ".5rem",
                      border: "1px solid #cccccc",
                      padding: "0.5rem 1rem",
                      marginTop: "0.5rem",
                      "&::before, &::after": {
                        borderBottom: "none !important",
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none !important",
                      },
                      "&:focus": {
                        borderColor: "#2A3E54",
                      },
                    }}
                  />
                </Grid2>
              </Grid2>
              <Grid2
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  gap: "35px",
                }}
              >
                <Grid2 xs={12}>
                  <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                    Identification
                  </Typography>
                  <Input
                    id="identification"
                    placeholder="Identification"
                    type="text"
                    name="identification"
                    value={identification}
                    onChange={(e) => {
                      onInputChange({
                        target: {
                          name: "identification",
                          value: e.target.value,
                        },
                      });
                    }}
                    variant="filled"
                    fullWidth
                    sx={{
                      fontSize: "0.875rem",
                      height: "2.063rem",
                      borderRadius: ".5rem",
                      border: "1px solid #cccccc",
                      padding: "0.5rem 1rem",
                      marginTop: "0.5rem",
                      "&::before, &::after": {
                        borderBottom: "none !important",
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none !important",
                      },
                      "&:focus": {
                        borderColor: "#2A3E54",
                      },
                    }}
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <Typography
                    sx={{
                      fontSize: "1.20rem",
                      color: "#15192C",
                      paddingBottom: ".5rem",
                    }}
                  >
                    Gender
                  </Typography>
                  <FormControl fullWidth>
                    <InputLabel
                      id="gender-label"
                      sx={{
                        fontSize: "16px",
                        color: "#5A6474",
                        transform: "translate(14px, 5px) scale(1)",
                        transition: "all 0.2s ease-in-out",
                        "&.Mui-focused, &.MuiInputLabel-shrink": {
                          transform: "translate(14px, -8px) scale(0.75)",
                        },
                      }}
                    >
                      Gender
                    </InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      value={gender}
                      label="Gender"
                      onChange={({ target: { value } }) =>
                        onInputChange({ target: { name: "gender", value } })
                      }
                      name="gender"
                      sx={{
                        fontSize: "0.875rem",
                        height: "2.063rem",
                        borderRadius: ".5rem",
                        color: "#5A6474",
                        textAlign: "left",
                      }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                      <MenuItem value="Prefer Not to Say">
                        Prefer Not to Say
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>
                <Grid2 xs={12}>
                  <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                    Emergency phone number
                  </Typography>
                  <Input
                    id="emergencyPhoneNumber"
                    placeholder="Emergency phone number"
                    type="text"
                    name="emergencyPhoneNumber"
                    value={emergencyPhoneNumber}
                    onChange={(e) => {
                      onInputChange({
                        target: {
                          name: "emergencyPhoneNumber",
                          value: e.target.value,
                        },
                      });
                    }}
                    variant="filled"
                    fullWidth
                    sx={{
                      fontSize: "0.875rem",
                      height: "2.063rem",
                      borderRadius: ".5rem",
                      border: "1px solid #cccccc",
                      padding: "0.5rem 1rem",
                      marginTop: "0.5rem",
                      "&::before, &::after": {
                        borderBottom: "none !important",
                      },
                      "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none !important",
                      },
                      "&:focus": {
                        borderColor: "#2A3E54",
                      },
                    }}
                  />
                </Grid2>
              </Grid2>
            </Grid2>
            <Grid2
            /*    sx={{
                width: `${boxUpdateWidth}px`,
              }} */
            >
              <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                Address
              </Typography>
              <Input
                id="address"
                placeholder="Address"
                type="text"
                name="address"
                value={address}
                onChange={(e) => {
                  onInputChange({
                    target: {
                      name: "address",
                      value: e.target.value,
                    },
                  });
                }}
                sx={{
                  fontSize: "0.875rem",
                  height: "2.063rem",
                  borderRadius: ".5rem",
                  border: "1px solid #cccccc",
                  padding: "0.5rem 1rem",
                  marginTop: "0.5rem",
                  width: `${boxUpdateWidth ? boxUpdateWidth : "100%"}px`,
                  "&::before, &::after": {
                    borderBottom: "none !important",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "none !important",
                  },
                  "&:focus": {
                    borderColor: "#2A3E54",
                  },
                }}
              />
            </Grid2>
          </>
        ) : (
          <GeneralInformationDetails />
        )}
      </Box>
    </>
  );
};
