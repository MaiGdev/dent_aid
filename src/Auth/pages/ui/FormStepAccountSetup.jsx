import { Box, Grid2, Input, Typography } from "@mui/material";
import { useContext } from "react";
import { FormContext } from "../../../context/FormContext";
import { motion } from "framer-motion";


export const FormStepAccountSetup = () => {
  const { email, password, onInputChange, errors } = useContext(FormContext);
  return (
    <>
      <Box sx={{ width: "558.31px" }}>
        <Grid2 container direction="column" spacing={2}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.145rem",
              fontWeight: "500",
              color: "#404D61",
              position: "static",
              textAlign: "left",
            }}
          >
            Account Setup
          </Typography>
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
                border: `1px solid ${errors.email ? "#ff6467" : "#cccccc"}`,
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
            {errors.email && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.email}
              </motion.span>
            )}
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
                border: `1px solid ${errors.password ? "#ff6467" : "#cccccc"}`,
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
            {errors.password && (
              <motion.span
                className="!text-red-400 text-[12px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {errors.password}
              </motion.span>
            )}
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
};
