import { EventNote, Search, WatchLater } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Grid2,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const FilterControls = ({
  dentists,
  selectedDentist,
  selectedStatus,
  patientInput,
  selectedDate,
  handleFilterChange,
  navigator,
}) => {
  const appointmentStatus = [
    { value: "pending", label: "Pending" },
    { value: "scheduled", label: "Scheduled" },
    { value: "finished", label: "Finished" },
    { value: "cancel", label: "Cancel" },
  ];

  return (
    <Grid2
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "clamp(0px,2vw,100px)",
      }}
    >
      <Grid2
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ width: "205px" }}>
          <InputLabel
            id="user-select-label"
            sx={{
              transform: "translate(14px, 5px) scale(1)",
              transition: "all 0.2s ease-in-out",
              "&.Mui-focused, &.MuiInputLabel-shrink": {
                transform: "translate(14px, -8px) scale(0.75)",
              },
            }}
          >
            Dentist
          </InputLabel>
          <Select
            labelId="user-select-label"
            id="demo-simple-select"
            value={selectedDentist}
            onChange={(e) => {
              handleFilterChange({
                target: {
                  name: "user-select",
                  value: e.target.value,
                },
              });
            }}
            sx={{
              fontSize: "0.875rem",
              height: "2.063rem",
              borderRadius: ".4rem",
              color: "#5A6474",
              textAlign: "left",
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 5px) scale(1) !important",
                "&.Mui-focused, &.MuiInputLabel-shrink": {
                  transform: "translate(14px, -8px) scale(0.75) !important",
                },
              },
            }}
            label="Dentist"
          >
            {dentists.map((dentist) => (
              <MenuItem key={dentist.id} value={dentist.id}>
                {dentist.user.fullName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: "205px" }}>
          <InputLabel
            id="status-select-label"
            sx={{
              transform: "translate(14px, 5px) scale(1)",
              transition: "all 0.2s ease-in-out",
              "&.Mui-focused, &.MuiInputLabel-shrink": {
                transform: "translate(14px, -8px) scale(0.75)",
              },
            }}
          >
            Status
          </InputLabel>
          <Select
            labelId="status-select-label"
            id="demo-simple-select"
            value={selectedStatus}
            onChange={(e) => {
              handleFilterChange({
                target: {
                  name: "status-select",
                  value: e.target.value,
                },
              });
            }}
            sx={{
              fontSize: "0.875rem",
              height: "2.063rem",
              borderRadius: ".4rem",
              color: "#5A6474",
              textAlign: "left",
            }}
            label="Status"
          >
            {appointmentStatus.map((status, index) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="input-with-icon-textfield"
          placeholder="Patient"
          value={patientInput}
          onChange={(e) => {
            handleFilterChange({
              target: {
                name: "patient-input",
                value: e.target.value,
              },
            });
          }}
          sx={{
            fontSize: "0.875rem",
            height: "2.063rem",
            color: "#5A6474",
            textAlign: "left",
            "& .MuiInputBase-root": {
              borderRadius: ".4rem",
              height: "100%",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            },
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              handleFilterChange({
                target: {
                  name: "date-select",
                  value: date,
                },
              });
            }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "0.875rem",
                height: "2.063rem",
                borderRadius: ".5rem",
                textAlign: "left",
                width: "140px",
                paddingRight: "8px",
              },
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 5px) scale(1)",
                whiteSpace: "nowrap",
                width: "fit-content",
                "&.Mui-focused, &.MuiInputLabel-shrink": {
                  transform: "translate(10px, -8px) scale(0.75) !important",
                },
              },
              "& .MuiInputBase-input": {
                width: "100%",
              },
            }}
            label="Date"
          />
        </LocalizationProvider>
      </Grid2>
      <Grid2>
        <Button
          onClick={() => {
            navigator("/dentaid/appointments/847623985");
          }}
          startIcon={<EventNote />}
          sx={{
            backgroundColor: "#01448A",
            color: "white",
            fontSize: "clamp(0.75rem, 2.5vw, 0.875rem)",
            fontWeight: "600",
            borderRadius: ".5rem",
            textTransform: "none",
            gap: "0.5rem",
            "&:hover": {
              backgroundColor: "#4A5D72",
            },
          }}
        >
          New appointment
        </Button>
      </Grid2>
    </Grid2>
  );
};
