import {
  Autocomplete,
  Box,
  Grid2,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { useContext } from "react";
import { FormContext } from "../../../context/FormContext";
import {
  bloodTypeOptions,
  knownAllergiesOptions,
  medicalConditionsOptions,
} from "./constants";

export const FormStepHealthInformation = () => {
  const {
    medicalConditions,
    knownAllergies,
    bloodType,
    emergencyContact,
    onMultipleSelectChange,
    onInputChange,
  } = useContext(FormContext);
  return (
    <>
      <Box sx={{ width: "558.31px" }}>
        <Grid2 container direction="column" spacing={2}>
          <InputLabel
            sx={{
              fontSize: "1.145rem",
              fontWeight: "500", 
              color: "#404D61",
              position: "static",
              textAlign: "left",
            }}
          >
            Health Information
          </InputLabel>
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
              options={medicalConditionsOptions}
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
                onMultipleSelectChange({
                  target: {
                    name: "bloodType",
                    value: newValue,
                  },
                });
              }}
              multiple
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
          <Grid2 size={12}>
            <Input
              id="emergencyContact"
              placeholder="Emergency Contact"
              type="text"
              name="emergencyContact"
              value={emergencyContact}
              onChange={onInputChange}
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
      </Box>
    </>
  );
};
