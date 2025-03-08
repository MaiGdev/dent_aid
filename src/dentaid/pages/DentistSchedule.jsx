import { ArrowBack, Save } from "@mui/icons-material";
import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import isBetween from "dayjs/plugin/isBetween";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useAuthStore, useScheduleLogic, useScheduleStore } from "../../hooks/";
import {
  onGetScheduleFromApi,
  resetFormState,
  resetScheduleState,
  updateFormState,
} from "../../store";
import { DaySchedule, SlotDurationSelector } from "../components";
import { CleanIcon } from "../icons/CleanIcon";
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
    useScheduleStore();
  const { formatScheduleDataForAPI } = useScheduleLogic();
  const dispatch = useDispatch();
  const { schedule, formState } = useSelector((state) => state.scheduleSlice);
  const [fullLoggedUserData, setFullLoggedUserData] = useState(null);
  const { startGetUser, user } = useAuthStore();

  const location = useLocation();

  const fetchingLoggedUserData = async () => {
    try {
      const userData = await startGetUser({
        id: user.id,
        userType: user.role,
      });
      setFullLoggedUserData(userData);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      let data;
      try {
        if (location.search.includes(`?account=true`)) {
          fetchingLoggedUserData();
          if (!fullLoggedUserData) return;
          data = await startGetSchedule({
            idDentist: fullLoggedUserData.id,
          });
        } else {
          data = await startGetSchedule({ idDentist: id });
        }

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

      const form = await startRegisterSchedule({ formState, id });
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
      let form;
      if (location.search.includes(`?account=true`)) {
        if (!fullLoggedUserData) return;
        form = await startUpdateSchedule({
          formState,
          id: fullLoggedUserData.id,
        });
      } else {
        form = await startUpdateSchedule({ formState, id });
      }

      if (form) {
        Swal.fire({
          title: `${form.data.message}`,
          icon: "success",
          confirmButtonText: "Close",
        });
        if (location.search.includes(`?account=true`)) {
          navigate(`/dentaid/dashboard`);
        } else {
          navigate(`/dentaid/user-management`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DentAidLayout>
      <Box className="min-h-full rounded-[3rem] flex justify-center items-center w-full !bg-white border border-[#ccc] p-[4rem]">
        <Paper className="outline outline-[#ccc] !rounded-2xl">
          <Grid2 className="w-full !bg-[#333] rounded-tl-2xl rounded-tr-2xl px-[14px] py-[4px] flex items-center">
            <Button
              onClick={() => {
                navigate(`/dentaid/user/${id}?usertype=DENTIST_ROLE`);
              }}
              startIcon={<ArrowBack />}
              className="!text-white !min-w-0 !py-0 !px-[5px] gap-[5px] !w-fit !h-fit !normal-case"
              sx={{
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
            className="lg:!min-w-[522px] !bg-white pt-4 p-5 sm:px-10 pb-8 rounded-bl-2xl rounded-br-2xl"
          >
            <Grid2 xs={12}>
              {schedule.length !== 0 ? (
                <Typography variant="h1" className="!text-3xl text-center py-4">
                  Update schedule
                </Typography>
              ) : (
                <Typography variant="h1" className="!text-3xl text-center py-4">
                  Schedule
                </Typography>
              )}
            </Grid2>

            {formState &&
              days.map((day) => <DaySchedule key={day} day={day} />)}

            <Grid2 className="flex justify-between flex-col gap-4">
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

              <Grid2 className="flex gap-[0.5rem] justify-center items-center">
                {schedule.length !== 0 ? (
                  <>
                    <Button
                      startIcon={<CleanIcon />}
                      fullWidth
                      className="!bg-white !text-[#B72F2F] !text-sm !font-semibold !rounded-[.5rem] !normal-case !px-6 !py-[.5rem] !gap-[.3rem]"
                      sx={{
                        outline: "0 solid transparent",
                        transition:
                          "outline 0.15s ease-in-out, background-color 0.3s ease-in-out",
                        "&:hover": {
                          outline: "1.5px solid #B72F2F",
                        },
                      }}
                    >
                      Restart
                    </Button>

                    <Button
                      onClick={handleUpdateSubmit}
                      endIcon={<Save />}
                      fullWidth
                      className="!bg-[#01448A] !text-white !text-sm !font-semibold !rounded-[.5rem] !normal-case !px-6 !py-[.5rem] gap-[.3rem] hover:!bg-white hover:!text-[#01448A] hover:!outline hover:!outline-[#01448A]"
                    >
                      Update
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      startIcon={<ArrowBack />}
                      fullWidth
                      className="!bg-white !text-[#475B6F] !text-sm !font-semibold !rounded-[.5rem] !normal-case !px-6 !py-[.5rem] !gap-[.3rem]"
                      sx={{
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
                    <Button
                      onClick={handleRegisterSubmit}
                      endIcon={<Save />}
                      fullWidth
                      className="!bg-[#01448A] !text-white !text-sm !font-semibold !rounded-[.5rem] !normal-case !px-6 !py-[.5rem] !gap-[.3rem] hover:!bg-white hover:!text-[#01448A] hover:!outline hover:!outline-[#01448A]"
                    >
                      Save
                    </Button>
                  </>
                )}
              </Grid2>
            </Grid2>
          </Grid2>
        </Paper>
      </Box>
    </DentAidLayout>
  );
};