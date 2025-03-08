import { Box } from "@mui/material";
import { NavBar } from "../components";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useUserStore } from "../../hooks";

export const DentAidLayout = ({ children }) => {
  const { startGetUsers } = useUserStore();

  useEffect(() => {
    startGetUsers();
  }, []);

  return (
    <Box
      className="!p-0 sm:!p-5 md:!p-10 lg:!p-10"
      sx={{
        display: "flex",
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#F8F9FC",
        gap: "40px",
      }}
    >
      <NavBar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        /*    className=" !grow flex bg-[#F8F9FC] min-w-0 " */
        className=" !grow bg-white min-w-0 border border-[#ccc] rounded-[.5rem] lg:rounded-[3rem] "
        sx={{
          flexGrow: 1,
        }}
      >
        {children}
      </motion.main>
    </Box>
  );
};
