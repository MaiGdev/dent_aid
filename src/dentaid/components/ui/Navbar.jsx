import { Menu } from "@mui/icons-material";
import { Button, Grid2, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useAuthStore } from "../../../hooks";

import {
  adminOptions,
  defaultOptions,
  dentistOptions,
  patientOptions,
} from "./constants/navOptions";
import { LogOutIcon, NameIcon } from "../../icons";

export const NavBar = () => {
  const { startLogout, user, status } = useAuthStore();
  const location = useLocation();
  const [openMenuSM, setOpenMenuSM] = useState(false);

  const loggedUserOptions = () => {
    if (status === "authenticated" && user && user.role === "ADMIN_ROLE") {
      return [...adminOptions, ...defaultOptions(user)];
    }
    if (status === "authenticated" && user && user.role === "DENTIST_ROLE") {
      return [...dentistOptions(user), ...defaultOptions(user)];
    }
    if (status === "authenticated" && user && user.role === "PATIENT_ROLE") {
      return [...patientOptions, ...defaultOptions(user)];
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
    <>
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
                sx={{
                  fontSize: "1.75rem",
                  color: "#102C49",
                  fontWeight: "600",
                }}
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
              <AnimatePresence>
                {loggedUserOptions().map((option) => (
                  <Grid2 key={option.href} size={12}>
                    <motion.div whileHover={{ x: -10 }}>
                      <Link to={option.href} className="!normal-case">
                        <Button
                          className={`!text-2xl !normal-case !justify-start !w-full`}
                          sx={{
                            color: isActive(`${option.href}`)
                              ? "#024389"
                              : "#81A1C4",
                            fontWeight: isActive(`${option.href}`)
                              ? "600"
                              : "normal",
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
                    </motion.div>
                  </Grid2>
                ))}
              </AnimatePresence>
            </Grid2>
            <Grid2
              container
              className="px-4 py-8 grow flex flex-col justify-center items-end"
            >
              <motion.div
                whileHover={{ x: -10 }}
                className="w-full hover:!bg-[#F6FAFD]"
              >
                <Button
                  onClick={() => startLogout()}
                  startIcon={<LogOutIcon />}
                  className="!text-2xl !normal-case justify-start gap-2"
                  sx={{
                    color: isActive("/dentaid/settings")
                      ? "#024389"
                      : "#81A1C4",
                    fontWeight: isActive("/dentaid/settings")
                      ? "600"
                      : "normal",
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
              </motion.div>
            </Grid2>
          </Box>
        </Box>
      </Box>

      {openMenuSM && (
        <AnimatePresence>
          <motion.div
            className="fixed bottom-28 left-1/2 transform -translate-x-1/2  p-4 bg-[#132337] z-50   rounded-[10px] sm:rounded-2xl lg:hidden !min-w-[90%] sm:!min-w-[80%]"
            initial={{ opacity: 0, scaleY: 0.1, scaleX: 0.5 }}
            animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="flex flex-col sm:py-2 sm:px-2 sm:text-2xl text-[#ECF5FF]">
              {loggedUserOptions().map((item, index) => (
                <>
                  <hr />
                  <Link to={item.href} className="disabled">
                    <motion.li
                      key={index}
                      className="flex items-center justify-center md:min-w-[240px] min-h-[100px] relative hover:!bg-[#ECF5FF]  hover:!text-[#132337]"
                    >
                      <span>{item.label}</span>
                    </motion.li>
                  </Link>
                  {index === loggedUserOptions().length - 1 && <hr />}
                </>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      )}

      <motion.div className="fixed flex flex-row  gap-5 sm:gap-5 bottom-5 left-1/2 -translate-x-1/2 p-4 bg-[#132337] z-50 rounded-2xl lg:hidden min-w-[90%] sm:min-w-[80%] justify-between items-center border">
      <NameIcon/>

        <button
          className="flex items-center border-2 text-[#ECF5FF] hover:bg-[#132337] transition duration-200 rounded-[10px] w-fit px-3 py-1.5 sm:px-5 sm:py-2.5  gap-2.5"
          onClick={() => {
            setOpenMenuSM((prev) => !prev);
          }}
        >
          <Menu />
        </button>
      </motion.div>
    </>
  );
};
