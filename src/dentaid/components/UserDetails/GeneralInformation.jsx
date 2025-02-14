import { Settings } from "@mui/icons-material";
import { Box, Button, Grid2, Typography } from "@mui/material";

export const GeneralInformation = ({ userData, boxWidth, boxRef }) => {
  return (
    <>
      <Grid2
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.25rem", color: "#15192C" }}>
          General information
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          gap: "35px",
        }}
      >
        <Grid2
          ref={boxRef}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "90px",
          }}
        >
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "35px",
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
                Email
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {userData.user.email}
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
                Date of birth
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {userData.dateOfBirthFormat}
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
                Phone number
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {userData.user.phoneNumber}
              </Typography>
            </Grid2>
          </Grid2>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: "35px",
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
                Identification
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {userData.user.identification}
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
                Gender
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {userData.user.gender}
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
                Emergency number
              </Typography>
              <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
                {userData.user.emergencyPhoneNumber}
              </Typography>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2
          sx={{
            width: `${boxWidth}px`,
          }}
        >
          <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
            Address
          </Typography>
          <Typography
            sx={{
              fontSize: "1.20rem",
              color: "#00000099",
              width: `${boxWidth}px`,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingTop: "15px",
            }}
          >
            {userData.user.address}
          </Typography>
        </Grid2>
      </Box>
    </>
  );
};
