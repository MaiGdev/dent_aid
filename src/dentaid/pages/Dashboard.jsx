import { Box } from "@mui/material";
import { DentAidLayout } from "../layout/DentAidLayout";

export const DashBoard = () => {
  return (
    <DentAidLayout>
      <Box
        sx={{
          backgroundColor: "#fff",
          minHeight: "100%",
          borderRadius: "3rem",
          border: "1px solid #cccccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Hello from the dashboard</h1>
      </Box>
    </DentAidLayout>
  );
};
