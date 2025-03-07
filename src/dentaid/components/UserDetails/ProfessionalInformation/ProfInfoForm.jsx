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
      <Grid2 className="flex flex-col gap-8 sm:justify-center sm:items-center sm:flex-col sm:px-10 lg:px-5">
        
        <Grid2 className="flex gap-10 flex-col justify-between sm:flex-row w-full xl:w-[500px] ">
          <Grid2 className="flex flex-col gap-4 w-full">
            <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
              Medical License
            </Typography>
            <Grid2>
              <Input
                id="medicalLicenseNumber"
                placeholder="Medical License Number"
                type="text"
                name="medicalLicenseNumber"
                value={medicalLicenseNumber}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                className={`!text-sm h-8 rounded-lg border  ${
                  dentistUpdateErrors.medicalLicenseNumber
                    ? "border-[#ff6467]"
                    : "border-[#cccccc]"
                }
                  px-4 py-2 mt-2`}
                sx={{
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
          <Grid2 className="flex flex-col gap-4 w-full">
            <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
              Workplace
            </Typography>
            <Grid2>
              <Input
                id="workplace"
                placeholder="Workplace (Hospital/Clinic Name)"
                type="text"
                name="workplace"
                value={workplace}
                onChange={onInputChange}
                variant="filled"
                fullWidth
                className={`!text-sm h-8 rounded-lg border  ${
                  dentistUpdateErrors.workplace
                    ? "border-[#ff6467]"
                    : "border-[#cccccc]"
                }
                  px-4 py-2 mt-2`}
                sx={{
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

        <Grid2 className="flex flex-col gap-4 w-full xl:w-[500px]">
          <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
            Speciality
          </Typography>

          <Autocomplete
            className="w-full"
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

        <Grid2 className="flex gap-10 pb-6 flex-col justify-between sm:flex-row  w-full xl:w-[500px] xl:justify-center">
          <Grid2 className="flex flex-col gap-4 w-full">
            <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
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
              className={`!text-sm h-8 rounded-lg border  ${
                dentistUpdateErrors.university
                  ? "border-[#ff6467]"
                  : "border-[#cccccc]"
              }
                  px-4 py-2 mt-2`}
              sx={{
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

          <Grid2 className="flex flex-col gap-4 w-full">
            <Typography className="!text-base md:!text-[1.20rem] text-[#15192C]">
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
              className={`!text-sm h-8 rounded-lg border  ${
                dentistUpdateErrors.yearsOfExperience
                  ? "border-[#ff6467]"
                  : "border-[#cccccc]"
              }
                  px-4 py-2 mt-2`}
              sx={{
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
