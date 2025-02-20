import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useDispatch, useSelector } from "react-redux";
import { updateDayBreaks } from "../store/schedule/scheduleSlice";

dayjs.extend(isBetween);
dayjs.locale("en");

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const useScheduleLogic = () => {
  const dispatch = useDispatch();
  const { formState } = useSelector((state) => state.scheduleSlice);

  const calculateAvailableTimeSlots = (
    startTime,
    endTime,
    breaks,
    slotDuration
  ) => {
    const slots = [];
    let currentSlot = dayjs(startTime);

    while (currentSlot.isBefore(endTime)) {
      const slotEnd = currentSlot.add(slotDuration, "minute");

      const isInBreak = breaks.some((breakItem) => {
        const breakStart = dayjs(breakItem.start, "HH:mm"); 
        const breakEnd = dayjs(breakItem.end, "HH:mm");

        return (
          currentSlot.isBetween(breakStart, breakEnd, null, "[)") ||
          slotEnd.isBetween(breakStart, breakEnd, null, "(]") ||
          (currentSlot.isBefore(breakStart) && slotEnd.isAfter(breakEnd))
        );
      });

      if (
        !isInBreak &&
        (slotEnd.isBefore(endTime) || slotEnd.isSame(endTime))
      ) {
        slots.push({
          start: currentSlot.format("HH:mm"),
          end: slotEnd.format("HH:mm"),
        });
      }

      currentSlot = currentSlot.add(slotDuration, "minute");
    }
    return slots;
  };

  const addBreak = (day) => {
    const newBreak = { start:  dayjs("00:00", "HH:mm").format("HH:mm"), end:  dayjs("00:00", "HH:mm").format("HH:mm") };
    const updatedBreaks = [...(formState[day]?.breaks || []), newBreak];
    dispatch(updateDayBreaks({ day, breaks: updatedBreaks }));
  };

  const removeBreak = (day, index) => {
    const filteredBreaks =
      formState[day]?.breaks?.filter((_, i) => i !== index) || [];
    dispatch(updateDayBreaks({ day, breaks: filteredBreaks }));
  };

  const validateBreaks = (dayData) => {
    return dayData.breaks.every((breakItem) => {
      const breakStart = dayjs(breakItem.start);
      const breakEnd = dayjs(breakItem.end);
      return breakEnd.isAfter(breakStart);
    });
  };

  const onBreakTimeChange = ({ day, index, field, value }) => {
    const updatedBreaks =
      formState[day]?.breaks?.map((breakItem, i) =>
        i === index ? { ...breakItem, [field]: value } : breakItem
      ) || [];

    if (validateBreaks({ breaks: updatedBreaks })) {
      dispatch(updateDayBreaks({ day, breaks: updatedBreaks }));
    }
  };

  const formatScheduleDataForAPI = ({ formState: xFormState }) => {
    return Object.entries(xFormState)
      .filter(([dayName]) => dayName !== "slotDuration")
      .filter(([_, dayData]) => dayData.isNonWorking !== true)
      .map(([dayName, dayData]) => ({
        dayOfWeek: mapDayNameToNumber(dayName),
        startTime: dayjs(dayData.start, "HH:mm").format("HH:mm"),
        endTime: dayjs(dayData.end, "HH:mm").format("HH:mm"),
        breaks: dayData.breaks?.map((br) => ({
          start: br.start,
          end: br.end,
          /*           start: br.start.format("HH:mm"),
          end: br.end.format("HH:mm"), */
        })),
        slots: calculateAvailableTimeSlots(
          dayjs(dayData.start, "HH:mm"),
          dayjs(dayData.end, "HH:mm"),
          dayData.breaks,
          formState.slotDuration
        ),
        slotDuration: formState.slotDuration,
      }));
  };

  const mapDayNameToNumber = (dayName) => {
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

  const onInputChange = (event) => {
    if (event?.target) {
      const { name, value, type, checked } = event.target;
      const finalValue = type === "checkbox" ? checked : value;
      dispatch(updateFormState({ name, value: finalValue }));
    }
  };
  return {
    formState,
    onInputChange,
    days,
    addBreak,
    removeBreak,
    onBreakTimeChange,
    formatScheduleDataForAPI,
    calculateAvailableTimeSlots,
    validateBreaks,
    mapDayNameToNumber,
  };
};
