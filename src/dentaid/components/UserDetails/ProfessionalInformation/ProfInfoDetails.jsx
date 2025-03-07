import { ArrowDownward, KeyboardDoubleArrowRight } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

export const ProfInfoDetails = () => {
  const { updatedDentist } = useSelector((state) => state.userSlice);
  return (
    <>
      {updatedDentist && (
        <Grid2 className="flex flex-col gap-8 sm:justify-center sm:items-center sm:flex-col sm:px-10 lg:px-5">
          <Grid2 className="flex gap-10 flex-col justify-between sm:flex-row w-full xl:justify-center">
            <Grid2 className="flex flex-col justify-start gap-4  xl:w-[350px]">
              <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C] ">
                Medical License
              </Typography>
              <Typography className="text-base md:!text-[1.20rem] text-[#00000099]">
                {updatedDentist.medicalLicenseNumber}
              </Typography>
            </Grid2>
            <Grid2 className="flex flex-col gap-4 sm:text-end ">
              <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C] ">
                Workplace
              </Typography>
              <Typography className="text-base md:!text-[1.20rem] text-[#00000099]">
                {updatedDentist.workplace}
              </Typography>
            </Grid2>
          </Grid2>

          <Grid2 className="flex flex-col gap-4 w-full xl:w-[500px]">
            {updatedDentist.speciality && updatedDentist.speciality.length ? (
              <>
                <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C] ">
                  Speciality
                </Typography>
                <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                  <AccordionSummary
                    sx={{ padding: "0", color: "#00000099" }}
                    expandIcon={<ArrowDownward />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">
                      {`View dentist's specialit${
                        updatedDentist.speciality.length === 1 ? "y" : "ies"
                      } (${updatedDentist.speciality.length} listed)`}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ padding: "0", color: "#00000099" }}>
                    <List sx={{ padding: "0" }}>
                      {updatedDentist.speciality.map((condition, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: "30px" }}>
                            <KeyboardDoubleArrowRight />
                          </ListItemIcon>
                          <ListItemText primary={condition.label} />
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </>
            ) : (
              <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C] ">
                There's no speciality available
              </Typography>
            )}
          </Grid2>

          <Grid2 className="flex gap-10 pb-6 flex-col justify-between sm:flex-row w-full xl:justify-center">
            <Grid2 className="flex flex-col justify-start gap-4  sm:w-[290px]">
              <Grid2 className="flex flex-col gap-4">
                <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                  University
                </Typography>
                <Typography className="text-base md:!text-[1.20rem] text-[#00000099]">
                  {updatedDentist.university}
                </Typography>
              </Grid2>
            </Grid2>
            <Grid2 className="flex flex-col gap-4 sm:text-end">
              <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C] ">
                Years of experience
              </Typography>
              <Typography className="text-base md:!text-[1.20rem] text-[#00000099]">
                {updatedDentist.yearsOfExperience}
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>
      )}
    </>
  );
};
