import { Box, Grid2, Input, InputLabel, MenuItem, Select } from "@mui/material";
import { DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContext } from "react";
import { FormContext } from "../../../context/FormContext";

export const FormStepPersonalInformation = () => {
  const {
    fullName,
    identification,
    dateOfBirth,
    gender,
    city,
    address,
    emergencyPhoneNumber,
    phoneNumber,
    onInputChange,
  } = useContext(FormContext);
  return (
    <>
      <Box sx={{ width: "558.31px" }}>
        <Grid2 container direction="column" spacing={2}>
          <InputLabel
            sx={{
              fontSize: "1.145rem",
              fontWeight: "500", //
              color: "#404D61",
              position: "static",
              textAlign: "left",
            }}
          >
            Personal information
          </InputLabel>
          <Grid2
            container
            direction={"row"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
            spacing={2}
          >
            <Grid2 size={6} sx={{ paddingRight: ".5rem" }}>
              <Input
                id="fullName"
                placeholder="Full Name"
                type="text"
                name="fullName"
                value={fullName}
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
                  "&.Mui-focused": {
                    outline: "2px solid #3367D1",
                  },
                }}
              />
            </Grid2>
            <Grid2 size={6} sx={{ paddingLeft: ".5rem" }}>
              <Input
                id="identification"
                placeholder="National ID / Passport Number"
                type="text"
                name="identification"
                value={identification}
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
            </Grid2>
            <Grid2 size={6} sx={{ paddingRight: ".5rem" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  label=" Date of birth"
                  sx={{
                    marginTop: "0.5rem",
                    "& .MuiInputBase-root": {
                      fontSize: "0.875rem",
                      height: "2.063rem",
                      borderRadius: ".5rem",
                      textAlign: "left",
                    },
                  }}
                  fullWidth
                  value={dateOfBirth || dayjs()}
                  onChange={onInputChange}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={6} sx={{ paddingLeft: ".5rem" }}>
              <Select
                labelId="gender-select-label"
                id="gender"
                value={gender}
                label="Gender"
                onChange={({ target: { value } }) =>
                  onInputChange({ target: { name: "gender", value } })
                }
                name="gender"
                fullWidth
                sx={{
                  fontSize: "0.875rem",
                  height: "2.063rem",
                  borderRadius: ".5rem",
                  border: "1px solid #cccccc",
                  marginTop: "0.5rem",
                  color: "#5A6474",
                  textAlign: "left",

                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                {gender === "gender" && (
                  <MenuItem value="gender" disabled>
                    Gender
                  </MenuItem>
                )}

                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
                <MenuItem value="preferNotToSay">Prefer Not to Say</MenuItem>
              </Select>
            </Grid2>
            <Grid2 size={12}>
              <Input
                id="phoneNumber"
                placeholder="Phone Number"
                type="text"
                name="phoneNumber"
                value={phoneNumber}
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
            </Grid2>
            <Grid2 size={12}>
              <Input
                id="emergencyPhoneNumber"
                placeholder="Emergency Contact"
                type="text"
                name="emergencyPhoneNumber"
                value={emergencyPhoneNumber}
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
            </Grid2>

            <InputLabel
              sx={{
                fontSize: "1.145rem",
                fontWeight: "500",
                color: "#404D61",
                position: "static",
                textAlign: "left",
                marginTop: "1rem",
              }}
            >
              Address
            </InputLabel>
            <Grid2 size={12}>
              <Input
                id="city"
                placeholder="City"
                type="text"
                name="city"
                value={city}
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
            </Grid2>
            <Grid2 size={12}>
              <Input
                id="address"
                placeholder="Address Line"
                type="text"
                name="address"
                value={address}
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
            </Grid2>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};
