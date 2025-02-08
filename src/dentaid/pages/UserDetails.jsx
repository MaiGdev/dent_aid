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
  CircularProgress,
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks";
import { DentAidLayout } from "../layout/DentAidLayout";

export const UserDetails = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const userType = searchParams.get("usertype");
  const boxRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const { startGetUser } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await startGetUser({ id, userType });
        const dateOfBirthFormat = new Date(data.user.dateOfBirth).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        );
        setUserData({
          ...data,
          dateOfBirthFormat,
        });
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        Swal.fire(
          "Error",
          "No se pudo cargar la información del usuario",
          "error"
        );
      }

      console.log(location.pathname);
    };

    if (id && userType) fetchUser();
  }, [id, userType]);

  useLayoutEffect(() => {
    if (userData && boxRef.current) {
      setBoxWidth(boxRef.current.offsetWidth);
    }
  }, [userData]);

  return (
    <DentAidLayout>
      {userData !== null ? (
        <Box
          sx={{
            backgroundColor: "#fff",
            minHeight: "100%",
            borderRadius: "3rem",
            padding: "2.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "3.125rem",
          }}
        >
          <Grid2
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Grid2>
              <Typography sx={{ fontSize: "1.875rem", color: "#15192C" }}>
                {userData.user.fullName}
              </Typography>
              <Typography sx={{ fontSize: "1rem", color: "#92959E" }}>
                General Dentistry
              </Typography>
            </Grid2>
            {userType === "DENTIST_ROLE" && (
              <Grid2>
                <Button
                  onClick={() => {
                    navigate(`/dentaid/user/${id}/schedule`);
                  }}
                  sx={{
                    backgroundColor: "#01448A",
                    color: "white",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    borderRadius: ".5rem",
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    "&:hover": {
                      backgroundColor: "#4A5D72",
                    },
                  }}
                  endIcon={<Settings />}
                >
                  Schedule
                </Button>
              </Grid2>
            )}
          </Grid2>

          <Grid2
            sx={{
              padding: "0 30px",
              gap: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
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
                    <Typography
                      sx={{ fontSize: "1.20rem", color: "#00000099" }}
                    >
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
                    <Typography
                      sx={{ fontSize: "1.20rem", color: "#00000099" }}
                    >
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
                    <Typography
                      sx={{ fontSize: "1.20rem", color: "#00000099" }}
                    >
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
                    <Typography
                      sx={{ fontSize: "1.20rem", color: "#00000099" }}
                    >
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
                    <Typography
                      sx={{ fontSize: "1.20rem", color: "#00000099" }}
                    >
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
                    <Typography
                      sx={{ fontSize: "1.20rem", color: "#00000099" }}
                    >
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
                  {/* 742 Evergreen Terrace, Springfield, USA
                  adsjfashf.kajhsfjkasghfklajsgjhsfgajlsgfhhalfgssahflgsalslkfghasklfjhsahfkglaalskfghsahflgaslfkhglskfhgalsfgh */}
                </Typography>
              </Grid2>
            </Box>
            {userType !== "ADMIN_ROLE" && <Divider />}

            {userType === "DENTIST_ROLE" && (
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
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#15192C" }}
                        >
                          Speciality
                        </Typography>
                        {userData.speciality.length ? (
                          <Typography
                            sx={{ fontSize: "1.20rem", color: "#00000099" }}
                          >
                            {userData.speciality}
                          </Typography>
                        ) : (
                          <Typography
                            sx={{ fontSize: "1.20rem", color: "#00000099" }}
                          >
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
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#15192C" }}
                        >
                          Workplace
                        </Typography>
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#00000099" }}
                        >
                          {userData.workplace}
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
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#15192C" }}
                        >
                          University
                        </Typography>
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#00000099" }}
                        >
                          {userData.university}
                        </Typography>
                      </Grid2>
                      <Grid2
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "15px",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#15192C" }}
                        >
                          Years of experience
                        </Typography>
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#00000099" }}
                        >
                          {userData.yearsOfExperience}
                        </Typography>
                      </Grid2>
                    </Grid2>
                  </Box>
                </Grid2>
              </Box>
            )}

            {userType === "PATIENT_ROLE" && (
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
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#15192C" }}
                        >
                          Blood type
                        </Typography>
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#00000099" }}
                        >
                          {userData.bloodType}
                        </Typography>
                      </Grid2>
                      <Grid2 sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#15192C" }}
                        >
                          Medical conditions
                        </Typography>

                        {userData.medicalConditions.length ? (
                          <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                            <AccordionSummary
                              sx={{ padding: "0", color: "#00000099" }}
                              expandIcon={<ArrowDownward />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography component="span">
                                {`View medical conditions (${userData.medicalConditions.length} listed)`}
                              </Typography>
                            </AccordionSummary>

                            <AccordionDetails
                              sx={{ padding: "0", color: "#00000099" }}
                            >
                              <List sx={{ padding: "0" }}>
                                {userData.medicalConditions.map((condition) => (
                                  <ListItem>
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
                          <Typography
                            sx={{ fontSize: "1.20rem", color: "#00000099" }}
                          >
                            There's no medical condition available
                          </Typography>
                        )}
                      </Grid2>
                      <Grid2 sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{ fontSize: "1.20rem", color: "#15192C" }}
                        >
                          Known allergies
                        </Typography>

                        {userData.knownAllergies.length ? (
                          <Accordion sx={{ boxShadow: "none", width: "100%" }}>
                            <AccordionSummary
                              sx={{ padding: "0", color: "#00000099" }}
                              expandIcon={<ArrowDownward />}
                              aria-controls="panel1-content"
                              id="panel1-header"
                            >
                              <Typography component="span">{`View known allergies (${userData.knownAllergies.length} listed)`}</Typography>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{ padding: "0", color: "#00000099" }}
                            >
                              <List sx={{ padding: "0" }}>
                                <ListItem>
                                  <ListItemIcon sx={{ minWidth: "30px" }}>
                                    <KeyboardDoubleArrowRight />
                                  </ListItemIcon>
                                  <ListItemText primary="Tree Nuts" />
                                </ListItem>
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        ) : (
                          <Typography
                            sx={{ fontSize: "1.20rem", color: "#00000099" }}
                          >
                            There's no known allergies available
                          </Typography>
                        )}
                      </Grid2>
                    </Grid2>
                  </Box>
                </Grid2>
              </Box>
            )}
          </Grid2>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
              backgroundColor: "#fff",
            }}
          >
            <CircularProgress size="100px" />
          </Box>
        </>
      )}
    </DentAidLayout>
  );
};
