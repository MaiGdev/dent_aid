import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export const PatientSelect = ({ patients, patientId, onInputChange }) => {
  return (
    <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Typography
        sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
      >
        Select a patient
      </Typography>
      <FormControl>
        <InputLabel
          id="userType-label"
          sx={{
            transform: "translate(14px, 5px) scale(1)",
            "&.Mui-focused, &.MuiInputLabel-shrink": {
              transform: "translate(14px, -9px) scale(0.75)",
            },
          }}
        >
          Patient
        </InputLabel>
        <Select
          labelId="userType-label"
          id="patientId"
          value={patientId}
          label="Patient"
          onChange={onInputChange}
          name="patientId"
          defaultValue={1}
          sx={{
            fontSize: "0.875rem",
            height: "2.063rem",
            borderRadius: ".4rem",
            color: "#5A6474",
            textAlign: "left",
          }}
        >
          {patients.map((patient, index) => (
            <MenuItem key={index} value={patient.id}>
              {patient.user.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid2>
  );
};
