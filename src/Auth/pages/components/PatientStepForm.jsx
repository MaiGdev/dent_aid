import { motion } from "framer-motion";
import React, { useContext } from "react";

import { ArrowForward } from "@mui/icons-material";
import { Button, Grid2 } from "@mui/material";
import { FormContext } from "../../../context/FormContext";
import { FormStepAccountSetup } from "../ui/FormStepAccountSetup";
import { FormStepPersonalInformation } from "../ui/FormStepPersonalInformation";
import { FormStepHealthInformation } from "../ui/FormStepHealthInformation";
export const PatientStepForm = ({ step = 1, setStep }) => {
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const { formState, onInputChange } = useContext(FormContext);

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
      <Grid2 xs={12} md={12} lg={12} xl={12}>
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
            {step === 3 && <FormStepHealthInformation />}

            {step < 3 ? (
              <Button
                endIcon={<ArrowForward />}
                onClick={nextStep}
                fullWidth
                sx={{
                  backgroundColor: "#2A3E54",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: "1.5rem",
                  marginTop: "40px",

                  "&:hover": {
                    backgroundColor: "#4A5D72",
                  },
                }}
              >
                Continue
              </Button>
            ) : (
              <Button
                endIcon={<ArrowForward />}
                onClick={handleSubmit}
                fullWidth
                sx={{
                  backgroundColor: "#2A3E54",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: "1.5rem",
                  marginTop: "40px",

                  "&:hover": {
                    backgroundColor: "#4A5D72",
                  },
                }}
              >
                Finish
              </Button>
            )}
          </form>
        </motion.div>
      </Grid2>
    </>
  );
};
