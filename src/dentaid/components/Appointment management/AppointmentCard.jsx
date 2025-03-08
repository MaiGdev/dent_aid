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
    <Card className="w-auto outline outline-[#00000066] !rounded-[10px] shadow-none">
      <CardContent className="flex flex-col !gap-2.5 !p-5">
        <Typography className="text-[#666666] !text-[14px]">
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
      <CardActions className="flex justify-end  !pr-5 !pb-5">
        <Button className="!bg-[#4285CB] !text-white !text-[1rem] !rounded-3xl !normal-case !px-4 !py-1 gap-2 hover:!bg-white hover:!text-[#4285CB] !border-2 !border-[#4285CB]">
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
