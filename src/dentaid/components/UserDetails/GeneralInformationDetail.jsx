import { Grid2, Typography } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { formatDate } from "../../../helpers/formatDate";

export const GeneralInformationDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const boxDetailsRef = useRef(null);
  const [boxDetailsWidth, setBoxDetailsWidth] = useState(0);
  const { updatedUser } = useSelector((state) => state.userSlice);

  useLayoutEffect(() => {
    if (boxDetailsRef.current) {
      setBoxDetailsWidth(boxDetailsRef.current.offsetWidth);
    }
  }, [updatedUser]);

  return (
    <>
      <Grid2
        ref={boxDetailsRef}
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
              {updatedUser.email}
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
              {formatDate(updatedUser.dateOfBirth)}
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
              {updatedUser.phoneNumber}
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
              {updatedUser.identification}
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
              {updatedUser.gender}
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
              Emergency phone number
            </Typography>
            <Typography sx={{ fontSize: "1.20rem", color: "#00000099" }}>
              {updatedUser.emergencyPhoneNumber}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
      <Grid2
        sx={{
          width: `${boxDetailsWidth}px`,
        }}
      >
        <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
          Address
        </Typography>
        <Typography
          sx={{
            fontSize: "1.20rem",
            color: "#00000099",
            width: `${boxDetailsWidth}px`,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            paddingTop: "15px",
          }}
        >
          {updatedUser.address}
        </Typography>
      </Grid2>
    </>
  );
};
