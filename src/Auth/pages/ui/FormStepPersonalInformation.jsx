import {
  Box,
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
import { motion } from "framer-motion";
import { useContext } from "react";
import { FormContext } from "../../../context/FormContext";

export const FormStepPersonalInformation = () => {
  const {
    fullName,
    identification,
    dateOfBirth,
    gender,
    address,
    emergencyPhoneNumber,
    phoneNumber,
    onInputChange,
    errors,
  } = useContext(FormContext);
  return (
    <>
      <Box>
        <Grid2
          container
          direction="column"
          spacing={2}
          className={`${
            Object.values(errors).some((value) => value !== "") ? "pt-11" : ""
          }`}
        >
          <Typography
            variant="h2"
            className="!text-base md:!text-lg lg:!text-2xl text-[#404D61]"
          >
            Personal information
          </Typography>
          <Grid2 container>
            <Grid2 size={{ xs: 12, md: 6 }} className="lg:pr-2">
              <Input
                id="fullName"
                placeholder="Full Name"
                type="text"
                name="fullName"
                value={fullName}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                className={`text-sm h-8 rounded-lg ${
                  errors.fullName
                    ? "border border-[#ff6467]"
                    : "border border-[#cccccc]"
                }  p-4 mt-2`}
                sx={{
                  "&::before, &::after": {
                    borderBottom: "none !important",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "none !important",
                  },
                  "&.Mui-focused": {
                    outline: "2px solid #3367D1",
                  },
                }}
              />
              {errors.fullName && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.fullName}
                </motion.span>
              )}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} className="lg:pr-2">
              <Input
                id="identification"
                placeholder="National ID / Passport Number"
                type="text"
                name="identification"
                value={identification}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                className={`text-sm h-8 rounded-lg ${
                  errors.identification
                    ? "border border-[#ff6467]"
                    : "border border-[#cccccc]"
                }  p-4 mt-2`}
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
              {errors.identification && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.identification}
                </motion.span>
              )}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} className="lg:pr-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label=" Date of birth"
                  sx={{
                    marginTop: "0.5rem",
                    "& .MuiInputBase-root": {
                      fontSize: "0.875rem",
                      height: "2.063rem",
                      borderRadius: ".5rem",
                      textAlign: "left",
                      border: ` ${
                        errors.dateOfBirth ? "1px solid #ff6467" : ""
                      }`,
                    },
                  }}
                  fullWidth
                  value={dateOfBirth || dayjs()}
                  onChange={onInputChange}
                />
              </LocalizationProvider>
              {errors.dateOfBirth && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.dateOfBirth}
                </motion.span>
              )}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }} className="lg:pr-2 mt-2">
              <FormControl fullWidth>
                <InputLabel
                  id="gender-label"
                  sx={{
                    fontSize: "16px",
                    color: "#5A6474",
                    transform: "translate(14px, 8px) scale(1)",
                    "&.Mui-focused, &.MuiInputLabel-shrink": {
                      transform: "translate(14px, -9px) scale(0.75)",
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
                  className={`text-sm h-8 !rounded-lg text-[#5A6474] text-left`}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                  <MenuItem value="Prefer Not to Say">
                    Prefer Not to Say
                  </MenuItem>
                </Select>
              </FormControl>
              {errors.gender && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.gender}
                </motion.span>
              )}
            </Grid2>
            <Grid2 size={12}>
              <Input
                id="phoneNumber"
                placeholder="Phone Number"
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                sx={{
                  fontSize: "0.875rem",
                  height: "2.063rem",
                  borderRadius: ".5rem",
                  border: `1px solid ${
                    errors.phoneNumber ? "#ff6467" : "#cccccc"
                  }`,
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
              {errors.phoneNumber && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.phoneNumber}
                </motion.span>
              )}
            </Grid2>
            <Grid2 size={12}>
              <Input
                id="emergencyPhoneNumber"
                placeholder="Emergency Contact"
                type="text"
                name="emergencyPhoneNumber"
                value={emergencyPhoneNumber}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                className={`text-sm h-8 rounded-lg ${
                  errors.emergencyPhoneNumber
                    ? "border border-[#ff6467]"
                    : "border border-[#cccccc]"
                }  p-4 mt-2`}
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
              {errors.emergencyPhoneNumber && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.emergencyPhoneNumber}
                </motion.span>
              )}
            </Grid2>

            <Typography
              sx={{
                fontSize: "1.145rem",
                fontWeight: "500",
                color: "#404D61",
                position: "static",
                textAlign: "left",
                marginTop: "1rem",
              }}
            >
              Address
            </Typography>

            <Grid2 size={12}>
              <Input
                id="address"
                placeholder="Address Line"
                type="text"
                name="address"
                value={address}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                className={`text-sm h-8 rounded-lg ${
                  errors.address
                    ? "border border-[#ff6467]"
                    : "border border-[#cccccc]"
                }  p-4 mt-2`}
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
              {errors.address && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.address}
                </motion.span>
              )}
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

