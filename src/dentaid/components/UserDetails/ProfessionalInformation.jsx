import { Settings } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";

export const ProfessionalInformation = ({ userData, boxWidth }) => {
  const { speciality, workplace, university, yearsOfExperience } = userData;
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
          Profesional information
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
                Speciality
              </Typography>
              {speciality.length ? (
                <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                  {speciality}
                </Typography>
              ) : (
                <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                  There's no speciality available
                </Typography>
              )}
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
                {workplace}
              </Typography>
            </Grid2>
          </Grid2>
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
                University
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {university}
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
                Years of experience
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {yearsOfExperience}
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
      </Grid2>
    </Box>
  );
};
