import React from "react";
import { Grid2, Typography, Select, MenuItem } from "@mui/material";

export const SlotDurationSelector = ({ formState, onInputChange }) => { 

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
        value={formState.slotDuration}
        onChange={(e) =>
          onInputChange({
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
}