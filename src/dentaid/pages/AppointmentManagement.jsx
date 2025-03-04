import { Box, Divider, Grid2, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import utc from "dayjs/plugin/utc";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppointmentStore, useAuthStore, useUserStore } from "../../hooks";
import { AppointmentList } from "../components/Appointment management/AppointmentList";
import { FilterControls } from "../components/Appointment management/FilterControls";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { DentAidLayout } from "../layout/DentAidLayout";

dayjs.extend(utc);

export const AppointmentManagement = () => {
  const theme = useTheme();
  const navigator = useNavigate();
  const { dentists } = useUserStore();
  const [patientInput, setPatientInput] = useState("");
  const [selectedDentist, setSelectedDentist] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const {
    appointments = [],
    startGetAppointments,
    startGetPatientAppointments,
    startGetDentistAppointments,
  } = useAppointmentStore();
  const { startGetUser, user } = useAuthStore();
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [fullLoggedUserData, setFullLoggedUserData] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchingLoggedUserData = async () => {
      try {
        const userData = await startGetUser({
          id: user.id,
          userType: user.role,
        });
        setFullLoggedUserData(userData);
      } catch (error) {}
    };
    fetchingLoggedUserData();
  }, [user]);

  useEffect(() => {
    if (fullLoggedUserData) {
      if (user.role === "PATIENT_ROLE") {
        if (fullLoggedUserData) {
          startGetPatientAppointments(fullLoggedUserData.id).finally(() => {
            setIsLoading(false);
          });
        }
      }
      if (user.role === "DENTIST_ROLE") {
        startGetDentistAppointments(fullLoggedUserData.id).finally(() => {
          setIsLoading(false);
        });
      } else {
        startGetAppointments().finally(() => {
          setIsLoading(false);
        });
      }
    }
  }, [fullLoggedUserData]);

  useEffect(() => {
    if (Array.isArray(appointments) && appointments.length > 0) {
      setFilteredAppointments(appointments);
    }
  }, [appointments]);

  useEffect(() => {
    if (!Array.isArray(appointments) || appointments.length === 0) return;
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
    /*   if (selectedDate) {
      const formattedDate = dayjs(selectedDate)
        .utc(true)
        .startOf("day")
        .format("YYYY-MM-DD");
      filtered = filtered.filter(
        (appointment) =>
          dayjs(appointment.date).utc().format("YYYY-MM-DD") === formattedDate
      );
    } */

    setFilteredAppointments(filtered);
  }, [patientInput, selectedDentist, selectedStatus, selectedDate]);

  const handleFilterChange = ({ target }) => {
    const { name, value } = target;
    console.log(appointments);
    if (name === "user-select") {
      setSelectedDentist(value);
    } else if (name === "patient-input") {
      setPatientInput(value);
    } else if (name === "status-select") {
      setSelectedStatus(value);
    } else if (name === "date-select") {
      setSelectedDate(value);
    } else if (name === "clear") {
      setSelectedDentist("");
      setPatientInput("");
      setSelectedStatus("");
      setSelectedDate(dayjs());
    }
    console.log(appointments);
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
          <FilterControls
            dentists={dentists}
            selectedDentist={selectedDentist}
            selectedStatus={selectedStatus}
            patientInput={patientInput}
            selectedDate={selectedDate}
            handleFilterChange={handleFilterChange}
            navigator={navigator}
          />
          <Divider />
          {isLoading ? (
            <LoadingSpinner size="50px" />
          ) : (
            <AppointmentList filteredAppointments={filteredAppointments} />
          )}
        </Grid2>
      </Box>
    </DentAidLayout>
  );
};
