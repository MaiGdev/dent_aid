import { Button, Grid2, Input, InputLabel } from "@mui/material";
import { useContext } from "react";
import Swal from "sweetalert2";
import { FormContext } from "../../../context/FormContext";
import { useAuthStore } from "../../../hooks";


export const LoginForm = () => {
  const { email, password, onInputChange } = useContext(FormContext);
  const { startLogin } = useAuthStore();
  const handleLogin = async () => {
    console.log("handleLogin");
    console.log({ email: email, password: password });

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
  };
  return (
    <>
      <Grid2 container direction="column" spacing={2}>
        <form onSubmit={handleLogin}>
          <Grid2 xs={12} sm={6}>
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
                border: "1px solid #cccccc",
                padding: "0.5rem 1rem",
                marginTop: "0.5rem",
                position: "static",
                "&:focus": {
                  borderColor: "#2A3E54",
                },
              }}
            />
          </Grid2>
          <Grid2 xs={12} sm={6}>
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
                border: "1px solid #cccccc",
                padding: "0.5rem 1rem",
                marginTop: "0.5rem",
                position: "static",
                "&:focus": {
                  borderColor: "#2A3E54",
                },
              }}
            />
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
