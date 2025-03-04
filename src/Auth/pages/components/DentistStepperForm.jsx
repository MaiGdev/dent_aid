import { motion } from "framer-motion";
import React, { useContext } from "react";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Grid2 } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FormContext } from "../../../context/FormContext";

import { toastTop } from "../../../helpers/toastTop";
import {
  accountSetupSchema,
  personalInformationSchema,
  professionalInformationSchema,
} from "../../../helpers/yupSchemas";
import { useAuthStore } from "../../../hooks";
import { FormStepAccountSetup } from "../ui/FormStepAccountSetup";
import { FormStepPersonalInformation } from "../ui/FormStepPersonalInformation";
import { FormStepProfessionalInformation } from "../ui/FormStepProfessionalInformation";
export const DentistStepperForm = ({
  step = 1,
  setStep,
  setIsUserSelected,
}) => {
  const navigate = useNavigate();
  const {
    fullName,
    email,
    password,
    gender,
    identification,
    phoneNumber,
    emergencyPhoneNumber,
    address,
    dateOfBirthFormated,
    medicalLicenseNumber,
    university,
    workplace,
    yearsOfExperience,
    speciality,
    formState,
    validateForm,
  } = useContext(FormContext);
  const { startRegisterUser } = useAuthStore();
  const location = useLocation();

  const nextStep = async () => {
    if (step === 1) {
      const isValid = await validateForm(accountSetupSchema);
      if (!isValid) return toastTop();
      setStep((prevStep) => prevStep + 1);
    }
    if (step === 2) {
      const isValid = await validateForm(personalInformationSchema);
      if (!isValid) return toastTop();
      setStep((prevStep) => prevStep + 1);
    }
    if (step === 3) {
      const isValid = await validateForm(professionalInformationSchema);
      if (!isValid) return toastTop();
      handleSubmit();
    }
  };
  const prevStep = () => {
    step === 1 ? setIsUserSelected(false) : setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    const filteredSpeciality = speciality.map((x) => {
      return x.value;
    });

    let createdByAdmin = false;
    if (location.search.includes(`?usertype=`)) {
      createdByAdmin = true;
    }

    try {
      const user = await startRegisterUser({
        fullName,
        email,
        password,
        gender,
        identification,
        phoneNumber,
        emergencyPhoneNumber,
        address,
        dateOfBirth: dateOfBirthFormated,
        role: "DENTIST_ROLE",
        /* Dentist */
        medicalLicenseNumber,
        filteredSpeciality,
        university,
        workplace,
        yearsOfExperience,

        createdByAdmin,
      });

      if (user) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: "success",
          title:
            "You're all set! Dive into your dashboard and start exploring.",
        });

        if (createdByAdmin) {
          navigate("/dentaid/user-management");
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong on our side. Please try again later or contact support.",
      });
    }
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

            <Grid2 sx={{ display: "flex", gap: "1rem" }}>
              <Button
                startIcon={<ArrowBack />}
                onClick={prevStep}
                fullWidth
                sx={{
                  backgroundColor: "#fff",
                  color: "#475B6F",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: "1.5rem",
                  marginTop: "40px",
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "#4A5D72",
                    color: "#fff",
                  },
                }}
              >
                Back
              </Button>
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
                {step === 3 ? "Submit" : "Continue"}
              </Button>
            </Grid2>
          </form>
        </motion.div>
      </Grid2>
    </>
  );
};
