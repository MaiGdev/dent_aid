import { Autocomplete, Grid2, TextField, Typography } from "@mui/material";
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
  const { updatedPatient } = useSelector((state) => state.userSlice);

  useEffect(() => {
    if (updatedPatient) {
      setFormState({
        bloodType: updatedPatient.bloodType || [],
        knownAllergies: updatedPatient.knownAllergies || [],
        medicalConditions: updatedPatient.medicalConditions || [],
      });
    }
  }, [updatedPatient]);

  useEffect(() => {
    const isFormStateEmpty = Object.values(formState).some(
      (value) => value === "" || (Array.isArray(value) && value.length === 0)
    );
    if (isFormStateEmpty) return;

    if (!compareObjects(formState, updatedPatient)) {
      dispatch(onUpdatePatient(formState));
    }
  }, [updatedPatient, formState]);

  return (
    <>
      {updatedPatient && (
        <Grid2
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "35px",
          }}
        >
          <Grid2
            size={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              Blood type
            </Typography>
            <Grid2 size={12}>
              <Autocomplete
                sx={{
                  marginTop: "0.5rem",
                  "& .MuiInputBase-root": {
                    borderRadius: ".5rem",
                    padding: "0 14px",
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
            </Grid2>
          </Grid2>

          <Grid2 size={12}>
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
          </Grid2>

          <Grid2 size={12}>
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
          </Grid2>
        </Grid2>
      )}
    </>
  );
};
