import {
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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { compareObjects } from "../../../../helpers";
import { useForm } from "../../../../hooks";
import { onUpdateUser } from "../../../../store";

export const GeneralInfoForm = () => {
  const {
    fullName,
    email,
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
    fullName: "",
    email: "",
    identification: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    emergencyPhoneNumber: "",
    address: "",
  });

  const dispatch = useDispatch();

  const { updatedUser } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (updatedUser) {
      setFormState({
        fullName: updatedUser.fullName || "",
        email: updatedUser.email || "",
        identification: updatedUser.identification || "",
        phoneNumber: updatedUser.phoneNumber || "",
        gender: updatedUser.gender || "",
        emergencyPhoneNumber: updatedUser.emergencyPhoneNumber || "",
        dateOfBirth: updatedUser.dateOfBirth || "",
        address: updatedUser.address || "",
      });
    }
  }, [updatedUser]);

  useEffect(() => {
    const isFormStateEmpty = Object.values(formState).some(
      (value) => value === "" || (Array.isArray(value) && value.length === 0)
    );
    if (isFormStateEmpty) return;

    if (!compareObjects(formState, updatedUser)) {
      dispatch(onUpdateUser(formState));
    }
  }, [updatedUser, formState]);

  return (
    <>
      {updatedUser && (
        <>
          <Grid2 sx={{ width: "520px" }}>
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              Full name
            </Typography>
            <Input
              id="fullName"
              placeholder="Full name"
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => {
                onInputChange({
                  target: {
                    name: "fullName",
                    value: e.target.value,
                  },
                });
              }}
              fullWidth
              sx={{
                fontSize: "0.875rem",
                height: "2.063rem",
                borderRadius: ".5rem",
                border: "1px solid #cccccc",
                padding: "0.5rem 1rem",
                marginTop: "0.5rem",
                /*  width: `${boxUpdateWidth ? boxUpdateWidth : "100%"}px`, */
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
          <Grid2
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
                  value={email}
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
                <Typography
                  sx={{
                    fontSize: "1.20rem",
                    color: "#15192C",
                  }}
                >
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
                    label="Gender"
                    value={gender}
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

          <Grid2 sx={{ width: "520px" }}>
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              Address
            </Typography>
            <Input
              id="address"
              placeholder="Address"
              type="text"
              name="address"
              fullWidth
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
      )}
    </>
  );
};
