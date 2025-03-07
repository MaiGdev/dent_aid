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
import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router";
import { FormProvider } from "../../context/FormProvider";
import { PatientStepperForm } from "./components/";
import { DentistStepperForm } from "./components/DentistStepperForm";

export const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [typeUser, setTypeUser] = useState("patient");
  const [isUserSelected, setIsUserSelected] = useState(false);
  const location = useLocation();
  const [schemaType, setSchemaType] = useState("");

  const navigate = useNavigate();
  const handleUserTypeChange = (value) => {
    setTypeUser(value);
  };

  const handleContinue = () => {
    setIsUserSelected(true);
    setSchemaType(typeUser);
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

  useEffect(() => {
    if (location.search.includes(`?usertype=DENTIST_ROLE`)) {
      setTypeUser("dentist");
      handleContinue();
    }
    if (location.search.includes(`?usertype=PATIENT_ROLE`)) {
      setTypeUser("patient");
      handleContinue();
    }
  }, []);

  return (
    <FormProvider schemaType={schemaType}>
      <Box className="flex flex-col h-svh lg:h-screen">
        <Grid2 container sx={{ padding: "1.25rem" }}>
          <Grid2
            xs={12}
            className="flex items-center gap-4 justify-between w-full md:justify-start"
          >
            <Button
              startIcon={<ArrowBack className="h-[22px] lg:h-[27px]" />}
              onClick={handleLogin}
              className="flex justify-center items-center !rounded-4xl !text-white !bg-[#2A3E54] !min-w-[55px] !h-[40px] lg:!min-w-[50px] hover:!bg-[#fff] hover:!outline-2 hover:!outline-[#2A3E54] hover:!text-[#2A3E54]"
            />

            <InputLabel sx={{ color: "#000", fontSize: "1.2em" }}>
              Sign In
            </InputLabel>
          </Grid2>
        </Grid2>
        <Divider />

        {!isUserSelected ? (
          <Grid2 className="!h-full lg:h-screen w-screen flex">
            <Grid2 className="m-auto w-full px-7">
              <Box className="md:w-[558.31px] pb-[84px] m-auto">
                <InputLabel className="text-[#404D61] !text-base lg:!text-xl ">
                  What type of user are you?
                </InputLabel>
                <Grid2>
                  <Select
                    name="gender"
                    fullWidth
                    value={typeUser}
                    onChange={(e) => handleUserTypeChange(e.target.value)}
                    className="text-sm h-[2.063rem] !rounded-lg text-[#5A6474] mt-2"
                  >
                    <MenuItem value="patient">Patient</MenuItem>
                    <MenuItem value="dentist">Dentist</MenuItem>
                  </Select>
                </Grid2>
                <Button
                  endIcon={<ArrowForward />}
                  onClick={handleContinue}
                  fullWidth
                  className="!bg-[#01448A] !text-white text-sm font-semibold !rounded-3xl !mt-10 !normal-case flex items-center justify-center gap-1.5 hover:!bg-[#fff] hover:!outline-2 hover:!outline-[#01448A] hover:!text-[#01448A]"
                >
                  Continue
                </Button>
              </Box>
            </Grid2>
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
