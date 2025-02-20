import { ArrowBack, Save } from "@mui/icons-material";
import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import isBetween from "dayjs/plugin/isBetween";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useScheduleAppointmentApi, useScheduleLogic } from "../../hooks/";
import {
  onGetScheduleFromApi,
  resetFormState,
  resetScheduleState,
  updateFormState,
} from "../../store";
import { DaySchedule, SlotDurationSelector } from "../components";
import { DentAidLayout } from "../layout/DentAidLayout";

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

export const DentistSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { startGetSchedule, startUpdateSchedule, startRegisterSchedule } =
    useScheduleAppointmentApi();
  const { formatScheduleDataForAPI } = useScheduleLogic();
  const dispatch = useDispatch();

  const { schedule, formState } = useSelector((state) => state.scheduleSlice);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await startGetSchedule({ idDentist: id });
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
  }, [id, dispatch]);

  useEffect(() => {
    const updatedFormState = {
      ...formState,
      ...schedule,
      slotDuration: schedule.slotDuration,
    };
    dispatch(updateFormState(updatedFormState));
  }, [schedule]);

  const handleRegisterSubmit = async () => {
    try {
      if (hasWorkingDays()) return;
      const filterdSchedule = formatScheduleDataForAPI({ formState });

      if (isStartEndValid(filterdSchedule)) return;

      const form = await startRegisterSchedule({formState, id});
      if (form) {
        Swal.fire({
          title: "Schedule Saved!",
          icon: "success",
          confirmButtonText: "Close",
        });
        navigate(`/dentaid/user-management`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const hasWorkingDays = () => {
    const workingDays = Object.entries(formState)
      .filter(([day]) => day !== "slotDuration")
      .every(([, payload]) => payload.isNonWorking === true);

    if (workingDays) {
      Swal.fire({
        title: "No working days found",
        icon: "warning",
        confirmButtonText: "Close",
      });
      return true;
    }
    return false;
  };

  const isStartEndValid = (filterdSchedule) => {
    const resp = filterdSchedule
      .map((day) => {
        const start = dayjs(day.startTime, "HH:mm");
        const end = dayjs(day.endTime, "HH:mm");
        return start.isBefore(end);
      })
      .some((value) => value === false);

    if (resp) {
      Swal.fire({
        title: "Start time should be before end time",
        icon: "warning",
        confirmButtonText: "Close",
      });
      return true;
    }
    return false;
  };

  const handleUpdateSubmit = async () => {
    try {
      // validations
      if (hasWorkingDays()) return;
      const filterdSchedule = formatScheduleDataForAPI({ formState });

      if (isStartEndValid(filterdSchedule)) return;

      // update schedule
      const form = await startUpdateSchedule({ formState, id });
      if (form) {
        Swal.fire({
          title: `${form.data.message}`,
          icon: "success",
          confirmButtonText: "Close",
        });
        navigate(`/dentaid/user-management`);
      }
    } catch (error) {
      console.error(error);
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
          alignItems: "center",
          width: "100%",
          backgroundColor: "#fff",
          border: "1px solid #cccccc",
          padding: "4rem",
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
                navigate(`/dentaid/user/${id}?usertype=DENTIST_ROLE`);
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
          <Grid2
            container
            direction={"column"}
            spacing={3}
            sx={{
              minWidth: "522px",
              backgroundColor: "#fff",
              padding: "1rem 2.5rem 2rem 2.5rem",
              borderBottomLeftRadius: "1rem",
              borderBottomRightRadius: "1rem",
            }}
          >
            <Grid2 xs={12}>
              {schedule.length !== 0 ? (
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "1.875rem",
                    textAlign: "center",
                    padding: "1rem 0",
                  }}
                >
                  Update schedule
                </Typography>
              ) : (
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "1.875rem",
                    textAlign: "center",
                    padding: "1rem 0",
                  }}
                >
                  Schedule
                </Typography>
              )}
            </Grid2>

            {formState &&
              days.map((day) => <DaySchedule key={day} day={day} />)}

            <Grid2
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              {schedule.length === 0 && (
                <>
                  <SlotDurationSelector
                    formState={formState}
                    onInputChange={(event) =>
                      dispatch(
                        updateFormState({
                          name: event.target.name,
                          value: event.target.value,
                        })
                      )
                    }
                  />
                  <Divider orientation="horizontal" />
                </>
              )}

              <Grid2
                sx={{
                  display: "flex",
                  gap: ".5rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  startIcon={<ArrowBack />}
                  fullWidth
                  sx={{
                    backgroundColor: "#fff",
                    color: "#475B6F",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    borderRadius: ".5rem",
                    textTransform: "none",
                    padding: ".5rem 1.5rem",
                    gap: "0.3rem",
                    outline: "0 solid transparent",
                    transition:
                      "outline 0.15s ease-in-out, background-color 0.3s ease-in-out",
                    "&:hover": {
                      color: "#475B6F",
                      outline: "1.5px solid #475B6F",
                    },
                  }}
                >
                  Cancel
                </Button>

                {schedule.length !== 0 ? (
                  <Button
                    onClick={handleUpdateSubmit}
                    endIcon={<Save />}
                    fullWidth
                    sx={{
                      backgroundColor: "#01448A",
                      color: "white",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      borderRadius: ".5rem",
                      textTransform: "none",
                      padding: ".5rem 1.5rem",
                      gap: "0.3rem",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#01448A",
                        outline: "1px solid #01448A",
                      },
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    onClick={handleRegisterSubmit}
                    endIcon={<Save />}
                    fullWidth
                    sx={{
                      backgroundColor: "#01448A",
                      color: "white",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      borderRadius: ".5rem",
                      textTransform: "none",
                      padding: ".5rem 1.5rem",
                      gap: "0.3rem",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#01448A",
                        outline: "1px solid #01448A",
                      },
                    }}
                  >
                    Save
                  </Button>
                )}
              </Grid2>
            </Grid2>
          </Grid2>
        </Paper>
      </Box>
    </DentAidLayout>
  );
};
