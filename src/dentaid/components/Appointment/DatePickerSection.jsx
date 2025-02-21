import { Paper } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useScheduleStore } from "../../../hooks";
import { resetScheduleSlots, updateSlotState } from "../../../store";
import { updateAppointmentDayState } from "../../../store/appointment/appointmentSlice";

const dayNameToNumber = (dayName) => {
  const daysMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  return daysMap[dayName];
};

export const DatePickerSection = ({ dentistId, setIsLoading, day, setDay }) => {
  /*   const [day, setDay] = useState(dayjs()); */
  const { startGetAvailableSlots } = useScheduleStore();
  const dispatch = useDispatch();
  const { schedule } = useSelector((state) => state.scheduleSlice);

  useEffect(() => {
    dispatch(updateAppointmentDayState(dayjs(day).format("YYYY-MM-DD")));
  }, [day]);

  const scheduleDays = Object.keys(schedule).filter(
    (scheduleDay) => scheduleDay !== "slotDuration"
  );

  const availableDaysNumbers = scheduleDays.map(dayNameToNumber);

  useEffect(() => {
    if (dentistId) {
      setIsLoading(true);

      const fetchAvailableSlots = async () => {
        try {
          const data = await startGetAvailableSlots(dentistId, day);

          if (data.length > 0) {
            dispatch(updateSlotState(data));
            setIsLoading(false);
          } else {
            dispatch(resetScheduleSlots());
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
  }, [day]);

  const shouldDisableDate = (date) => {
    const dayjsDate = dayjs(date);
    const isFutureOrCurrentDate =
      dayjsDate.isSame(dayjs(), "day") || dayjsDate.isAfter(dayjs(), "day");
    const dayOfWeek = dayjsDate.day();

    return !isFutureOrCurrentDate || !availableDaysNumbers.includes(dayOfWeek);
  };

  return (
    <Paper sx={{ border: "1px solid #92959E", borderRadius: "1rem" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={day}
          disabled={!dentistId}
          onChange={(newValue) => setDay(newValue)}
          shouldDisableDate={shouldDisableDate}
        />
      </LocalizationProvider>
    </Paper>
  );
};
