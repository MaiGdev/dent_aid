import { Alert, Box, Grid2, Pagination, Typography } from "@mui/material";
import React, { useState } from "react";
import { AppointmentCard } from "./AppointmentCard";

export const AppointmentList = ({ filteredAppointments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 2;

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        gap: "22px",
      }}
    >
      {currentAppointments && currentAppointments.length > 0 ? (
        currentAppointments.map((appointment, index) => (
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
        <Pagination
          count={Math.ceil(filteredAppointments.length / appointmentsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
        />
      </Grid2>
    </Box>
  );
};
