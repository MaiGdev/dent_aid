import {
  ArrowDownward,
  KeyboardDoubleArrowRight,
  Settings,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export const MedicalInformation = ({ userData, boxWidth }) => {
  // Desestructura las propiedades que necesitas
  const { bloodType, medicalConditions, knownAllergies } = userData;

  return (
    <Box>
      <Grid2
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.25rem", color: "#15192C" }}>
          Medical information
        </Typography>
        <Button
          sx={{
            backgroundColor: "#fff",
            color: "#01448A",
            border: "2px solid #01448A",
            fontSize: "0.875rem",
            fontWeight: "600",
            borderRadius: ".5rem",
            textTransform: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            "&:hover": {
              backgroundColor: "#01448A",
              color: "#fff",
            },
            transition: "all 0.3s",
          }}
          endIcon={<Settings />}
        >
          Edit
        </Button>
      </Grid2>
      <Grid2
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "35px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "90px",
            width: `${boxWidth}px`,
          }}
        >
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "35px",
              width: "100%",
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
                Blood type
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {bloodType}
              </Typography>
            </Grid2>
            <Grid2 sx={{ display: "flex", flexDirection: "column" }}>
              <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
                Medical conditions
              </Typography>

              {medicalConditions.length ? (
                <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                  <AccordionSummary
                    sx={{ padding: "0", color: "#00000099" }}
                    expandIcon={<ArrowDownward />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">
                      {`View medical conditions (${medicalConditions.length} listed)`}
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails sx={{ padding: "0", color: "#00000099" }}>
                    <List sx={{ padding: "0" }}>
                      {medicalConditions.map((condition, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: "30px" }}>
                            <KeyboardDoubleArrowRight />
                          </ListItemIcon>
                          <ListItemText primary={condition} />
                        </ListItem>
                      ))}
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

              {knownAllergies.length ? (
                <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                  <AccordionSummary
                    sx={{ padding: "0", color: "#00000099" }}
                    expandIcon={<ArrowDownward />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography component="span">{`View known allergies (${knownAllergies.length} listed)`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ padding: "0", color: "#00000099" }}>
                    <List sx={{ padding: "0" }}>
                      {knownAllergies.map((allergy, index) => (
                        <ListItem key={index}>
                          <ListItemIcon sx={{ minWidth: "30px" }}>
                            <KeyboardDoubleArrowRight />
                          </ListItemIcon>
                          <ListItemText primary={allergy} />
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
          </Grid2>
        </Box>
      </Grid2>
    </Box>
  );
};
