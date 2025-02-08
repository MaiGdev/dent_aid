import { ArrowBack, Save } from "@mui/icons-material";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";
import "dayjs/locale/en";
import isBetween from "dayjs/plugin/isBetween";
import * as React from "react";
import { useParams } from "react-router";
import { useScheduleLogic } from "../../hooks/";
import { DaySchedule, SlotDurationSelector } from "../components";
import { DentAidLayout } from "../layout/DentAidLayout";

dayjs.extend(isBetween);
dayjs.locale("en");

export const DentistSchedule = () => {
  const { id } = useParams();
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
      console.log("Submit Schedule", form);
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
        }}
      >
        <Grid2
          container
          direction={"column"}
          spacing={3}
          sx={{
            minWidth: "522px",
            backgroundColor: "#fff",
            padding: "2.5rem",
            borderRadius: "1rem",
          }}
        >
          <Grid2 xs={12}>
            <Typography variant="h1" sx={{ fontSize: "1.875rem" }}>
              Schedule
            </Typography>
            <Typography
              sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
            >
              Information about...
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
                Back
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
      </Box>
    </DentAidLayout>
  );
};
