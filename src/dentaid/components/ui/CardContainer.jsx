import { ArrowBack } from "@mui/icons-material";
import { Button, Grid2, Paper } from "@mui/material";
import { useNavigate } from "react-router";

export const CardContainer = ({
  children,
  minHeight = "100%",
  borderRadius = "3rem",
  display = "flex",
  flexDirection = "",
  justifyContent = "",
  alignItems = "",
  backgroundColor = "#fff",
  border = "1px solid #cccccc",
  padding = "2.5rem",
  gap = "3.125rem",
  urlNavigate = "/",
}) => {
  const navigator = useNavigate();

  return (
    /*     <Box
      sx={{
        minHeight: minHeight,
        borderRadius: borderRadius,
        display: display,
        flexDirection: flexDirection,
        justifyContent: justifyContent,
        alignItems: alignItems,
        backgroundColor: backgroundColor,
        border: border,
        padding: padding,
        gap: gap,
      }}
    > */
    /*       <Grid2
        container
        direction={"column"}
        spacing={3}
        sx={{
          backgroundColor: "#fff",
          padding: "2.5rem",
          borderRadius: "1rem",
        }}
      > */
    <Paper sx={{ outline: "1px solid #cccccc", borderRadius: "1rem" }}>
      <Grid2
        sx={{
          width: "100%",
          backgroundColor: "#333333",
          borderTopLeftRadius: "1rem",
          borderTopRightRadius: "1rem",
          padding: "4px 14px",
          display: "flex",
          alignItems: "center",
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
    /*    </Grid2> */
    /*    </Box> */
  );
};
