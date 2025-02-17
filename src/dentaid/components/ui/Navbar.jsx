import { Button, Grid2, InputLabel, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import * as React from "react";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "../../../hooks";

export const NavBar = ({ drawerWidth }, props) => {
  const { window } = props;
  const theme = useTheme();

  const { startLogout, user, status } = useAuthStore();
  const location = useLocation();

  const adminOptions = [
    { label: "User Management", href: "/dentaid/user-management" },
    { label: "Dashboard", href: "/dentaid/dashboard" },
    {
      label: "Appointments",
      href: "/dentaid/appointments",
    },
  ];

  const dentistOptions = [
    {
      label: "Appointments",
      href: "/dentaid/appointments",
    },
    { label: "Dashboard", href: "/dentaid/dashboard" },
    { label: "Schedule", href: "/dentaid/schedule" },
    { label: "Patient History", href: "/dentaid/patient-history" },
  ];

  const defaultOptions = [
    {
      label: "Account",
      href: `/dentaid/user/${user?.id}?usertype=${user.role}&account=true`,
    },
    { label: "Settings", href: "/dentaid/settings" },
  ];

  const loggedUserOptions = () => {
    if (status === "authenticated" && user && user.role === "ADMIN_ROLE") {
      return adminOptions;
    }
    if (status === "authenticated" && user && user.role === "DENTIST_ROLE") {
      return dentistOptions;
    }
    return [];
  };

  const isActive = (path) => {

    if (path === "/dentaid/user-management") {
      return (
        location.pathname.startsWith("/dentaid/user-management") ||
        (location.pathname.startsWith("/dentaid/user/") &&
          !location.pathname.includes(`/dentaid/user/${user?.id}`))
      );
    }
    if (path === "/dentaid/appointments") {
      return (
        location.pathname.startsWith("/dentaid/appointments") ||
        location.pathname.startsWith("/dentaid/appointments/:id")
      );
    }
    if (location.pathname.startsWith(`/dentaid/user/${user?.id}`)) {
      if (path.includes(`?usertype=${user.role}&account=true`)) return true;
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    startLogout();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "3rem",
        p: "30px",
        border: "1px solid #cccccc",
        [theme.breakpoints.down("md")]: {
          display: "none",
        },
      }}
    >
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          height: "100%",
          padding: "35px 30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid2 container direction={"column"} width={"219px"} margin={"0 auto"}>
          <img src="/public/logo.png" alt="" />
        </Grid2>
        <Grid2 container padding={"35px 1.5rem"}>
          <InputLabel
            sx={{ fontSize: "1.75rem", color: "#102C49", fontWeight: "600" }}
          >
            {user.name}
          </InputLabel>
          <InputLabel sx={{ fontSize: "17px", color: "#024389" }}>
            {user.email}
          </InputLabel>
        </Grid2>
        <Divider
          sx={{
            width: "219px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
          }}
        />

        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <Grid2 container padding={"35px 1rem"} sx={{ flexGrow: "0" }}>
            {loggedUserOptions().map((option) => (
              <Grid2 key={option.href} size={12}>
                <Link
                  to={option.href}
                  sx={{
                    textDecoration: "none",
                    width: "100%",
                  }}
                >
                  <Button
                    sx={{
                      fontSize: "24px",
                      color: isActive(`${option.href}`) ? "#024389" : "#81A1C4",
                      fontWeight: isActive(`${option.href}`) ? "600" : "normal",
                      textTransform: "none",
                      justifyContent: "flex-start",
                      textAlign: "left",
                      width: "100%",
                      position: "relative",
                      "&::before": isActive(`${option.href}`)
                        ? {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "4px",
                            height: "60%",
                            backgroundColor: "#024389",
                            borderRadius: "5px",
                          }
                        : {},
                    }}
                  >
                    {option.label}
                  </Button>
                </Link>
              </Grid2>
            ))}

            {defaultOptions.map((option) => (
              <Grid2 key={option.href} size={12}>
                <Link
                  to={option.href}
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <Button
                    sx={{
                      fontSize: "24px",
                      color: isActive(`${option.href}`) ? "#024389" : "#81A1C4",
                      fontWeight: isActive(`${option.href}`) ? "600" : "normal",
                      textTransform: "none",
                      justifyContent: "flex-start",
                      width: "100%",
                      position: "relative",
                      "&::before": isActive(`${option.href}`)
                        ? {
                            content: '""',
                            position: "absolute",
                            left: 0,
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "4px",
                            height: "60%",
                            backgroundColor: "#024389",
                            borderRadius: "5px",
                          }
                        : {},
                    }}
                  >
                    {option.label}
                  </Button>
                </Link>
              </Grid2>
            ))}
          </Grid2>
          <Grid2
            container
            padding={"35px 1rem"}
            sx={{
              flexGrow: "1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "end",
            }}
          >
            <Grid2 size={12}>
              <Button
                onClick={handleLogout}
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                    />
                  </svg>
                }
                sx={{
                  fontSize: "24px",
                  color: isActive("/dentaid/settings") ? "#024389" : "#81A1C4",
                  fontWeight: isActive("/dentaid/settings") ? "600" : "normal",
                  textTransform: "none",
                  justifyContent: "flex-start",
                  width: "100%",
                  gap: "8px",
                  position: "relative",
                  "&::before": isActive("/dentaid/settings")
                    ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "4px",
                        height: "60%",
                        backgroundColor: "#024389",
                        borderRadius: "5px",
                      }
                    : {},
                }}
              >
                Logout
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
};
NavBar.propTypes = {
  window: PropTypes.func,
};
