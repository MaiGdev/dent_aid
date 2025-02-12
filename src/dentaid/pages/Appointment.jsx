import { ArrowBack, CheckBoxOutlined, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid2,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en";
import { motion } from "framer-motion";
import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { DentAidLayout } from "../layout/DentAidLayout";

export const Appointment = () => {
  const theme = useTheme();
  const navigator = useNavigate();
  /*   const [userType, setUserType] = useState("DENTIST_ROLE"); */

  const handleUserTypeChange = ({ target }) => {
    const { value } = target;
    setUserType(value);
    console.log(value);
  };

  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(index); // Actualiza el botón seleccionado
  };

  return (
    <DentAidLayout>
      <Box
        sx={{
          minHeight: "100%",
          borderRadius: "3rem",
          display: "flex",
          justifyContent: "center",
          /*         flexDirection:"column", */
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
            backgroundColor: "#fff",
            padding: "2.5rem",
            borderRadius: "1rem",
          }}
        >
          <Paper sx={{ outline: "1px solid #cccccc", borderRadius: "1rem" }}>
            <Grid2
              sx={{
                width: "100%",
                backgroundColor: "#333333",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
                padding: "4px 14px",

                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => {
                  navigator(`/dentaid/appointments`);
                }}
                startIcon={<ArrowBack />}
                sx={{
                  color: "#fff",
                  minWidth: 0,
                  padding: "0 5px",
                  gap: "5px",
                  width: "fit-content",
                  height: "fit-content",
                  textTransform: "none",
                  outline: "0 solid transparent",
                  transition:
                    "outline 0.15s ease-in-out, background-color 0.3s ease-in-out",
                  "&:hover": {
                    color: "#fff",
                    outline: "1.5px solid #fff",
                    backgroundColor: "#01448A",
                  },
                }}
              >
                Back
              </Button>
            </Grid2>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                padding: "3rem",
              }}
            >
              <Grid2 xs={12}>
                <Typography variant="h1" sx={{ fontSize: "1.875rem" }}>
                  New appointment
                </Typography>
              </Grid2>
              <Grid2
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography
                  sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
                >
                  Select a dentist to see his available schechule
                </Typography>
                <FormControl>
                  <InputLabel
                    id="userType-label"
                    sx={{
                      transform: "translate(14px, 5px) scale(1)",
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                    }}
                  >
                    Dentist
                  </InputLabel>
                  <Select
                    labelId="userType-label"
                    id="userType"
                    label="User type"
                    name="userType"
                    defaultValue={1}
                    sx={{
                      fontSize: "0.875rem",
                      height: "2.063rem",
                      borderRadius: ".4rem",
                      color: "#5A6474",
                      textAlign: "left",
                    }}
                  >
                    <MenuItem value="1">Dr. Smith</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography
                  sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
                >
                  Select a patient
                </Typography>
                <FormControl>
                  <InputLabel
                    id="userType-label"
                    sx={{
                      transform: "translate(14px, 5px) scale(1)",
                      "&.Mui-focused, &.MuiInputLabel-shrink": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                    }}
                  >
                    Patient
                  </InputLabel>
                  <Select
                    labelId="userType-label"
                    id="userType"
                    /*     value={userType} */
                    label="User type"
                    /*                   onChange={handleUserTypeChange} */
                    name="userType"
                    defaultValue={1}
                    sx={{
                      fontSize: "0.875rem",
                      height: "2.063rem",
                      borderRadius: ".4rem",
                      color: "#5A6474",
                      textAlign: "left",
                    }}
                  >
                    <MenuItem value="1">John Doe </MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Paper
                  sx={{ border: "1px solid #92959E", borderRadius: "1rem" }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                  </LocalizationProvider>
                </Paper>
                <Box sx={{ overflowY: "auto", maxHeight: "350px" }}>
                  <List
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                      padding: "0 1.6rem 0 1rem",
                    }}
                  >
                    {Array.from({ length: 20 }).map((_, index) => (
                      <ListItem key={index} disablePadding>
                        <motion.div
                          initial={{ width: 138 }}
                          animate={{
                            width: selectedIndex === index ? 162 : 162,
                          }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <ListItemButton
                            onClick={() => handleSelect(index)}
                            sx={{
                              backgroundColor:
                                selectedIndex === index ? "#0B6911" : "#fff",
                              color:
                                selectedIndex === index ? "#fff" : "#4285CB",
                              border: `2px solid ${
                                selectedIndex === index ? "#0B6911" : "#4285CB"
                              }`,
                              fontSize: "0.875rem",
                              fontWeight: "600",
                              borderRadius: "1rem",
                              textTransform: "none",
                              display: "flex",
                              alignItems: "center",
                              padding: ".2rem 1.7rem",
                              transition: "all 0.3s",
                              textAlign: "center",
                              "&:hover": {
                                backgroundColor: "#4285CB",
                                color: "#fff",
                              },
                            }}
                          >
                            <ListItemText primary={`10:${index + 1}`} />
                            {selectedIndex === index && (
                              <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                              >
                                <CheckBoxOutlined />
                              </motion.span>
                            )}
                          </ListItemButton>
                        </motion.div>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Box>
              <Grid2 sx={{ display: "flex", gap: "1rem" }}>
                <Button
                  startIcon={<ArrowBack />}
                  onClick={() => {
                    navigator(`/dentaid/appointments`);
                  }}
                  fullWidth
                  sx={{
                    backgroundColor: "#fff",
                    color: "#475B6F",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    borderRadius: "1.5rem",
                    marginTop: "40px",
                    gap: "0.3rem",
                    textTransform: "none",
                    "&:hover": {
                      color: "#475B6F",
                      boxShadow: "0 0 0 2px #475B6F",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  Cancel
                </Button>

                <Button
                  endIcon={<Save />}
                  fullWidth
                  sx={{
                    backgroundColor: "#01448A",
                    color: "white",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    borderRadius: "1.5rem",
                    marginTop: "40px",
                    gap: "0.3rem",
                    textTransform: "none",

                    "&:hover": {
                      backgroundColor: "white",
                      color: "#01448A",
                      boxShadow: "0 0 0 2px #01448A",
                    },
                  }}
                >
                  Save
                </Button>
              </Grid2>
            </Box>
          </Paper>
        </Grid2>
      </Box>
    </DentAidLayout>
  );
};
