import { Button, Grid2, Input, InputLabel } from "@mui/material";
import { motion } from "framer-motion";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FormContext } from "../../../context/FormContext";
import { accountSetupSchema } from "../../../helpers/yupSchemas";
import { useAuthStore } from "../../../hooks";

export const LoginForm = () => {
  const { email, password, onInputChange, validateForm, errors } =
    useContext(FormContext);
  const { startLogin } = useAuthStore();

  const handleLogin = async () => {
    const isValid = await validateForm(accountSetupSchema);
    console.log("handleLogin");
    console.log({ email: email, password: password });
    if (isValid) {
      try {
        const login = await startLogin({ email: email, password: password });
        if (login) {
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
            title: "Good to see you again! Enjoy your session.",
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Errores de validación:", errors);
    }
  };
  return (
    <>
      <Grid2 container direction="column">
        <form onSubmit={handleLogin} className="flex flex-col gap-1 w-full">
          <Grid2 paddingBottom={".5rem"}>
            <InputLabel
              htmlFor="email-input"
              sx={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#979797",
                position: "static",
              }}
            >
              Email
            </InputLabel>
            <Input
              id="email-input"
              placeholder="Email"
              type="email"
              name="email"
              variant="filled"
              onChange={onInputChange}
              fullWidth
              sx={{
                fontSize: "0.875rem",
                borderRadius: ".5rem",
                border: `1px solid ${errors.email ? "#ff6467" : "#cccccc"}`,
                padding: "0.5rem 1rem",
                marginTop: "0.5rem",
                position: "static",

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
            <InputLabel
              htmlFor="password-input"
              sx={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#979797",
                position: "static",
              }}
            >
              Password
            </InputLabel>
            <Input
              id="password-input"
              placeholder="********"
              type="password"
              name="password"
              onChange={onInputChange}
              variant="filled"
              fullWidth
              sx={{
                fontSize: "0.875rem",

                borderRadius: ".5rem",
                border: `1px solid ${errors.password ? "#ff6467" : "#cccccc"}`,
                padding: "0.5rem 1rem",
                marginTop: "0.5rem",
                position: "static",
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
          <Grid2 container direction="row" justifyContent="end" size={12}>
            <Button
              sx={{
                fontSize: "0.75rem",
                fontWeight: "500",
                color: "#979797",
                position: "static",
                textAlign: "right",
              }}
            >
              Can't access your account?
            </Button>
          </Grid2>

          <Grid2>
            <Button
              fullWidth
              onClick={handleLogin}
              sx={{
                backgroundColor: "#2A3E54",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: "600",
                borderRadius: "1.5rem",
                marginTop: "1rem",
                boxShadow: "inset 0 0 10px rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "#4A5D72",
                },
                "&:focus": {
                  outline: "1px solid white",
                },
              }}
            >
              Login
            </Button>
          </Grid2>
        </form>
      </Grid2>
    </>
  );
};
