import { Alert, Box, Grid2, Pagination, Typography } from "@mui/material";
import { AppointmentCard } from "./AppointmentCard";

export const AppointmentList = ({ filteredAppointments }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: "22px",
      }}
    >
      {filteredAppointments && filteredAppointments.length > 0 ? (
        filteredAppointments.map((appointment, index) => (
          <AppointmentCard key={index} appointment={appointment} />
        ))
      ) : (
        <Alert severity="warning">
          <Typography>No appointments found.</Typography>
        </Alert>
      )}
      <Grid2
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          width: "100%",
          paddingTop: "1rem",
        }}
      >
        <Pagination count={10} variant="outlined" shape="rounded" />
      </Grid2>
    </Box>
  );
};
