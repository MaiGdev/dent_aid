import { Button, Grid2, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import * as React from "react";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "../../hooks/useAuthStore";

export const NavBar = ({ drawerWidth }, props) => {
  const { window } = props;

  const { startLogout, user } = useAuthStore();
  const location = useLocation();


  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    startLogout();
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "3rem",
        p: "30px",
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
          /*      justifyContent: "center", */
        }}
      >
        {/* Drawer goes here */}

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
            <Grid2 size={12}>
              <Link
                to={"/dentaid/user-management"}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button
                  sx={{
                    fontSize: "24px",
                    color: isActive("/dentaid/user-management")
                      ? "#024389"
                      : "#81A1C4",
                    fontWeight: isActive("/dentaid/user-management")
                      ? "600"
                      : "normal",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    width: "100%",
                    position: "relative",
                    "&::before": isActive("/dentaid/user-management")
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
                  User Management
                </Button>
              </Link>
            </Grid2>
            <Grid2 size={12}>
              <Link
                to={"/dentaid/dashboard"}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button
                  sx={{
                    fontSize: "24px",
                    color: isActive("/dentaid/dashboard")
                      ? "#024389"
                      : "#81A1C4",
                    fontWeight: isActive("/dentaid/dashboard")
                      ? "600"
                      : "normal",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    width: "100%",
                    position: "relative",
                    "&::before": isActive("/dentaid/dashboard")
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
                  Dashboard
                </Button>
              </Link>
            </Grid2>
            <Grid2 size={12}>
              <Link
                to={"/dentaid/account"}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button
                  sx={{
                    fontSize: "24px",
                    color: isActive("/dentaid/account") ? "#024389" : "#81A1C4",
                    fontWeight: isActive("/dentaid/account") ? "600" : "normal",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    width: "100%",
                    position: "relative",
                    "&::before": isActive("/dentaid/account")
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
                  Account
                </Button>
              </Link>
            </Grid2>
            <Grid2 size={12}>
              <Link
                to={"/dentaid/settings"}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <Button
                  sx={{
                    fontSize: "24px",
                    color: isActive("/dentaid/settings")
                      ? "#024389"
                      : "#81A1C4",
                    fontWeight: isActive("/dentaid/settings")
                      ? "600"
                      : "normal",
                    textTransform: "none",
                    justifyContent: "flex-start",
                    width: "100%",
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
                  Settings
                </Button>
              </Link>
            </Grid2>
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
