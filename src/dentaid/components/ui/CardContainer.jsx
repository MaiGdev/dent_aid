import { ArrowBack } from "@mui/icons-material";
import { Button, Grid2, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const CardContainer = ({ children, maxWidth, urlNavigate = "/" }) => {
  const navigator = useNavigate();
  const { user } = useSelector((state) => state.authSlice);

  return (
    <Paper sx={{ outline: "1px solid #cccccc", borderRadius: "1rem" }}>
      <Grid2
        className={`w-full bg-[#333333] px-3.5 py-[4px] flex items-center`}
        sx={{
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
        }}
      >
        <Button
          onClick={() => navigator(`${urlNavigate}`)}
          startIcon={<ArrowBack />}
          className="!text-white !min-w-0 !py-0 !px-[5px] !gap-[5px] !w-fit !h-fit !normal-case"
          sx={{
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
