import {
  Autocomplete,
  Box,
  Grid2,
  Input,
  TextField,
  Typography,
} from "@mui/material";
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
    emergencyPhoneNumber,
    onMultipleSelectChange,
    onInputChange,
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
            Health Information
          </Typography>
          <Grid2 size={12}>
            <Autocomplete
              sx={{
                marginTop: "0.5rem",
                "& .MuiInputBase-root": {
                  borderRadius: ".5rem",
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
          </Grid2>

          <Grid2 size={12}>
            <Autocomplete
              sx={{
                marginTop: "0.5rem",
                "& .MuiInputBase-root": {
                  borderRadius: ".5rem",
                  padding: "0 14px",
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
          </Grid2>
          <Grid2 size={12}>
            <Autocomplete
              sx={{
                marginTop: "0.5rem",
                "& .MuiInputBase-root": {
                  borderRadius: ".5rem",
                  padding: "0 14px",
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
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};
