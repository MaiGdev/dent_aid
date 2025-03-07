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
import { motion } from "framer-motion";
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

  const { updatedUser, userUpdateErrors } = useSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    if (updatedUser.id) {
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
    if (!compareObjects(formState, updatedUser)) {
      dispatch(onUpdateUser(formState));
    }
  }, [formState]);

  return (
    <>
      {updatedUser && (
        <>
          <Grid2 className="flex flex-col gap-8 items-start   md:justify-center w-full md:!w-fit ">
            {/*  */}
            <Grid2
              className="w-full"
            >
              <Typography className="!text-base md:!text-[1.20rem] text-[#15192C] w-full">
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
                className={` !w-full !text-sm h-8 rounded-lg border  ${
                  userUpdateErrors.fullName
                    ? "border-[#ff6467]"
                    : "border-[#cccccc]"
                }
                  px-4 py-2 mt-2`}
                sx={{
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
              {userUpdateErrors.fullName && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {userUpdateErrors.fullName}
                </motion.span>
              )}
            </Grid2>

            {/* xxxxxxx */}

            <Grid2 className="w-full ">
              <Grid2 className="flex flex-col sm:flex-row gap-10 items-start  md:justify-center md:gap-[90px]  ">
                <Grid2 className="flex flex-col justify-end gap-6 md:gap-8  w-full  md:w-fit ">
                  <Grid2>
                    <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
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
                      className={`!text-sm h-8 rounded-lg border border-[#cccccc]
                  px-4 py-2 mt-2`}
                      sx={{
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
                  <Grid2>
                    <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
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
                            border: `${
                              userUpdateErrors.dateOfBirth
                                ? "1px solid #ff6467"
                                : ""
                            }`,
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
                    {userUpdateErrors.dateOfBirth && (
                      <motion.span
                        className="!text-red-400 text-[12px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {userUpdateErrors.dateOfBirth}
                      </motion.span>
                    )}
                  </Grid2>
                  <Grid2>
                    <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
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
                      className={`!text-sm h-8 rounded-lg border  ${
                        userUpdateErrors.phoneNumber
                          ? "border-[#ff6467]"
                          : "border-[#cccccc]"
                      }
                  px-4 py-2 mt-2`}
                      sx={{
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
                    {userUpdateErrors.phoneNumber && (
                      <motion.span
                        className="!text-red-400 text-[12px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {userUpdateErrors.phoneNumber}
                      </motion.span>
                    )}
                  </Grid2>
                </Grid2>
                <Grid2 className="flex flex-col justify-end gap-6 md:gap-8 w-full md:w-fit">
                  <Grid2>
                    <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
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
                      onBlur={(e) => {
                        onInputChange({
                          target: {
                            name: "identification",
                            value: e.target.value,
                          },
                        });
                      }}
                      variant="filled"
                      fullWidth
                      className={`!text-sm h-8 rounded-lg border  ${
                        userUpdateErrors.identification
                          ? "border-[#ff6467]"
                          : "border-[#cccccc]"
                      }
                  px-4 py-2 mt-2`}
                      sx={{
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
                    {userUpdateErrors.identification && (
                      <motion.span
                        className="!text-red-400 text-[12px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {userUpdateErrors.identification}
                      </motion.span>
                    )}
                  </Grid2>

                  <Grid2>
                    <Typography className="!text-base md:!text-[1.20rem] text-[#15192C] pb-2">
                      Gender
                    </Typography>
                    <FormControl fullWidth>
                      <InputLabel
                        id="gender-label"
                        className="!text-base text-[#5A6474]"
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
                        className={`!text-sm h-8 !rounded-lg text-[#5A6474] text-left`}
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
                  <Grid2>
                    <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
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
                      className={`!text-sm h-8 rounded-lg border  ${
                        userUpdateErrors.emergencyPhoneNumber
                          ? "border-[#ff6467]"
                          : "border-[#cccccc]"
                      }
                  px-4 py-2 mt-2`}
                      sx={{
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
                    {userUpdateErrors.emergencyPhoneNumber && (
                      <motion.span
                        className="!text-red-400 text-[12px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {userUpdateErrors.emergencyPhoneNumber}
                      </motion.span>
                    )}
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>

            {/* iiiiiiiii */}

            <Grid2
              className={`w-full pb-6 lg:pb-0 `}
            >
              <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
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
                className={`!text-sm h-8 rounded-lg border  ${
                  userUpdateErrors.address
                    ? "border-[#ff6467]"
                    : "border-[#cccccc]"
                }
                  px-4 py-2 mt-2`}
                sx={{
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
              {userUpdateErrors.address && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {userUpdateErrors.address}
                </motion.span>
              )}
            </Grid2>
          </Grid2>

          {/* ------- */}
        </>
      )}
    </>
  );
};
