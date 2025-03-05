import { Autocomplete, Box, Grid2, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useContext } from "react";
import { FormContext } from "../../../context/FormContext";
import {
  bloodTypeOptions,
  dentalMedicalConditions,
  knownAllergiesOptions,
} from "./constants";

export const FormStepHealthInformation = () => {
  const {
    medicalConditions,
    knownAllergies,
    bloodType,
    onMultipleSelectChange,
    onInputChange,
    errors,
  } = useContext(FormContext);
  return (
    <>
      <Box>
        <Grid2 container direction="column" spacing={2}>
          <Typography
            variant="h2"
            className="!text-base md:!text-lg lg:!text-2xl text-[#404D61]"
          >
            Health Information
          </Typography>
          <Grid2 size={12}>
            <Autocomplete
              sx={{
                marginTop: "0.5rem",
                "& .MuiInputBase-root": {
                  borderRadius: ".5rem",
                  border: `${
                    errors.medicalConditions ? "1px solid #ff6467" : ""
                  }`,
                  padding: "0 14px",
                },
              }}
              fullWidth
              disablePortal
              options={dentalMedicalConditions}
              value={medicalConditions}
              onChange={(event, newValue) => {
                onMultipleSelectChange({
                  target: {
                    name: "medicalConditions",
                    value: newValue,
                  },
                });
              }}
              multiple
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Existing Medical Conditions"
                  InputLabelProps={{
                    style: {
                      top: "-9px",
                      color: "#A2A2A2",
                    },
                  }}
                />
              )}
            />
            {errors.medicalConditions && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.medicalConditions}
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
                  border: `${errors.knownAllergies ? "1px solid #ff6467" : ""}`,
                },
              }}
              fullWidth
              disablePortal
              options={knownAllergiesOptions}
              value={knownAllergies}
              onChange={(event, newValue) => {
                onMultipleSelectChange({
                  target: {
                    name: "knownAllergies",
                    value: newValue,
                  },
                });
              }}
              multiple
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Known Allergies"
                  InputLabelProps={{
                    style: {
                      top: "-9px",
                      color: "#A2A2A2",
                    },
                  }}
                />
              )}
            />
            {errors.knownAllergies && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.knownAllergies}
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
                  border: `${errors.bloodType ? "1px solid #ff6467" : ""}`,
                },
              }}
              fullWidth
              disablePortal
              options={bloodTypeOptions}
              value={bloodType}
              onChange={(event, newValue) => {
                onInputChange({
                  target: {
                    name: "bloodType",
                    value: newValue,
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Blood Type"
                  InputLabelProps={{
                    style: {
                      top: "-9px",
                      color: "#A2A2A2",
                    },
                  }}
                />
              )}
            />
            {errors.bloodType && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.bloodType}
              </motion.span>
            )}
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};

