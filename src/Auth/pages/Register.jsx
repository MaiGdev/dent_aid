import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router";
import { FormProvider } from "../../context/FormProvider";
import { PatientStepperForm } from "./components/";
import { DentistStepperForm } from "./components/DentistStepperForm";

export const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [typeUser, setTypeUser] = useState("patient");
  const [isUserSelected, setIsUserSelected] = useState(false);

  const navigate = useNavigate();
  const handleUserTypeChange = (value) => {
    setTypeUser(value);
  };

  const handleContinue = () => {
    setIsUserSelected(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!document.startViewTransition) {
      navigate("/auth/login");
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => navigate("/auth/login"));
    });
  };

  return (
    <FormProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          margin: "0 auto",
        }}
      >
        <Grid2 container sx={{ padding: "1.25rem" }}>
          <Grid2 xs={12} className="flex items-center gap-4">
            {/*  <Link to="/auth/login" style={{ textDecoration: "none" }}> */}
            <Button
              startIcon={<ArrowBack />}
              onClick={handleLogin}
              sx={{
                width: "50px",
                height: "44px",
                color: "#fff",
                backgroundColor: "#2A3E54",
                borderRadius: "4rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "& .MuiSvgIcon-root": {
                  fontSize: "1.7rem",
                },
              }}
            />
            {/*  </Link> */}
            <InputLabel sx={{ color: "#000", fontSize: "1.2em" }}>
              Sign In
            </InputLabel>
          </Grid2>
        </Grid2>
        <Divider />

        {!isUserSelected ? (
          <Grid2
            container
            direction="column"
            className="flex-1 flex items-center justify-center"
          >
            <Box sx={{ width: "558.31px" }} paddingBottom="84px">
              <InputLabel
                sx={{
                  fontSize: "1.265rem",
                  fontWeight: "500",
                  color: "#404D61",
                  position: "static",
                  textAlign: "left",
                }}
              >
                What type of user are you?
              </InputLabel>
              <Grid2>
                <Select
                  name="gender"
                  fullWidth
                  value={typeUser}
                  onChange={(e) => handleUserTypeChange(e.target.value)}
                  sx={{
                    fontSize: "0.875rem",
                    height: "2.063rem",
                    borderRadius: ".5rem",
                    color: "#5A6474",
                    border: "1px solid #cccccc",
                    marginTop: "0.5rem",
                    textAlign: "left",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                      textAlign: "left",
                    },
                  }}
                >
                  <MenuItem value="patient">Patient</MenuItem>
                  <MenuItem value="dentist">Dentist</MenuItem>
                </Select>
              </Grid2>
              <Button
                endIcon={<ArrowForward />}
                onClick={handleContinue}
                fullWidth
                sx={{
                  backgroundColor: "#01448A",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: "1.5rem",
                  marginTop: "40px",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "5px",
                  "&:hover": {
                    backgroundColor: "#4A5D72",
                  },
                }}
              >
                Continue
              </Button>
            </Box>
          </Grid2>
        ) : (
          <Grid2
            container
            direction="column"
            className="flex-1 flex items-center justify-center"
          >
            {typeUser === "dentist" ? (
              <>
                <DentistStepperForm
                  step={step}
                  setStep={setStep}
                  setIsUserSelected={setIsUserSelected}
                />
              </>
            ) : (
              <>
                <PatientStepperForm
                  step={step}
                  setStep={setStep}
                  setIsUserSelected={setIsUserSelected}
                />
              </>
            )}
          </Grid2>
        )}
      </Box>
    </FormProvider>
  );
};
