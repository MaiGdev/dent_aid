import { Box, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useForm, useUserStore } from "../../hooks";
import { useScheduleAppointmentApi } from "../../hooks/useScheduleAppointmentApi";

import {
  ActionButtons,
  CardContainer,
  DatePickerSection,
  DentistSelect,
  PatientSelect,
  TimeSlotList,
} from "../components";
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

      const appointment = await startRegisterAppointment(formattedData);
      if (appointment) {
        Swal.fire({
          title: "Success!",
          text: "Appointment scheduled successfully",
          icon: "success",
        }).then(() => navigator("/dentaid/appointments"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DentAidLayout>
      <CardContainer
        justifyContent="center"
        urlNavigate="/dentaid/appointments"
      >
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
          <DentistSelect
            dentists={dentists}
            dentistId={dentistId}
            onInputChange={onInputChange}
          />
          <PatientSelect
            patients={patients}
            patientId={patientId}
            onInputChange={onInputChange}
          />
          <Box sx={{ display: "flex", gap: "20px" }}>
            <DatePickerSection
              day={day}
              setDay={setDay}
              dentistId={dentistId}
            />
            <TimeSlotList
              slots={slots}
              selectedIndex={selectedIndex}
              handleSelect={handleSelect}
              dentistId={dentistId}
              isLoading={isLoading}
            />
          </Box>
          <ActionButtons onSubmit={onSubmit} navigator={navigator} />
        </Box>
      </CardContainer>
    </DentAidLayout>
  );
};
