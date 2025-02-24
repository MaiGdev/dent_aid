import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid2,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { formatDate } from "../../../helpers/formatDate";

export const AppointmentCard = ({ appointment }) => {
  const { user } = useSelector((state) => state.authSlice);

  return (
    <Card
      sx={{
        width: "auto",
        outline: "1px solid #00000066",
        borderRadius: "10px",
        boxShadow: "none",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px 20px",
        }}
      >
        <Typography sx={{ color: "#666666", fontSize: "14px" }}>
          {formatDate(appointment.date)}
        </Typography>
        <Grid2>
          <Typography variant="h5" component="div">
            {user.role === "ADMIN_ROLE" || user.role === "DENTIST_ROLE"
              ? `Patient:   ${appointment.patient.user.fullName}`
              : `Dentist:   ${appointment.dentist.user.fullName}`}
          </Typography>
          <Grid2 sx={{ display: "flex", gap: ".5rem" }}>
            {/*  <WatchLater /> */}🕐
            <Typography>
              {appointment.start} - {appointment.end}
            </Typography>
          </Grid2>
        </Grid2>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0 20px 20px 0",
        }}
      >
        <Button
          sx={{
            backgroundColor: "#4285CB",
            color: "white",
            fontSize: "1rem",
            fontWeight: "500",
            borderRadius: "1rem",
            textTransform: "none",
            padding: ".2rem 1rem",
            gap: "0.5rem",
            "&:hover": {
              backgroundColor: "#4A5D72",
            },
          }}
        >
          Details
        </Button>
      </CardActions>
      <Grid2
        sx={{
          width: "100%",
          height: "5px",
          backgroundColor: "#4285CB",
        }}
      />
    </Card>
  );
};
