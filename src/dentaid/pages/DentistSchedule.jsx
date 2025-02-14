import { ArrowBack, Save } from "@mui/icons-material";
import { Box, Button, Divider, Grid2, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import isBetween from "dayjs/plugin/isBetween";
import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { useScheduleLogic } from "../../hooks/";
import { DaySchedule, SlotDurationSelector } from "../components";
import { DentAidLayout } from "../layout/DentAidLayout";
import Swal from "sweetalert2";

dayjs.extend(isBetween);
dayjs.locale("en");

export const DentistSchedule = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    formState,
    onInputChange,
    days,
    addBreak,
    removeBreak,
    onBreakTimeChange,
    submitSchedule,
  } = useScheduleLogic({ idDentist: id });

  const handleSubmit = async () => {
    try {
      const form = await submitSchedule();
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
            </Grid2>

            {days.map((day) => (
              <DaySchedule
                key={day}
                day={day}
                formState={formState}
                onInputChange={onInputChange}
                addBreak={addBreak}
                removeBreak={removeBreak}
                onBreakTimeChange={onBreakTimeChange}
              />
            ))}

            <Grid2
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <SlotDurationSelector
                formState={formState}
                onInputChange={onInputChange}
              />

              <Divider orientation="horizontal" />

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
                <Button
                  onClick={handleSubmit}
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
              </Grid2>
            </Grid2>
          </Grid2>
        </Paper>
      </Box>
    </DentAidLayout>
  );
};
