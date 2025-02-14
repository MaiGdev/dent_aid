import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export const DentistSelect = ({ dentists, dentistId, onInputChange }) => {
  return (
    <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Typography
        sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
      >
        Select a dentist to see his available schedule
      </Typography>
      <FormControl>
        <InputLabel
          id="dentist-label"
          sx={{
            transform: "translate(14px, 5px) scale(1)",
            "&.Mui-focused, &.MuiInputLabel-shrink": {
              transform: "translate(14px, -9px) scale(0.75)",
            },
          }}
        >
          Dentist
        </InputLabel>
        <Select
          labelId="dentist-label"
          id="dentist-select"
          label="Dentist"
          name="dentistId"
          value={dentistId}
          onChange={onInputChange}
          defaultValue={1}
          sx={{
            fontSize: "0.875rem",
            height: "2.063rem",
            borderRadius: ".4rem",
            color: "#5A6474",
            textAlign: "left",
          }}
        >
          {dentists.map((dentist, index) => (
            <MenuItem key={index} value={dentist.id}>
              {dentist.user.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid2>
  );
};
