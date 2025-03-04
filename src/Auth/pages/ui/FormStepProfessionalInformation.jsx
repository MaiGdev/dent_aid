import {
  Autocomplete,
  Box,
  Grid2,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useContext } from "react";
import { FormContext } from "../../../context/FormContext";
import { dentistSpecialityOptions } from "./constants/dentist-speciaty";

export const FormStepProfessionalInformation = () => {
  const {
    medicalLicenseNumber,
    yearsOfExperience,
    university,
    workplace,
    speciality,
    onInputChange,
    onMultipleSelectChange,
    errors,
  } = useContext(FormContext);
  return (
    <>
      <Box sx={{ width: "558.31px" }}>
        <Grid2 container direction="column" spacing={2}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.145rem",
              fontWeight: "500",
              color: "#404D61",
              position: "static",
              textAlign: "left",
            }}
          >
            Professional Information
          </Typography>
          <Grid2 xs={12} sm={6}>
            <Input
              id="medicalLicenseNumber"
              placeholder="Medical License Number"
              type="text"
              name="medicalLicenseNumber"
              value={medicalLicenseNumber}
              onChange={onInputChange}
              variant="filled"
              fullWidth
              sx={{
                fontSize: "0.875rem",
                height: "2.063rem",
                borderRadius: ".5rem",
                border: `1px solid ${
                  errors.medicalLicenseNumber ? "#ff6467" : "#cccccc"
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
            {errors.medicalLicenseNumber && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.medicalLicenseNumber}
              </motion.span>
            )}
          </Grid2>
          <Grid2 size={12}>
            <Autocomplete
              sx={{
                marginTop: "0.5rem",

                "& .MuiInputBase-root": {
                  borderRadius: ".5rem",
                  padding: "0 14px",
                  border: ` ${errors.speciality ? "1px solid #ff6467" : ""}`,
                },
              }}
              fullWidth
              disablePortal
              options={dentistSpecialityOptions}
              value={speciality}
              onChange={(event, newValue) => {
                onMultipleSelectChange({
                  target: {
                    name: "speciality",
                    value: newValue,
                  },
                });
              }}
              multiple
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Speciality"
                  InputLabelProps={{
                    style: {
                      top: "-9px",
                      color: "#A2A2A2",
                    },
                  }}
                />
              )}
            />
            {errors.speciality && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.speciality}
              </motion.span>
            )}
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Input
              id="yearsOfExperience"
              placeholder="Years of Experience"
              type="number"
              name="yearsOfExperience"
              value={yearsOfExperience}
              min="0"
              onChange={(e) => {
                if (e.target.value >= 0) {
                  onInputChange(e);
                }
              }}
              variant="filled"
              fullWidth
              sx={{
                fontSize: "0.875rem",
                height: "2.063rem",
                borderRadius: ".5rem",
                border: `1px solid ${
                  errors.yearsOfExperience ? "#ff6467" : "#cccccc"
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
            {errors.yearsOfExperience && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.yearsOfExperience}
              </motion.span>
            )}
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Input
              id="university"
              placeholder="University (Name & Graduation Year)"
              type="text"
              name="university"
              value={university}
              onChange={onInputChange}
              variant="filled"
              fullWidth
              sx={{
                fontSize: "0.875rem",
                height: "2.063rem",
                borderRadius: ".5rem",
                border: `1px solid ${
                  errors.university ? "#ff6467" : "#cccccc"
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
            {errors.university && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.university}
              </motion.span>
            )}
          </Grid2>
          <Grid2 xs={12} sm={6}>
            <Input
              id="workplace"
              placeholder="Workplace (Hospital/Clinic Name)"
              type="text"
              name="workplace"
              value={workplace}
              onChange={onInputChange}
              variant="filled"
              fullWidth
              sx={{
                fontSize: "0.875rem",
                height: "2.063rem",
                borderRadius: ".5rem",
                border: `1px solid ${errors.workplace ? "#ff6467" : "#cccccc"}`,
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
            {errors.workplace && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.workplace}
              </motion.span>
            )}
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};
