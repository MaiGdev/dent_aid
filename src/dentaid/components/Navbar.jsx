import { Button, Grid2, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import * as React from "react";
import { Link, useLocation } from "react-router";

export const NavBar = ({ drawerWidth }, props) => {
  const { window } = props;

  const location = useLocation();

  const isActive = (path) => location.pathname === path;


  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "90vh",
        borderRadius: "3rem",
        p: "30px",
      }}
    >
      <CssBaseline />
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          padding: "35px 30px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Drawer goes here */}

        <Grid2 container direction={"column"} width={"219px"} margin={"0 auto"}>
          <img src="/public/logo.png" alt="" />
        </Grid2>
        <Grid2 container padding={"35px 1.5rem"}>
          <InputLabel
            sx={{ fontSize: "30px", color: "#102C49", fontWeight: "600" }}
          >
            Example user
          </InputLabel>
          <InputLabel sx={{ fontSize: "17px", color: "#024389" }}>
            example@gmail.com
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

        <Grid2 container padding={"35px 1rem"}>
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
                  color: isActive("/dentaid/dashboard") ? "#024389" : "#81A1C4",
                  fontWeight: isActive("/dentaid/dashboard") ? "600" : "normal",
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
                  color: isActive("/dentaid/settings") ? "#024389" : "#81A1C4",
                  fontWeight: isActive("/dentaid/settings") ? "600" : "normal",
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
      </Box>
    </Box>
  );
};
NavBar.propTypes = {
  window: PropTypes.func,
};
