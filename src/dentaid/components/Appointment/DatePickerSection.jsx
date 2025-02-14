import { Paper } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const DatePickerSection = ({ day, setDay, dentistId }) => {
  return (
    <Paper sx={{ border: "1px solid #92959E", borderRadius: "1rem" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={day}
          disabled={!dentistId}
          onChange={(newValue) => setDay(newValue)}
        />
      </LocalizationProvider>
    </Paper>
  );
};
