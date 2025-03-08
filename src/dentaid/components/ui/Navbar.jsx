import { Button, Grid2, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import * as React from "react";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "../../../hooks";
import {
  adminOptions,
  defaultOptions,
  dentistOptions,
  patientOptions,
} from "./constants/navOptions";
import { LogOutIcon } from "../../icons/Logout";

export const NavBar = () => {
  const { startLogout, user, status } = useAuthStore();
  const location = useLocation();

  const loggedUserOptions = () => {
    if (status === "authenticated" && user && user.role === "ADMIN_ROLE") {
      return adminOptions;
    }
    if (status === "authenticated" && user && user.role === "DENTIST_ROLE") {
      return dentistOptions();
    }
    if (status === "authenticated" && user && user.role === "PATIENT_ROLE") {
      return patientOptions;
    }
    return [];
  };

  const isActive = (path) => {
    const { pathname, search } = location;

    if (path === "/dentaid/user-management") {
      return (
        pathname.startsWith("/dentaid/user-management") ||
        (pathname.startsWith("/dentaid/user/") &&
          !pathname.includes(`/dentaid/user/${user?.id}`))
      );
    }

    if (path === "/dentaid/appointments") {
      return (
        pathname.startsWith("/dentaid/appointments") ||
        pathname.startsWith("/dentaid/appointments/:id")
      );
    }

    if (pathname !== path.split("?")[0]) return false;

    const pathQueryParams = new URLSearchParams(path.split("?")[1] || "");
    const currentQueryParams = new URLSearchParams(search);

    for (const [key, value] of pathQueryParams.entries()) {
      if (currentQueryParams.get(key) !== value) return false;
    }

    return true;
  };

  return (
    <Box className="xl:p-8 bg-white rounded-[3rem] border border-[#ccc] hidden lg:flex ">
      <Box
        component="nav"
        className="w-[330px] h-full px-[35px] py-[30px] flex flex-col "
      >
        <Grid2 className="!flex flex-col items-center justify-center gap-9 pb-8 pt-9 px-[35px]">
          <Grid2 className="w-[190px]  2xl:w-[249px]">
            <img src="/logo.png" alt="" />
          </Grid2>
          <Grid2 className="flex flex-col items-start justify-start w-full">
            <InputLabel
              className="text-2xl 2xl:!text-[1.75rem]  font-semibold"
              sx={{ fontSize: "1.75rem", color: "#102C49", fontWeight: "600" }}
            >
              {user.name}
            </InputLabel>
            <InputLabel sx={{ fontSize: "17px", color: "#024389" }}>
              {user.email}
            </InputLabel>
          </Grid2>
        </Grid2>
        <Divider className="!w-[219px] !m-auto " />

        <Box className="flex flex-col w-full grow">
          <Grid2 container className="py-8 px-4 grow-0">
            {loggedUserOptions().map((option) => (
              <Grid2 key={option.href} size={12}>
                <Link to={option.href} className="!normal-case">
                  <Button
                    className={`!text-2xl !normal-case !justify-start !w-full`}
                    sx={{
                      color: isActive(`${option.href}`) ? "#024389" : "#81A1C4",
                      fontWeight: isActive(`${option.href}`) ? "600" : "normal",
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

            {defaultOptions().map((option) => (
              <Grid2 key={option.href} size={12}>
                <Link to={option.href} className="!normal-case">
                  <Button
                    className={`!text-2xl !normal-case !justify-start`}
                    sx={{
                      color: isActive(`${option.href}`) ? "#024389" : "#81A1C4",
                      fontWeight: isActive(`${option.href}`) ? "600" : "normal",
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
            className="px-4 py-8 grow flex flex-col justify-center items-end"
          >
            <Grid2 size={12}>
              <Button
                onClick={() => startLogout()}
                startIcon={<LogOutIcon />}
                className="!text-2xl !normal-case justify-start gap-2"
                sx={{
                  color: isActive("/dentaid/settings") ? "#024389" : "#81A1C4",
                  fontWeight: isActive("/dentaid/settings") ? "600" : "normal",
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
