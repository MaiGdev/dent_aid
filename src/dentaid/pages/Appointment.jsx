import { Box, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAppointmentStore, useForm, useUserStore } from "../../hooks";
import { useScheduleStore } from "../../hooks/useScheduleStore";

import { useDispatch, useSelector } from "react-redux";
import {
  onGetScheduleFromApi,
  resetFormState,
  resetScheduleState,
  updateSlotState,
} from "../../store";
import { updateAppointmentsState } from "../../store/appointment/appointmentSlice";
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
  const { dentistId, patientId, start, end, onInputChange } = useForm(formData);
  const { startGetSchedule, startGetAvailableSlots } = useScheduleStore();
  const { startRegisterAppointment } = useAppointmentStore();

  const [day, setDay] = useState(dayjs());
  const { startPatientAppointment } = useAppointmentStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const dispatch = useDispatch();
  const { patientAppointments } = useSelector(
    (state) => state.appointmentSlice
  );

  useEffect(() => {
    if (dentistId) {
      setIsLoading(true);
      console.log(dentistId);

      const fetchSchedule = async () => {
        try {
          const data = await startGetSchedule({ idDentist: dentistId });
          if (data.length !== 0) {
            let formattedData = data.reduce((acc, day) => {
              const dayOfWeek = dayjs().day(day.dayOfWeek).format("dddd");

              acc[dayOfWeek] = {
                breaks: day.breaks || [],
                end: day.endTime,
                isNonWorking: false,
                start: day.startTime,
              };

              return acc;
            }, {});

            formattedData = {
              slotDuration: data[0].slotDuration,
              ...formattedData,
            };
            dispatch(onGetScheduleFromApi(formattedData));
          } else {
            dispatch(resetFormState());
            dispatch(resetScheduleState());
          }
        } catch (error) {
          console.error("Error fetching schedule:", error);
        }
      };

      fetchSchedule();

      const fetchAvailableSlots = async () => {
        try {
          const data = await startGetAvailableSlots(dentistId, day);

          if (data.length > 0) {
            dispatch(updateSlotState(data));
            setIsLoading(false);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No schedule found for the given dentist and day of the week",
            });
          }
        } catch (error) {
          console.error("Error fetching available slots:", error);
        }
      };
      fetchAvailableSlots();
    }
  }, [dentistId]);

  useEffect(() => {
    if (patientId) {
      setIsLoading(true);
      console.log(patientId);

      const fetchPatientAppointments = async () => {
        try {
          const patientAppointmentExist = await startPatientAppointment(
            patientId
          );
          if (patientAppointmentExist) {
            dispatch(updateAppointmentsState(patientAppointmentExist));
            setIsLoading(false);
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "No schedule found for the given dentist and day of the week",
            });
          }
        } catch (error) {
          console.error("Error fetching available slots:", error);
        }
      };
      fetchPatientAppointments();
    }
  }, [patientId]);

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
      return Swal.fire({
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
      if (Array.isArray(patientAppointments)) {
        const patientAppointmentExist = patientAppointments.some(
          (appointment) => {
            const dayjsDate = dayjs(appointment.date)
              .utc()
              .format("YYYY-MM-DD");
            return dayjsDate === day.format("YYYY-MM-DD");
          }
        );

        if (patientAppointmentExist) {
          return Swal.fire({
            title: "Error",
            text: "Already have an appointment scheduled for this day",
            icon: "error",
          });
        }
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
      <Grid2 className="flex items-center justify-center w-full h-full  ">
        <CardContainer
          justifyContent="center"
          urlNavigate="/dentaid/appointments"
          maxWidth="!max-w-4xl"
        >
          <Box className="flex flex-col gap-8 py-10 px-4 lg:p-[3rem] ">
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
            {/*      <DaySelect /> */}
            <Box className="flex justify-center items-center !w-full gap-5 flex-wrap">
              <Grid2 className="!hidden md:!flex items-start">
                <DatePickerSection
                  dentistId={dentistId}
                  setIsLoading={setIsLoading}
                  day={day}
                  setDay={setDay}
                />
                <TimeSlotList
                  selectedIndex={selectedIndex}
                  handleSelect={handleSelect}
                  dentistId={dentistId}
                  isLoading={isLoading}
                />
              </Grid2>
              <Grid2 className="flex gap-7 flex-col md:!hidden">
                <TimeSlotList
                  selectedIndex={selectedIndex}
                  handleSelect={handleSelect}
                  dentistId={dentistId}
                  isLoading={isLoading}
                />
                <DatePickerSection
                  dentistId={dentistId}
                  setIsLoading={setIsLoading}
                  day={day}
                  setDay={setDay}
                />
              </Grid2>
            </Box>
             <ActionButtons onSubmit={onSubmit} navigator={navigator} />
          </Box>
        </CardContainer>
      </Grid2>
    </DentAidLayout>
  );
};
