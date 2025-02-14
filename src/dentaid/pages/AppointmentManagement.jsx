import { EventNote, Search, WatchLater } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/en";
import utc from "dayjs/plugin/utc";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../helpers/formatDate";
import { useUserStore } from "../../hooks";
import { useScheduleAppointmentApi } from "../../hooks/useScheduleAppointmentApi";
import { DentAidLayout } from "../layout/DentAidLayout";

dayjs.extend(utc);

const appointmentStatus = [
  { value: "pending", label: "Pending" },
  { value: "scheduled", label: "Scheduled" },
  { value: "finished", label: "Finished" },
  { value: "cancel", label: "Cancel" },
];

export const AppointmentManagement = () => {
  const theme = useTheme();
  const navigator = useNavigate();
  const { dentists } = useUserStore();
  const [patientInput, setPatientInput] = useState("");
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { appointments = [], startAppointments } = useScheduleAppointmentApi();
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    startAppointments().finally(() => {
      setIsLoading(false);
    });
  }, []);
  useEffect(() => {
    setFilteredAppointments(appointments);
  }, [appointments]);

  useEffect(() => {
    if (!appointments) return;
    let filtered = appointments;

    if (patientInput) {
      filtered = filtered.filter((appointment) =>
        appointment.patient.user.fullName
          .toLowerCase()
          .includes(patientInput.toLowerCase())
      );
    }

    if (selectedDentist) {
      filtered = filtered.filter(
        (appointment) => appointment.dentist.id === selectedDentist
      );
    }
    if (selectedStatus) {
      filtered = filtered.filter(
        (appointment) => appointment.status === selectedStatus
      );
    }
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate)
        .utc(true)
        .startOf("day")
        .format("YYYY-MM-DD");

      console.log(`Date: ${formattedDate}`);
      filtered = filtered.filter(
        (appointment) =>
          dayjs(appointment.date).utc().format("YYYY-MM-DD") === formattedDate
      );
    }

    setFilteredAppointments(filtered);
  }, [patientInput, selectedDentist, selectedStatus, selectedDate]);

  const handleFilterChange = ({ target }) => {
    const { name, value } = target;

    if (name === "user-select") {
      setSelectedDentist(value);
    } else if (name === "patient-input") {
      setPatientInput(value);
    } else if (name === "status-select") {
      setSelectedStatus(value);
    } else if (name === "date-select") {
      setSelectedDate(value);
    }
  };

  return (
    <DentAidLayout>
      <Box
        sx={{
          minHeight: "100%",
          borderRadius: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          backgroundColor: "#fff",
          border: "1px solid #cccccc",
        }}
      >
        <Grid2
          container
          direction={"column"}
          spacing={3}
          sx={{
            backgroundColor: "#fff",
            padding: "7rem 2.5rem",
            borderRadius: "1rem",
          }}
        >
          <Grid2 xs={12}>
            <Typography variant="h1" sx={{ fontSize: "1.875rem" }}>
              Appointment management
            </Typography>
            <Typography
              sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
            >
              Information about...
            </Typography>
          </Grid2>

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
                    "&.Mui-focused, &.MuiInputLabel-shrink": {
                      transform: "translate(13px, -9px) scale(0.75)",
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
                    "&.Mui-focused, &.MuiInputLabel-shrink": {
                      transform: "translate(13px, -9px) scale(0.75)",
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
                    <MenuItem key={status.index} value={status.value}>
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
                  /*  width: "180px", */
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
                        transform:
                          "translate(10px, -8px) scale(0.75) !important",
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

          <Divider />
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                padding: "2rem",
              }}
            >
              <CircularProgress size="50px" />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                /* justifyContent: "space-between", */
                flexDirection: "column",
                flexWrap: "wrap",
                gap: "22px",
                [theme.breakpoints.down("md")]: {
                  justifyContent: "center",
                  alignContent: "center",
                },
              }}
            >
              {filteredAppointments && filteredAppointments.length > 0 ? (
                filteredAppointments.map((appointment, index) => (
                  <Card
                    key={index}
                    sx={{
                      /*      maxWidth: 254, */
                      width: "auto",
                      outline: "1px solid #00000066",
                      borderRadius: "10px",
                      boxShadow: "none",
                    }}
                  >
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",

                        padding: "20px 20px",
                      }}
                    >
                      <Typography sx={{ color: "#666666", fontSize: "14px" }}>
                        {formatDate(appointment.date)}
                      </Typography>
                      <Grid2>
                        <Typography variant="h5" component="div">
                          {`Patient:   ${appointment.patient.user.fullName}`}
                        </Typography>
                        <Grid2 sx={{ display: "flex", gap: ".5rem" }}>
                          <WatchLater />
                          <Typography>
                            {appointment.start} - {appointment.end}
                          </Typography>
                        </Grid2>
                      </Grid2>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "0 20px 20px 0",
                      }}
                    >
                      <Button
                        sx={{
                          backgroundColor: "#4285CB",
                          color: "white",
                          fontSize: "1rem",
                          fontWeight: "500",
                          borderRadius: "1rem",
                          textTransform: "none",
                          padding: ".2rem 1rem",
                          gap: "0.5rem",
                          "&:hover": {
                            backgroundColor: "#4A5D72",
                          },
                        }}
                      >
                        Details
                      </Button>
                    </CardActions>
                    <Grid2
                      sx={{
                        width: "100%",
                        height: "5px",
                        backgroundColor: "#4285CB",
                      }}
                    />
                  </Card>
                ))
              ) : (
                <Typography>No appointments found.</Typography>
              )}
              <Grid2
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "end",
                  width: "100%",
                  paddingTop: "1rem",
                }}
              >
                <Pagination count={10} variant="outlined" shape="rounded" />
              </Grid2>
            </Box>
          )}
        </Grid2>
      </Box>
    </DentAidLayout>
  );
};
