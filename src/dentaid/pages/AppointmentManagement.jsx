import { EventNote, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en";
import * as React from "react";
import { useNavigate } from "react-router";
import { DentAidLayout } from "../layout/DentAidLayout";

export const AppointmentManagement = () => {
  const theme = useTheme();
  const navigator = useNavigate();
  /*   const [userType, setUserType] = useState("DENTIST_ROLE"); */

  const handleUserTypeChange = ({ target }) => {
    const { value } = target;
    setUserType(value);
    console.log(value);
  };

  return (
    <DentAidLayout>
      <Box
        sx={{
          minHeight: "100%",
          borderRadius: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          border: "1px solid #cccccc",
        }}
      >
        <Grid2
          container
          direction={"column"}
          spacing={3}
          sx={{
            /*   width: "75%", */
            backgroundColor: "#fff",
            padding: "2.5rem",
            borderRadius: "1rem",
          }}
        >
          <Grid2 xs={12}>
            <Typography variant="h1" sx={{ fontSize: "1.875rem" }}>
              Appointment management
            </Typography>
            <Typography
              sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
            >
              Information about...
            </Typography>
          </Grid2>

          <Grid2
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "clamp(0px,2vw,100px)",
            }}
          >
            <Grid2
              sx={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FormControl sx={{ width: "205px" }}>
                <InputLabel
                  id="user-select-label"     sx={{
                    transform: "translate(14px, 5px) scale(1)",
                    "&.Mui-focused, &.MuiInputLabel-shrink": {
                      transform: "translate(12px, -9px) scale(0.75)",
                    },
                  }}
                >
                  User
                </InputLabel>
                <Select
                  labelId="user-select-label"
                  id="demo-simple-select"
                  /*    value={age} */

                  sx={{
                    fontSize: "0.875rem",
                    height: "2.063rem",
                    borderRadius: ".4rem",
                    color: "#5A6474",
                    textAlign: "left",
                  }}
                  label="Age"
                  /*     defaultValue={1} */
                >
                  <MenuItem value="1">Maikel...</MenuItem>
                </Select>
              </FormControl>

              <TextField
                id="input-with-icon-textfield"
                placeholder="Category"
                sx={{
                  fontSize: "0.875rem",
                  height: "2.063rem",
                  color: "#5A6474",
                  textAlign: "left",
                  "& .MuiInputBase-root": {
                    borderRadius: ".4rem",
                    height: "100%",
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: "0.875rem",
                      height: "2.063rem",
                      borderRadius: ".5rem",
                      textAlign: "left",
                    },
                    "& .MuiInputLabel-root": {
                      transform: "translate(14px, 5px) scale(1)",
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        transform:
                          "translate(10px, -8px) scale(0.75) !important",
                      },
                    },
                  }}
                  label="Appointment date"
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2>
              <Button
                onClick={() => {
                  navigator("/dentaid/appointments/847623985");
                }}
                startIcon={<EventNote />}
                sx={{
                  backgroundColor: "#01448A",
                  color: "white",
                  fontSize: "clamp(0.75rem, 2.5vw, 0.875rem)",
                  fontWeight: "600",
                  borderRadius: ".5rem",
                  textTransform: "none",
                  gap: "0.5rem",
                  "&:hover": {
                    backgroundColor: "#4A5D72",
                  },
                }}
              >
                New appointment
              </Button>
            </Grid2>
          </Grid2>

          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "22px",
              [theme.breakpoints.down("md")]: {
                justifyContent: "center",
                alignContent: "center",
              },
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <Card
                sx={{
                  maxWidth: 254,
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
                    January 12, 1992
                  </Typography>
                  <Grid2>
                    <Typography variant="h5" component="div">
                      Implant Dentistry
                    </Typography>
                    <Typography
                      sx={{
                        color: "#666666",
                        fontSize: "14px",
                      }}
                    >
                      John Doe with Dr. Smith
                    </Typography>
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
            ))}
            <Grid2
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "end",
                width: "100%",
                paddingTop: "1rem",
              }}
            >
              <Pagination count={10} variant="outlined" shape="rounded" />
            </Grid2>
          </Box>
        </Grid2>
      </Box>
    </DentAidLayout>
  );
};
