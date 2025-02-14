import { Box, CircularProgress } from "@mui/material";

export const LoadingSpinner = ({
  size = "50px",
  padding = "2rem",
  widthContainer = "100%",
  heightContainer = "100%",
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: widthContainer,
        height: heightContainer,
        padding: padding,
      }}
    >
      <CircularProgress size={`${size}`} />
    </Box>
  );
};
