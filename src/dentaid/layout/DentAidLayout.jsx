import { Box } from "@mui/material";
import { NavBar } from "../components/Navbar";

export const DentAidLayout = ({ children }) => {

  const drawerWidth = 320;


  return (
    <Box sx={{ display: "flex", padding: "40px", backgroundColor: "#F8F9FC", gap:"40px" }}>
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


/* 

 <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
       // Drawer goes here 
        <h3>Opciones del dra</h3>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        // Main content goes here 
      </Box>
    </Box>
*/