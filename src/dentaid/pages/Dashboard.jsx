import { Box, Grid2, Skeleton } from "@mui/material";
import { DentAidLayout } from "../layout/DentAidLayout";

export const DashBoard = () => {
  return (
    <DentAidLayout>
      <Box className="flex flex-col gap-4 bg-white min-h-full rounded-[2rem] lg:rounded-[3rem] border border-[#cccccc] p-4 lg:p-6">
        <Grid2 className="flex lg:gap-4">
          <Grid2 className="flex flex-col gap-4 grow">
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
          <Grid2 className="flex flex-col gap-4">
            <Skeleton
              variant="rectangular"
              className="lg:w-[375px]"
              sx={{ borderRadius: "8px", height: "100%" }}
            />
          </Grid2>
        </Grid2>
        <Skeleton
          variant="rectangular"
          height={78}
          sx={{ borderRadius: "8px" }}
        />
        <Grid2 className="flex lg:gap-4">
          <Grid2 className="flex flex-col gap-4 ">
            <Skeleton
              variant="rectangular"
              className="lg:w-[375px]"
              sx={{ borderRadius: "8px", height: "100%" }}
            />
          </Grid2>
          <Grid2 className="flex flex-col gap-4 grow">
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
