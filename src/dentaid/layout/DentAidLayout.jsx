import { Box } from "@mui/material";
import { NavBar } from "../components";

export const DentAidLayout = ({ children }) => {
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
        {children}
      </Box>
    </Box>
  );
};
