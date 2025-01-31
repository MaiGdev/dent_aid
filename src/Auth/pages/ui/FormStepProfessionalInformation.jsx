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
            Professional Information
          </InputLabel>
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
