import { Box, Grid2, Input, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useContext } from "react";
import { FormContext } from "../../../context/FormContext";

export const FormStepAccountSetup = () => {
  const { email, password, onInputChange, errors } = useContext(FormContext);
  return (
    <>
      <Box className="">
        <Grid2 className="flex flex-col gap-1.5 ">
          <Typography
            variant="h2"
            className="!text-base md:!text-lg lg:!text-2xl text-[#404D61]"
          >
            Account Setup
          </Typography>
          <Grid2>
            <Input
              id="email"
              placeholder="Email Address"
              type="text"
              name="email"
              value={email}
              onChange={onInputChange}
              variant="filled"
              fullWidth
              className={`text-sm h-8 rounded-lg ${
                errors.email
                  ? "border border-[#ff6467]"
                  : "border border-[#cccccc]"
              }  p-4 mt-2`}
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
          <Grid2>
            <Input
              id="password-input"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              variant="filled"
              fullWidth
              className={`text-sm h-8 rounded-lg ${
                errors.password
                  ? "border border-[#ff6467]"
                  : "border border-[#cccccc]"
              }  p-4 mt-2`}
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
