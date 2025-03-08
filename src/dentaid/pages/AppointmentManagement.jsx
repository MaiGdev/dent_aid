import { Box, Divider, Grid2, Typography, useTheme } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import utc from "dayjs/plugin/utc";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppointmentStore, useAuthStore, useUserStore } from "../../hooks";
import { FilterControls } from "../components/Appointment management/FilterControls";
import { DentAidLayout } from "../layout/DentAidLayout";
import { LoadingSpinner } from "../components";
import { AppointmentList } from "../components/Appointment management/AppointmentList";

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
      <Box className="min-w-full rounded-[3rem] flex justify-center items-start bg-white border border-[#cccccc]">
        <Grid2 className="bg-white px-10 py-28 flex flex-col gap-10">
          {/*           <Grid2>
            <Typography variant="h1" className="!text-3xl text-center">
              Appointment management
            </Typography>
            <Typography className="text-[#92959E] !text-sm !font-extralight text-center">
              View and manage all scheduled appointments.
            </Typography>
          </Grid2>
 */}
          <Grid2 className="  md:w-full text-center">
            <Typography
              variant="h1"
              className=" px-1.5  !text-3xl lg:!text-4xl bg-gradient-to-r from-[#5f83a9] lg:from-[#FFFFFF] to-[#8297ae] lg:to-[#024389] bg-clip-text text-transparent"
            >
              Appointment management
            </Typography>
            <Typography className="hidden md:block !text-sm text-[#92959E] font-extralight">
              View and manage all scheduled appointments.
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
