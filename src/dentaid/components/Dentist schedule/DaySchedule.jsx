import { Add } from "@mui/icons-material";
import { Button, Checkbox, Divider, Grid2, Typography } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const DaySchedule = ({
  day,
  formState,
  onInputChange,
  addBreak,
  removeBreak,
  onBreakTimeChange,
}) => {
  return (
    <React.Fragment key={day}>
      <Grid2 sx={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            gap: "15px",
          }}
        >
          <Grid2 sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Checkbox
              checked={formState[day]?.isNonWorking || false}
              onChange={(e) =>
                onInputChange({
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
          <Grid2
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              width: "165px",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                label="Start"
                ampm={false}
                value={formState[day]?.start}
                onChange={(value) => {
                  onInputChange({
                    target: {
                      name: `${day}.start`,
                      value: value,
                    },
                  });
                }}
                disabled={formState[day]?.isNonWorking}
                sx={{
                  "& .css-1xx0ik1-MuiInputBase-root-MuiOutlinedInput-root": {
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
                      transform: "translate(14px, -8px) scale(0.75) !important",
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
                value={formState[day]?.end}
                onChange={(value) => {
                  onInputChange({
                    target: {
                      name: `${day}.end`,
                      value: value,
                    },
                  });
                }}
                disabled={formState[day]?.isNonWorking}
                sx={{
                  "& .css-1xx0ik1-MuiInputBase-root-MuiOutlinedInput-root": {
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
                      transform: "translate(14px, -8px) scale(0.75) !important",
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
        <Grid2 container direction="column" gap={1}>
          <>
            <Divider orientation="vertical" sx={{ marginRight: ".5rem" }} />
            <TransitionGroup>
              {formState[day]?.breaks?.map((breakItem, index) => (
                <CSSTransition
                  key={index}
                  timeout={100}
                  classNames="break-transition"
                  unmountOnExit
                >
                  <Grid2
                    key={index}
                    container
                    gap={1}
                    alignItems="center"
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
                        value={breakItem.start}
                        onChange={(value) =>
                          onBreakTimeChange(day, index, "start", value)
                        }
                        sx={{
                          width: "100px",
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
                        value={breakItem.end}
                        onChange={(value) =>
                          onBreakTimeChange(day, index, "end", value)
                        }
                        sx={{
                          width: "100px",
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
                      startIcon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="17"
                          height="17"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fill="#B72F2F"
                            d="M7.498 16.115c.28 0 .549-.1.747-.278a.905.905 0 0 0 .309-.672v-5.7a.904.904 0 0 0-.31-.672 1.118 1.118 0 0 0-.746-.278c-.28 0-.548.1-.746.278a.905.905 0 0 0-.31.672v5.7c0 .252.112.494.31.672.198.178.466.278.746.278Zm10.556-11.4h-4.222v-.95c0-.756-.334-1.48-.928-2.015a3.354 3.354 0 0 0-2.24-.835h-2.11c-.84 0-1.645.3-2.24.835-.593.534-.927 1.26-.927 2.015v.95H1.165c-.28 0-.549.1-.746.278a.904.904 0 0 0-.31.672c0 .252.112.494.31.672.197.178.466.278.746.278H2.22v10.45c0 .756.334 1.48.928 2.015.594.535 1.4.835 2.24.835h8.444c.84 0 1.645-.3 2.239-.835.594-.534.927-1.26.927-2.015V6.615h1.056c.28 0 .548-.1.746-.278a.904.904 0 0 0 .31-.672.904.904 0 0 0-.31-.672 1.118 1.118 0 0 0-.746-.278Zm-10.556-.95c0-.252.111-.494.31-.672.197-.178.466-.278.746-.278h2.11c.28 0 .55.1.747.278.198.178.31.42.31.672v.95H7.497v-.95Zm7.39 13.3a.905.905 0 0 1-.31.672 1.118 1.118 0 0 1-.746.278H5.387c-.28 0-.548-.1-.746-.278a.905.905 0 0 1-.31-.672V6.615h10.556v10.45Zm-3.168-.95c.28 0 .549-.1.747-.278a.905.905 0 0 0 .309-.672v-5.7a.905.905 0 0 0-.31-.672 1.118 1.118 0 0 0-.745-.278c-.28 0-.549.1-.747.278a.904.904 0 0 0-.31.672v5.7c0 .252.112.494.31.672.198.178.466.278.746.278Z"
                          />
                        </svg>
                      }
                      onClick={() => removeBreak(day, index)}
                      sx={{
                        height: "40px",
                        ml: 1,
                        textTransform: "none",
                        color: "#B72F2F",
                        border: "1px solid #B72F2F",
                        gap: "15px",
                      }}
                    >
                      Delete
                    </Button>
                  </Grid2>
                </CSSTransition>
              ))}
            </TransitionGroup>

            <Grid2
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
              }}
            >
              <Button
                disabled={formState[day]?.isNonWorking}
                onClick={() => addBreak(day)}
                startIcon={<Add></Add>}
                sx={{
                  backgroundColor: "#4285CB",
                  color: "white",
                  textTransform: "none",
                  gap: "8px",
                  width: "100%",
                }}
              >
                Add break
              </Button>
            </Grid2>
          </>
        </Grid2>
      </Grid2>
      <Divider />
    </React.Fragment>
  );
};
