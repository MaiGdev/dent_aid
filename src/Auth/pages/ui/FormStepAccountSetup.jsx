import { Box, Grid2, Input, InputLabel } from "@mui/material";
import { useContext } from "react";
import { FormContext } from "../../../context/FormContext";

export const FormStepAccountSetup = () => {
  const { email, password, onInputChange } = useContext(FormContext);
  return (
    <>
      <Box sx={{ width: "558.31px" }}>
        <Grid2 container direction="column" spacing={2}>
          <InputLabel
            sx={{
              fontSize: "1.145rem",
              fontWeight: "500", 
              color: "#404D61",
              position: "static",
              textAlign: "left",
            }}
          >
            Account Setup
          </InputLabel>
          <Grid2 xs={12} sm={6}>
            <Input
              id="email"
              placeholder="Email Address"
              type="text"
              name="email"
              value={email}
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
          <Grid2 xs={12} sm={6}>
            <Input
              id="password-input"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
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
      </Box>
    </>
  );
};
