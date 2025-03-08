import { Add } from "@mui/icons-material";
import { Button, Checkbox, Divider, Grid2, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { updateDayBreaks, updateFormState } from "../../../store";
import { TrashIcon } from "../../icons";


export const DaySchedule = ({ day }) => {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.scheduleSlice.formState);

  const startTime = dayjs(formState[day]?.start, "HH:mm");
  const endTime = dayjs(formState[day]?.end, "HH:mm");

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const finalValue = type === "checkbox" ? checked : value;
    dispatch(updateFormState({ name, value: finalValue }));
  };

  const handleAddBreak = (day) => {
    const newBreak = {
      start: dayjs("00:00", "HH:mm").format("HH:mm"),
      /*   start: dayjs().hour(0).minute(0), */
      end: dayjs("00:00", "HH:mm").format("HH:mm"),
    };
    const updatedBreaks = [...(formState[day]?.breaks || []), newBreak];
    dispatch(updateDayBreaks({ day, breaks: updatedBreaks }));
  };

  const handleRemoveBreak = (day, index) => {
    const filteredBreaks =
      formState[day]?.breaks?.filter((_, i) => i !== index) || [];
    dispatch(updateDayBreaks({ day, breaks: filteredBreaks }));
  };

  const handleBreakTimeChange = ({ day, index, field, value }) => {
    const updatedBreaks =
      formState[day]?.breaks?.map((breakItem, i) =>
        i === index ? { ...breakItem, [field]: value } : breakItem
      ) || [];
    dispatch(updateDayBreaks({ day, breaks: updatedBreaks }));
  };

  return (
    <React.Fragment key={day}>
      {formState && (
        <>
          <Grid2 className="flex justify-center gap-4 flex-wrap">
            <Grid2 className="flex justify-start items-start gap-4">
              <Grid2 sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <Checkbox
                  checked={formState[day]?.isNonWorking || false}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: `${day}.isNonWorking`,
                        type: "checkbox",
                        checked: e.target.checked,
                      },
                    })
                  }
                  sx={{ color: "#01448A" }}
                />
                <Typography>{day.substring(0, 3)}</Typography>
              </Grid2>
              <Grid2 className="flex items-center gap-[4px] w-[165px]">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Start"
                    ampm={false}
                    value={startTime}
                    onChange={(value) => {
                      dispatch(
                        updateFormState({
                          name: `${day}.start`,
                          value: dayjs(value).format("HH:mm").toString(),
                        })
                      );
                    }}
                    disabled={formState[day]?.isNonWorking}
                    sx={{
                      "& .css-1xx0ik1-MuiInputBase-root-MuiOutlinedInput-root":
                        {
                          padding: 0,
                        },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#01448A",
                          borderRadius: "1rem",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#01448A",
                        transform: "translate(14px, 7px) scale(1)",
                        "&.Mui-focused, &.MuiInputLabel-shrink": {
                          transform:
                            "translate(14px, -8px) scale(0.75) !important",
                        },
                      },
                      "& .MuiInputAdornment-root": {
                        display: "none",
                      },
                      "& .MuiOutlinedInput-input": {
                        height: ".3rem",
                      },
                    }}
                  />
                  <Typography>-</Typography>
                  <TimePicker
                    label="End"
                    ampm={false}
                    value={endTime}
                    onChange={(value) => {
                      dispatch(
                        updateFormState({
                          name: `${day}.end`,
                          value: dayjs(value).format("HH:mm").toString(),
                        })
                      );
                    }}
                    disabled={formState[day]?.isNonWorking}
                    sx={{
                      "& .css-1xx0ik1-MuiInputBase-root-MuiOutlinedInput-root":
                        {
                          padding: 0,
                        },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "#01448A",
                          borderRadius: "1rem",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#01448A",
                        transform: "translate(14px, 7px) scale(1)",
                        "&.Mui-focused, &.MuiInputLabel-shrink": {
                          transform:
                            "translate(14px, -8px) scale(0.75) !important",
                        },
                      },
                      "& .MuiInputAdornment-root": {
                        display: "none",
                      },
                      "& .MuiOutlinedInput-input": {
                        height: ".3rem",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Grid2>
            </Grid2>
            <Grid2
              container
              direction="column"
              gap={1}
              className="w-full sm:w-fit"
            >
              <>
                <Divider
                  orientation="vertical"
                  className="mr-2 hidden md:block"
                />
                <TransitionGroup>
                  {formState[day]?.breaks &&
                    Object.entries(formState[day]?.breaks).map(
                      ([key, breakItem], index) => (
                        <CSSTransition
                          key={index}
                          timeout={100}
                          classNames="break-transition"
                          unmountOnExit
                        >
                          <Grid2
                            key={index}
                            /*          container */
                            /*   gap={1}
                            alignItems="center" */
                            className="flex items-center gap-1"
                            paddingBottom=".8rem"
                            sx={{
                              width: "fit-content",
                              flexWrap: "nowrap",
                            }}
                          >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="Break start"
                                ampm={false}
                                value={dayjs(breakItem.start, "HH:mm")}
                                onChange={(newValue) =>
                                  handleBreakTimeChange({
                                    day,
                                    index,
                                    field: "start",
                                    value: dayjs(newValue, "HH:mm")
                                      .format("HH:mm")
                                      .toString(),
                                  })
                                }
                                className="w-full sm:!w-[100px]"
                                sx={{
                                  "& .css-1xx0ik1-MuiInputBase-root-MuiOutlinedInput-root":
                                    {
                                      padding: 0,
                                    },
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderColor: "#01448A",
                                      borderRadius: "1rem",
                                    },
                                  },
                                  "& .MuiInputLabel-root": {
                                    color: "#01448A",
                                    transform: "translate(14px, 7px) scale(1)",
                                    "&.Mui-focused, &.MuiInputLabel-shrink": {
                                      transform:
                                        "translate(14px, -8px) scale(0.75) !important",
                                    },
                                  },
                                  "& .MuiInputAdornment-root": {
                                    display: "none",
                                  },
                                  "& .MuiOutlinedInput-input": {
                                    height: ".3rem",
                                  },
                                }}
                              />
                            </LocalizationProvider>
                            <Typography>-</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <TimePicker
                                label="Break end"
                                ampm={false}
                                value={dayjs(breakItem.end, "HH:mm")}
                                onChange={(newValue) =>
                                  handleBreakTimeChange({
                                    day,
                                    index,
                                    field: "end",
                                    value: dayjs(newValue, "HH:mm")
                                      .format("HH:mm")
                                      .toString(),
                                  })
                                }
                                className="w-full sm:!w-[100px]"
                                sx={{
                                  "& .css-1xx0ik1-MuiInputBase-root-MuiOutlinedInput-root":
                                    {
                                      padding: 0,
                                    },
                                  "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                      borderColor: "#01448A",
                                      borderRadius: "1rem",
                                    },
                                  },
                                  "& .MuiInputLabel-root": {
                                    color: "#01448A",
                                    transform: "translate(14px, 7px) scale(1)",
                                    "&.Mui-focused, &.MuiInputLabel-shrink": {
                                      transform:
                                        "translate(14px, -8px) scale(0.75) !important",
                                    },
                                  },
                                  "& .MuiInputAdornment-root": {
                                    display: "none",
                                  },
                                  "& .MuiOutlinedInput-input": {
                                    height: ".3rem",
                                  },
                                }}
                              />
                            </LocalizationProvider>
                            <Button
                              startIcon={<TrashIcon />}
                              onClick={() => handleRemoveBreak(day, index)}
                              className="!h-[40px] !ml-2 !normal-case !text-[#B72F2F] !border !border-[#B72F2F] !gap-[10px] flex]"
                            >
                              <span className="hidden sm:!block">Delete</span>
                            </Button>
                          </Grid2>
                        </CSSTransition>
                      )
                    )}
                </TransitionGroup>

                <Grid2 className="w-full flex justify-end ">
                  <Button
                    disabled={formState[day]?.isNonWorking}
                    onClick={() => handleAddBreak(day)}
                    startIcon={<Add />}
                    className="!bg-[#4285CB] !text-white !normal-case flex gap-1 w-full"
                  >
                    Add break
                  </Button>
                </Grid2>
              </>
            </Grid2>
          </Grid2>
          <Divider />
        </>
      )}
    </React.Fragment>
  );
};
