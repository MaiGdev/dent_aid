import {
  Autocomplete,
  Grid2,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dentistSpecialityOptions } from "../../../../auth/pages/ui/constants/dentist-speciaty";
import { compareObjects } from "../../../../helpers/compareObjects";
import { useForm } from "../../../../hooks";
import { onUpdateDentist } from "../../../../store";

export const ProfInfoForm = () => {
  const {
    speciality,
    workplace,
    university,
    yearsOfExperience,
    medicalLicenseNumber,
    onInputChange,
    formState,
    setFormState,
    onMultipleSelectChange,
  } = useForm({
    speciality: [],
    workplace: "",
    university: "",
    yearsOfExperience: "",
    medicalLicenseNumber: "",
  });
  const dispatch = useDispatch();
  const { updatedDentist, dentistUpdateErrors } = useSelector(
    (state) => state.userSlice
  );

  useEffect(() => {
    if (updatedDentist.id) {
      setFormState({
        speciality: updatedDentist.speciality || "",
        workplace: updatedDentist.workplace || "",
        university: updatedDentist.university,
        yearsOfExperience: updatedDentist.yearsOfExperience,
        medicalLicenseNumber: updatedDentist.medicalLicenseNumber,
      });
    }
  }, [updatedDentist]);

  useEffect(() => {
    if (!compareObjects(formState, updatedDentist)) {
      dispatch(onUpdateDentist(formState));
    }
  }, [formState]);

  return (
    <>
      <Grid2
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: "35px",
          width: "490px",
        }}
      >
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              Medical License
            </Typography>
            <Grid2 xs={12} sm={6}>
              <Input
                id="medicalLicenseNumber"
                placeholder="Medical License Number"
                type="text"
                name="medicalLicenseNumber"
                value={medicalLicenseNumber}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                sx={{
                  fontSize: "0.875rem",
                  height: "2.063rem",
                  borderRadius: ".5rem",
                  border: "1px solid #cccccc",
                  padding: "0.5rem 1rem",
                  marginTop: "0.5rem",

                  "&::before, &::after": {
                    borderBottom: "none !important",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "none !important",
                  },
                  "&:focus": {
                    borderColor: "#2A3E54",
                  },
                }}
              />
              {dentistUpdateErrors.medicalLicenseNumber && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {dentistUpdateErrors.medicalLicenseNumber}
                </motion.span>
              )}
            </Grid2>
          </Grid2>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              Workplace
            </Typography>
            <Grid2 xs={12} sm={6}>
              <Input
                id="workplace"
                placeholder="Workplace (Hospital/Clinic Name)"
                type="text"
                name="workplace"
                value={workplace}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                sx={{
                  fontSize: "0.875rem",
                  height: "2.063rem",
                  borderRadius: ".5rem",
                  border: "1px solid #cccccc",
                  padding: "0.5rem 1rem",
                  marginTop: "0.5rem",

                  "&::before, &::after": {
                    borderBottom: "none !important",
                  },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottom: "none !important",
                  },
                  "&:focus": {
                    borderColor: "#2A3E54",
                  },
                }}
              />
              {dentistUpdateErrors.workplace && (
                <motion.span
                  className="!text-red-400 text-[12px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {dentistUpdateErrors.workplace}
                </motion.span>
              )}
            </Grid2>
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
            Speciality
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
            options={dentistSpecialityOptions}
            value={speciality}
            onChange={(event, newValue) => {
              onMultipleSelectChange({
                target: {
                  name: "speciality",
                  value: newValue,
                },
              });
            }}
            multiple
            renderInput={(params) => (
              <TextField
                {...params}
                label="Speciality"
                InputLabelProps={{
                  style: {
                    top: "-9px",
                    color: "#A2A2A2",
                  },
                }}
              />
            )}
          />

          {dentistUpdateErrors.speciality && (
            <motion.span
              className="!text-red-400 text-[12px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {dentistUpdateErrors.speciality}
            </motion.span>
          )}
        </Grid2>

        <Grid2
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid2
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              University
            </Typography>
            <Input
              id="university"
              placeholder="University (Name & Graduation Year)"
              type="text"
              name="university"
              value={university}
              onChange={onInputChange}
              variant="filled"
              fullWidth
              sx={{
                fontSize: "0.875rem",
                height: "2.063rem",
                borderRadius: ".5rem",
                border: "1px solid #cccccc",
                padding: "0.5rem 1rem",
                marginTop: "0.5rem",

                "&::before, &::after": {
                  borderBottom: "none !important",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none !important",
                },
                "&:focus": {
                  borderColor: "#2A3E54",
                },
              }}
            />
            {dentistUpdateErrors.university && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {dentistUpdateErrors.university}
              </motion.span>
            )}
          </Grid2>

          <Grid2
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <Typography sx={{ fontSize: "1.20rem", color: "#15192C" }}>
              Years of experience
            </Typography>
            <Input
              id="yearsOfExperience"
              placeholder="Years of Experience"
              type="number"
              name="yearsOfExperience"
              value={yearsOfExperience}
              min="0"
              onChange={(e) => {
                if (e.target.value >= 0) {
                  onInputChange(e);
                }
              }}
              variant="filled"
              fullWidth
              sx={{
                fontSize: "0.875rem",
                height: "2.063rem",
                borderRadius: ".5rem",
                border: "1px solid #cccccc",
                padding: "0.5rem 1rem",
                marginTop: "0.5rem",

                "&::before, &::after": {
                  borderBottom: "none !important",
                },
                "&:hover:not(.Mui-disabled):before": {
                  borderBottom: "none !important",
                },
                "&:focus": {
                  borderColor: "#2A3E54",
                },
              }}
            />
            {dentistUpdateErrors.yearsOfExperience && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {dentistUpdateErrors.yearsOfExperience}
              </motion.span>
            )}
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
};
