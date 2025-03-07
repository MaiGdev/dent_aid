import { Autocomplete, Grid2, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bloodTypeOptions,
  dentalMedicalConditions,
  knownAllergiesOptions,
} from "../../../../auth/pages/ui/constants";
import { compareObjects } from "../../../../helpers";
import { useForm } from "../../../../hooks";
import { onUpdatePatient } from "../../../../store";

export const MedicalInfoForm = () => {
  const {
    bloodType,
    knownAllergies,
    medicalConditions,
    onInputChange,
    formState,
    setFormState,
    onMultipleSelectChange,
  } = useForm({
    bloodType: "",
    knownAllergies: [],
    medicalConditions: [],
  });
  const dispatch = useDispatch();
  const { updatedPatient, patientUpdateErrors } = useSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    if (updatedPatient.bloodType !== "") {
      setFormState({
        bloodType: updatedPatient.bloodType || "",
        knownAllergies: updatedPatient.knownAllergies || [],
        medicalConditions: updatedPatient.medicalConditions || [],
      });
    }
  }, [updatedPatient]);

  useEffect(() => {
    if (!compareObjects(formState, updatedPatient)) {
      dispatch(onUpdatePatient(formState));
    }
  }, [formState]);

  return (
    <>
      {updatedPatient && (
        <Grid2 className="flex flex-col gap-8 sm:justify-center sm:items-center sm:flex-col sm:px-10 lg:px-5">
          <Grid2 className="flex flex-col gap-4 w-full xl:w-[500px]">
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              Blood type
            </Typography>
            <Grid2>
              <Autocomplete
                sx={{
                  marginTop: "0.5rem",
                  "& .MuiInputBase-root": {
                    borderRadius: ".5rem",
                    padding: "0 14px",
                    height: "38px !important",
                    border: `${
                      patientUpdateErrors.bloodType ? "1px solid #ff6467" : ""
                    }`,
                  },
                }}
                fullWidth
                disablePortal
                options={bloodTypeOptions}
                value={bloodType}
                onChange={(event, newValue) => {
                  onInputChange({
                    target: {
                      name: "bloodType",
                      value: newValue,
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Blood Type"
                    InputLabelProps={{
                      style: {
                        top: "-9px",
                        color: "#A2A2A2",
                      },
                    }}
                  />
                )}
              />
              {patientUpdateErrors.bloodType && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {patientUpdateErrors.bloodType}
                </motion.span>
              )}
            </Grid2>
          </Grid2>

          <Grid2 className="flex flex-col gap-4 w-full xl:w-[500px]">
            <Typography
              sx={{
                fontSize: "1.20rem",
                color: "#15192C",
                paddingBottom: ".5rem",
              }}
            >
              Medical conditions
            </Typography>
            <Autocomplete
              sx={{
                marginTop: "0.5rem",
                "& .MuiInputBase-root": {
                  borderRadius: ".5rem",
                  padding: "0 14px",
                  border: `${
                    patientUpdateErrors.medicalConditions
                      ? "1px solid #ff6467"
                      : ""
                  }`,
                },
              }}
              fullWidth
              disablePortal
              options={dentalMedicalConditions}
              value={medicalConditions}
              onChange={(event, newValue) => {
                onMultipleSelectChange({
                  target: {
                    name: "medicalConditions",
                    value: newValue,
                  },
                });
              }}
              multiple
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Medical conditions"
                  InputLabelProps={{
                    style: {
                      top: "-9px",
                      color: "#A2A2A2",
                    },
                  }}
                />
              )}
            />
            {patientUpdateErrors.medicalConditions && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {patientUpdateErrors.medicalConditions}
              </motion.span>
            )}
          </Grid2>

          <Grid2 className="flex flex-col gap-4 w-full xl:w-[500px]">
            <Typography
              sx={{
                fontSize: "1.20rem",
                color: "#15192C",
                paddingBottom: ".5rem",
              }}
            >
              Known allergies
            </Typography>
            <Autocomplete
              sx={{
                marginTop: "0.5rem",
                "& .MuiInputBase-root": {
                  borderRadius: ".5rem",
                  padding: "0 14px",
                  border: `${
                    patientUpdateErrors.knownAllergies
                      ? "1px solid #ff6467"
                      : ""
                  }`,
                },
              }}
              fullWidth
              disablePortal
              options={knownAllergiesOptions}
              value={knownAllergies}
              onChange={(event, newValue) => {
                onMultipleSelectChange({
                  target: {
                    name: "knownAllergies",
                    value: newValue,
                  },
                });
              }}
              multiple
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Known allergies"
                  InputLabelProps={{
                    style: {
                      top: "-9px",
                      color: "#A2A2A2",
                    },
                  }}
                />
              )}
            />
            {patientUpdateErrors.knownAllergies && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {patientUpdateErrors.knownAllergies}
              </motion.span>
            )}
          </Grid2>
        </Grid2>
      )}
    </>
  );
};
