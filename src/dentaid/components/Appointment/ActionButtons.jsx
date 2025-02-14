import { Button, Grid2 } from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import { useNavigate } from "react-router";

export const ActionButtons = ({ onSubmit, navigator }) => {
  return (
    <Grid2 sx={{ display: "flex", gap: "1rem" }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => navigator(`/dentaid/appointments`)}
        fullWidth
        sx={{
          backgroundColor: "#fff",
          color: "#475B6F",
          fontSize: "0.875rem",
          fontWeight: "600",
          borderRadius: "1.5rem",
          marginTop: "40px",
          gap: "0.3rem",
          textTransform: "none",
          "&:hover": {
            color: "#475B6F",
            boxShadow: "0 0 0 2px #475B6F",
          },
          transition: "all 0.3s",
        }}
      >
        Cancel
      </Button>

      <Button
        endIcon={<Save />}
        onClick={onSubmit}
        fullWidth
        sx={{
          backgroundColor: "#01448A",
          color: "white",
          fontSize: "0.875rem",
          fontWeight: "600",
          borderRadius: "1.5rem",
          marginTop: "40px",
          gap: "0.3rem",
          textTransform: "none",
          "&:hover": {
            backgroundColor: "white",
            color: "#01448A",
            boxShadow: "0 0 0 2px #01448A",
          },
        }}
      >
        Save
      </Button>
    </Grid2>
  );
};
