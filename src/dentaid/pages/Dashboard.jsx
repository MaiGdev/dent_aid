import { Box, Grid2, Skeleton } from "@mui/material";
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
          padding: "1.5rem",
          gap: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Grid2
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              flexGrow: "1",
            }}
          >
            <Skeleton
              variant="rectangular"
              height={118}
              sx={{ borderRadius: "8px" }}
            />

            <Skeleton
              variant="rectangular"
              height={371}
              sx={{ borderRadius: "8px" }}
            />
          </Grid2>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={375}
              sx={{ borderRadius: "8px", height: "100%" }}
            />
          </Grid2>
        </Grid2>
        <Skeleton
          variant="rectangular"
          height={78}
          sx={{ borderRadius: "8px" }}
        />
        <Grid2
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Skeleton
              variant="rectangular"
              width={375}
              sx={{ borderRadius: "8px", height: "100%" }}
            />
          </Grid2>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              flexGrow: "1",
            }}
          >
            <Skeleton
              variant="rectangular"
              height={100}
              sx={{ borderRadius: "8px" }}
            />
          </Grid2>
        </Grid2>
      </Box>
    </DentAidLayout>
  );
};
