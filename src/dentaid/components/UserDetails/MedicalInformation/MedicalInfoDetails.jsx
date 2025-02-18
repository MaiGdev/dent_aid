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

export const MedicalInfoDetails = () => {
  const { updatedPatient } = useSelector((state) => state.userSlice);
  return (
    <>
      {updatedPatient && (
        <>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              Blood type
            </Typography>
            <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
              {updatedPatient?.bloodType}
            </Typography>
          </Grid2>
          <Grid2 sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              Medical conditions
            </Typography>

            {updatedPatient?.medicalConditions?.length ? (
              <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                <AccordionSummary
                  sx={{ padding: "0", color: "#00000099" }}
                  expandIcon={<ArrowDownward />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">
                    {`View medical conditions (${updatedPatient.medicalConditions.length} listed)`}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ padding: "0", color: "#00000099" }}>
                  <List sx={{ padding: "0" }}>
                    {updatedPatient?.medicalConditions.map(
                      (condition, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: "30px" }}>
                            <KeyboardDoubleArrowRight />
                          </ListItemIcon>
                          <ListItemText primary={condition.label} />
                        </ListItem>
                      )
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            ) : (
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                There's no medical condition available
              </Typography>
            )}
          </Grid2>
          <Grid2 sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              Known allergies
            </Typography>

            {updatedPatient?.knownAllergies?.length ? (
              <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                <AccordionSummary
                  sx={{ padding: "0", color: "#00000099" }}
                  expandIcon={<ArrowDownward />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography component="span">{`View known allergies (${updatedPatient.knownAllergies.length} listed)`}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: "0", color: "#00000099" }}>
                  <List sx={{ padding: "0" }}>
                    {updatedPatient?.knownAllergies?.map((allergy, index) => (
                      <ListItem key={index}>
                        <ListItemIcon sx={{ minWidth: "30px" }}>
                          <KeyboardDoubleArrowRight />
                        </ListItemIcon>
                        <ListItemText primary={allergy.label} />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ) : (
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                There's no known allergies available
              </Typography>
            )}
          </Grid2>
        </>
      )}
    </>
  );
};
