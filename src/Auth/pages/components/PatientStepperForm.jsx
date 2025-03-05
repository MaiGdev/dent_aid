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
  healthInformationSchema,
  personalInformationSchema,
} from "../../../helpers/yupSchemas";
import { useAuthStore } from "../../../hooks";
import { FormStepAccountSetup } from "../ui/FormStepAccountSetup";
import { FormStepHealthInformation } from "../ui/FormStepHealthInformation";
import { FormStepPersonalInformation } from "../ui/FormStepPersonalInformation";
export const PatientStepperForm = ({
  step = 1,
  setStep,
  setIsUserSelected,
}) => {
  const navigate = useNavigate();

  const { startRegisterUser } = useAuthStore();

  const {
    fullName,
    email,
    password,
    identification,
    phoneNumber,
    emergencyPhoneNumber,
    address,
    dateOfBirthFormated,
    /* Patient */
    bloodType,
    gender,
    knownAllergies,
    medicalConditions,
    validateForm,
  } = useContext(FormContext);

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
      const isValid = await validateForm(healthInformationSchema);
      if (!isValid) return toastTop();
      handleSubmit();
    }
  };

  const prevStep = () => {
    step === 1 ? setIsUserSelected(false) : setStep((prevStep) => prevStep - 1);
  };
  const { formState } = useContext(FormContext);

  const handleSubmit = async () => {
    console.log("Formulario enviado:", formState);

    const filteredKnownAllergies = knownAllergies.map((x) => {
      return x.value;
    });
    const filteredMedicalConditions = medicalConditions.map((x) => {
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
        role: "PATIENT_ROLE",
        bloodType,
        filteredKnownAllergies,
        filteredMedicalConditions,

        createdByAdmin,
      });
      /*    const user = null; */

      if (user) {
        if (createdByAdmin) {
          navigate("/dentaid/user-management");
        }
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
      }
    } catch (error) {}
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <Grid2 paddingBottom="84px" className="w-full">
        <motion.div
          key={step}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={stepVariants}
        >
          <form
            onSubmit={handleSubmit}
            className="md:w-[558.31px] px-7 m-auto md:px-0"
          >
            {step === 1 && <FormStepAccountSetup />}
            {step === 2 && <FormStepPersonalInformation />}
            {step === 3 && <FormStepHealthInformation />}

            <Grid2 className="flex gap-4 ">
              <Button
                startIcon={<ArrowBack />}
                onClick={prevStep}
                fullWidth
                className="!border-2 !border-[#fff] !text-[#475B6F] text-sm font-semibold !rounded-3xl !mt-10 !normal-case flex items-center justify-center gap-1.5 hover:!bg-[#fff] hover:!border-[#475B6F] hover:!text-[#475B6F] transition-all duration-1000"
              >
                Back
              </Button>
              <Button
                endIcon={<ArrowForward />}
                onClick={nextStep}
                fullWidth
                className="!bg-[#01448A] !text-white text-sm font-semibold !rounded-3xl !mt-10 !normal-case flex items-center justify-center gap-1.5 hover:!bg-[#fff] hover:!outline-2 hover:!outline-[#01448A] hover:!text-[#01448A]"
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
