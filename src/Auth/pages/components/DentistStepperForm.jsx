import { motion } from "framer-motion";
import React, { useContext } from "react";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Grid2 } from "@mui/material";
import { useNavigate } from "react-router";
import { FormContext } from "../../../context/FormContext";
import { FormStepAccountSetup } from "../ui/FormStepAccountSetup";
import { FormStepPersonalInformation } from "../ui/FormStepPersonalInformation";
import { FormStepProfessionalInformation } from "../ui/FormStepProfessionalInformation";
export const DentistStepperForm = ({ step = 1, setStep, setIsUserSelected }) => {
  const navigate = useNavigate();

  const nextStep = () => {
    console.log(formState)
    step === 3
      ? navigate("/dentaid/dashboard")
      : setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    step === 1 ? setIsUserSelected(false) : setStep((prevStep) => prevStep - 1);
  };
  const { formState } = useContext(FormContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formState);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Grid2 xs={12} md={12} lg={12} xl={12} paddingBottom="84px">
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={stepVariants}
        >
          <form onSubmit={handleSubmit}>
            {step === 1 && <FormStepAccountSetup />}
            {step === 2 && <FormStepPersonalInformation />}
            {step === 3 && <FormStepProfessionalInformation />}

            <Grid2>
              <Button
                endIcon={<ArrowForward />}
                onClick={nextStep}
                fullWidth
                sx={{
                  backgroundColor: "#01448A",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: "1.5rem",
                  marginTop: "40px",
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "#4A5D72",
                  },
                }}
              >
                Continue
              </Button>
              <Button
                startIcon={<ArrowBack />}
                onClick={prevStep}
                fullWidth
                sx={{
                  backgroundColor: "#2A3E54",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: "1.5rem",
                  marginTop: "16px",
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "#4A5D72",
                  },
                }}
              >
                Back
              </Button>
            </Grid2>
          </form>
        </motion.div>
      </Grid2>
    </>
  );
};
