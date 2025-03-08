import {
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

export const DaySelect = ({}) => {
  return (
    <Grid2 className="flex flex-col gap-2.5 md:!hidden">
      <Typography
        sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
      >
        Select a day of the week
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
          Available days
        </InputLabel>
        <Select
          labelId="userType-label"
          id="patientId"
          label="Patient"
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
          <MenuItem >Monday</MenuItem>
        </Select>
      </FormControl>
    </Grid2>
  );
};
