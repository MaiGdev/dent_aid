import { ArrowBack, CheckBoxOutlined, Save } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import "dayjs/locale/en";
import { motion } from "framer-motion";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useForm, useUserStore } from "../../hooks";
import { useScheduleAppointmentApi } from "../../hooks/useScheduleAppointmentApi";
import { DentAidLayout } from "../layout/DentAidLayout";

const formData = {
  dentistId: "",
  patientId: "",
  start: "",
  end: "",
};

export const Appointment = () => {
  const navigator = useNavigate();
  const { dentists, patients } = useUserStore();
  const { dentistId, patientId, start, end, formState, onInputChange } =
    useForm(formData);
  const [day, setDay] = useState(dayjs());
  const {
    schedule,
    startGetAvailableSlots,
    startRegisterAppointment,
    startPatientAppointment,
  } = useScheduleAppointmentApi();
  const [isLoading, setIsLoading] = useState(false);
  const [slots, setSlots] = useState();
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    if (dentistId) {
      setIsLoading(true);
      console.log(dentistId);
      const resp = startGetAvailableSlots(dentistId, day).finally(() => {
        setIsLoading(false);
      });
      if (!resp) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No schedule found for the given dentist and day of the week",
        });
      }
    }
  }, [dentistId]);

  useEffect(() => {
    if (schedule && schedule.length > 0) {
      const today = dayjs();
      const dayOfWeek = today.day();

      const todaySchedule = schedule.find((day) => day.dayOfWeek === dayOfWeek);

      setSlots(schedule);
    }
  }, [schedule]);

  const handleSelect = (start, end, index) => {
    setSelectedIndex(index);
    onInputChange({
      target: [
        { name: "start", value: { value: start } },
        { name: "end", value: { value: end } },
      ],
    });
  };

  const onSubmit = async () => {
    const formattedData = {
      dentistId: dentistId,
      patientId: patientId,
      date: day.format("YYYY-MM-DD"),
      dayOfWeek: day.day(),
      start: start,
      end: end,
      description: "first appointment",
    };

    let valueMessage;
    for (const [key, value] of Object.entries(formattedData)) {
      if (!value) {
        switch (key) {
          case "dentistId":
            valueMessage = "Please select a dentist.";
            break;
          case "patientId":
            valueMessage = "Please select a patient.";
            break;
          case "start":
          case "end":
            valueMessage = "Please select available time slots.";
            break;
        }
      }
    }
    if (valueMessage) {
      Swal.fire({
        icon: "warning",
        title: `${valueMessage}`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
    /* 
    try {
      const patientAppointmentExist = await startPatientAppointment(patientId);

      if (patientAppointmentExist.length > 0) {
        Swal.fire({
          title: "Error",
          text: "You already have an appointment scheduled for this day",
          icon: "error",
        });
        return;
      }

      const appointment = await startRegisterAppointment(formatteddata);
      if (appointment) {
        Swal.fire({
          title: "Success!",
          text: "Appointment scheduled successfully",
          icon: "success",
        }).then(() => navigator("/dentaid/appointments"));
      }
    } catch (error) {
      console.error(error);
    } */

    /*     console.log(formState);
    console.log(formatteddata); */
  };

  return (
    <DentAidLayout>
      <Box
        sx={{
          minHeight: "100%",
          borderRadius: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
            padding: "2.5rem",
            borderRadius: "1rem",
          }}
        >
          <Paper sx={{ outline: "1px solid #cccccc", borderRadius: "1rem" }}>
            <Grid2
              sx={{
                width: "100%",
                backgroundColor: "#333333",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                padding: "4px 14px",

                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  navigator(`/dentaid/appointments`);
                }}
                startIcon={<ArrowBack />}
                sx={{
                  color: "#fff",
                  minWidth: 0,
                  padding: "0 5px",
                  gap: "5px",
                  width: "fit-content",
                  height: "fit-content",
                  textTransform: "none",
                  outline: "0 solid transparent",
                  transition:
                    "outline 0.15s ease-in-out, background-color 0.3s ease-in-out",
                  "&:hover": {
                    color: "#fff",
                    outline: "1.5px solid #fff",
                    backgroundColor: "#01448A",
                  },
                }}
              >
                Back
              </Button>
            </Grid2>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                padding: "3rem",
              }}
            >
              <Grid2 xs={12}>
                <Typography variant="h1" sx={{ fontSize: "1.875rem" }}>
                  New appointment
                </Typography>
              </Grid2>
              <Grid2
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography
                  sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
                >
                  Select a dentist to see his available schechule
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
              <Grid2
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
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
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Paper
                  sx={{ border: "1px solid #92959E", borderRadius: "1rem" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={day}
                      /*    readOnly */
                      disabled={!dentistId}
                      onChange={(newValue) => setDay(newValue)}
                    />
                  </LocalizationProvider>
                </Paper>
                <Box sx={{ overflowY: "auto", maxHeight: "350px" }}>
                  <List
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                      padding: "0 1.6rem 0 1rem",
                      height: "100%",
                    }}
                  >
                    {dentistId === "" ? (
                      <Alert severity="info">
                        <Typography>
                          Please select a dentist to view their available
                          schedule.
                        </Typography>
                      </Alert>
                    ) : isLoading ? (
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
                    ) : slots && slots.length > 0 ? (
                      slots.map((day, index) => (
                        <ListItem key={index} disablePadding>
                          <motion.div
                            initial={{ width: 138 }}
                            animate={{
                              width: selectedIndex === index ? 182 : 182,
                            }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <ListItemButton
                              onClick={() =>
                                handleSelect(day.start, day.end, index)
                              }
                              sx={{
                                backgroundColor:
                                  selectedIndex === index ? "#0B6911" : "#fff",
                                color:
                                  selectedIndex === index ? "#fff" : "#4285CB",
                                border: `2px solid ${
                                  selectedIndex === index
                                    ? "#0B6911"
                                    : "#4285CB"
                                }`,
                                fontSize: "0.875rem",
                                fontWeight: "600",
                                borderRadius: "1rem",
                                textTransform: "none",
                                display: "flex",
                                alignItems: "center",
                                padding: ".2rem 1.7rem",
                                transition: "all 0.3s",
                                textAlign: "center",
                                "&:hover": {
                                  backgroundColor: "#4285CB",
                                  color: "#fff",
                                },
                              }}
                            >
                              <ListItemText
                                primary={`${day.start}-${day.end}`}
                              />
                              {selectedIndex === index && (
                                <motion.span
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{
                                    duration: 0.1,
                                    ease: "easeOut",
                                  }}
                                >
                                  <CheckBoxOutlined />
                                </motion.span>
                              )}
                            </ListItemButton>
                          </motion.div>
                        </ListItem>
                      ))
                    ) : (
                      <Alert severity="warning">
                        <Typography>
                          No available schedule for this dentist
                        </Typography>
                      </Alert>
                    )}
                  </List>
                </Box>
              </Box>
              <Grid2 sx={{ display: "flex", gap: "1rem" }}>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => {
                    navigator(`/dentaid/appointments`);
                  }}
                  fullWidth
                  sx={{
                    backgroundColor: "#fff",
                    color: "#475B6F",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    borderRadius: "1.5rem",
                    marginTop: "40px",
                    gap: "0.3rem",
                    textTransform: "none",
                    "&:hover": {
                      color: "#475B6F",
                      boxShadow: "0 0 0 2px #475B6F",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  endIcon={<Save />}
                  onClick={onSubmit}
                  fullWidth
                  sx={{
                    backgroundColor: "#01448A",
                    color: "white",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    borderRadius: "1.5rem",
                    marginTop: "40px",
                    gap: "0.3rem",
                    textTransform: "none",

                    "&:hover": {
                      backgroundColor: "white",
                      color: "#01448A",
                      boxShadow: "0 0 0 2px #01448A",
                    },
                  }}
                >
                  Save
                </Button>
              </Grid2>
            </Box>
          </Paper>
        </Grid2>
      </Box>
    </DentAidLayout>
  );
};
