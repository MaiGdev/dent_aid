import { Grid2, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFormState } from "../../../store";

export const SlotDurationSelector = () => {
  const dispatch = useDispatch();

  const { formState } = useSelector((state) => state.scheduleSlice);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFormState({ name, value: value }));
  };
  return (
    <Grid2
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        gap: "8px",
      }}
    >
      <Typography
        sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
      >
        Slot duration:
      </Typography>
      <Select
        value={formState.slotDuration || 30}
        onChange={(e) =>
          handleInputChange({
            target: {
              name: "slotDuration",
              value: parseInt(e.target.value),
            },
          })
        }
        sx={{
          borderRadius: "1rem",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#01448A",
          },
        }}
      >
        <MenuItem value={30}>30 minutes</MenuItem>
        <MenuItem value={60}>60 minutes</MenuItem>
      </Select>
    </Grid2>
  );
};
