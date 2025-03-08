import { ArrowBack } from "@mui/icons-material";
import { Button, Grid2, Paper } from "@mui/material";
import { useNavigate } from "react-router";

export const CardContainer = ({ children, maxWidth, urlNavigate = "/" }) => {
  const navigator = useNavigate();

  return (
    <Paper sx={{ outline: "1px solid #cccccc", borderRadius: "1rem" }}>
      <Grid2
        className="w-full bg-[#333333] px-3.5 py-[4px] flex items-center"
        sx={{
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        <Button
          onClick={() => navigator(`${urlNavigate}`)}
          startIcon={<ArrowBack />}
          sx={{
            color: "#fff",
            minWidth: 0,
            padding: "0 5px",
            gap: "5px",
            width: "fit-content",
            height: "fit-content",
            textTransform: "none",
            outline: "0 solid transparent",
            transition:
              "outline 0.15s ease-in-out, background-color 0.3s ease-in-out",
            "&:hover": {
              color: "#fff",
              outline: "1.5px solid #fff",
              backgroundColor: "#01448A",
            },
          }}
        >
          Back
        </Button>
      </Grid2>
      {children}
    </Paper>
  );
};
