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
        <Grid2
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "35px",
            width: "490px",
          }}
        >
          <Grid2
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid2
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                Medical License
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {updatedDentist.medicalLicenseNumber}
              </Typography>
            </Grid2>
            <Grid2
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                Workplace
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {updatedDentist.workplace}
              </Typography>
            </Grid2>
          </Grid2>

          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {updatedDentist.speciality && updatedDentist.speciality.length ? (
              <>
                <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
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
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                There's no speciality available
              </Typography>
            )}
          </Grid2>

          <Grid2
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid2
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                gap: "35px",
                width: "300px",
              }}
            >
              <Grid2
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                  University
                </Typography>
                <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                  {updatedDentist.university}
                </Typography>
              </Grid2>
            </Grid2>

            <Grid2
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                Years of experience
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {updatedDentist.yearsOfExperience}
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>
      )}
    </>
  );
};
