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

  const drawerWidth = 320;

  return (
    <Box
      sx={{
        display: "flex",
        padding: "40px",
        minHeight: "100vh",
        backgroundColor: "#F8F9FC",
        gap: "40px",
      }}
    >
      <NavBar drawerWidth={drawerWidth} />

      <Box
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        component="main"
      >
        <motion.div
          initial={{ height: "100%", opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};
