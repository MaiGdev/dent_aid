import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Divider, Grid2, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router";
import { FormProvider } from "../../context/FormProvider";
import { PatientStepForm, StepperForm } from "./components/";

export const RegisterPage = () => {
  const [step, setStep] = useState(1);

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
        <Grid2 container className="p-5">
          <Grid2 xs={12} className="flex items-center gap-4">
            <Link
              to="/auth/login"
              style={{
                textDecoration: "none",
              }}
            >
              <Button
                startIcon={<ArrowBack />}
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
            </Link>

            <InputLabel sx={{ color: "#000", fontSize: "1.2em" }}>
              Sign In
            </InputLabel>
          </Grid2>
        </Grid2>
        <Divider />

        <Grid2
          container
          direction="column"
          className="flex-1 flex items-center justify-center"
        >
          <Grid2
            sx={{ width: "100%", paddingBottom: "50px" }}
            className=" flex items-center justify-center flex-col"
          >
            <StepperForm step={step} setStep={setStep} />
          </Grid2>
          <PatientStepForm step={step} setStep={setStep} />
        </Grid2>
      </Box>
    </FormProvider>
  );
};
