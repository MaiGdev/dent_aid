import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { dentaidApi } from "../api/dentaidApi";
import { useScheduleState } from "./useScheduleState";

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

export const useScheduleLogic = ({ idDentist }) => {
  const { formState, onInputChange, updateDayBreaks } = useScheduleState();

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
        const breakStart = dayjs(breakItem.start);
        const breakEnd = dayjs(breakItem.end);

        return (
          currentSlot.isBetween(breakStart, breakEnd, null, "[)") ||
          slotEnd.isBetween(breakStart, breakEnd, null, "(]") ||
          (currentSlot.isBefore(breakStart) && slotEnd.isAfter(breakEnd))
        );
      });

      if (!isInBreak && slotEnd.isBefore(endTime)) {
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
    const newBreak = { start: dayjs().hour(12), end: dayjs().hour(13) };
    const updatedBreaks = [...(formState[day]?.breaks || []), newBreak];
    updateDayBreaks(day, updatedBreaks);
  };

  const removeBreak = (day, index) => {
    const filteredBreaks =
      formState[day]?.breaks?.filter((_, i) => i !== index) || [];
    updateDayBreaks(day, filteredBreaks);
  };

  const validateBreaks = (dayData) => {
    return dayData.breaks.every((breakItem) => {
      const breakStart = dayjs(breakItem.start);
      const breakEnd = dayjs(breakItem.end);
      return breakEnd.isAfter(breakStart);
    });
  };

  const onBreakTimeChange = (day, index, field, value) => {
    const updatedBreaks =
      formState[day]?.breaks?.map((breakItem, i) =>
        i === index ? { ...breakItem, [field]: value } : breakItem
      ) || [];

    if (validateBreaks({ breaks: updatedBreaks })) {
      updateDayBreaks(day, updatedBreaks);
    }
  };

  const formatScheduleDataForAPI = () => {
    return Object.entries(formState)
      .filter(([dayName]) => dayName !== "slotDuration")
      .map(([dayName, dayData]) => ({
        dayOfWeek: mapDayNameToNumber(dayName),
        startTime: dayData.start?.format("HH:mm"),
        endTime: dayData.end?.format("HH:mm"),
        breaks: dayData.breaks?.map((br) => ({
          start: br.start.format("HH:mm"),
          end: br.end.format("HH:mm"),
        })),
        slots: calculateAvailableTimeSlots(
          dayData.start,
          dayData.end,
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

  const submitSchedule = async () => {
    try {
      const scheduleData = formatScheduleDataForAPI();
      const formData = {
        schedule: scheduleData,
        dentist: idDentist,
      };
      const response = await dentaidApi.post("/schedule", formData);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
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
    submitSchedule,
  };
};
