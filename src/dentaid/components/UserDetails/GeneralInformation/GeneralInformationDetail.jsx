import { Grid2, Typography } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { formatDate } from "../../../../helpers";

export const GeneralInformationDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const boxDetailsRef = useRef(null);
  const [boxDetailsWidth, setBoxDetailsWidth] = useState(0);
  const { updatedUser } = useSelector((state) => state.userSlice);

  useLayoutEffect(() => {
    if (boxDetailsRef.current) {
      setBoxDetailsWidth(boxDetailsRef.current.offsetWidth);
    }
  }, [updatedUser]);

  return (
    <>
      {updatedUser && (
        <>
          <Grid2 className="flex flex-col gap-8 items-start   md:justify-center ">
            <Grid2
              className={`w-full  lg:pb-0 md:!w-[490px] lg:!w-full xl:!w-[490px]`}
            >
              <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C] ">
                Full name
              </Typography>
              <Typography
                className={`text-base md:!text-[1.1rem] text-[#00000099] md:w-${boxDetailsWidth}px overflow-hidden pt-4`}
              >
                {updatedUser.fullName}
              </Typography>
            </Grid2>


            <Grid2>
              <Grid2 className="flex flex-col sm:flex-row gap-10 items-start  md:justify-center md:gap-[90px] ">
                <Grid2 className="flex flex-col gap-8 items-start justify-start ">
                  <Grid2 className="flex flex-col gap-4">
                    <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C]">
                      Email
                    </Typography>
                    <Typography className="text-base md:!text-[1.20rem] text-[#00000099]">
                      {updatedUser.email}
                    </Typography>
                  </Grid2>
                  <Grid2 className="flex flex-col gap-4">
                    <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C]">
                      Date of birth
                    </Typography>
                    <Typography className="text-base md:!text-[1.20rem] text-[#00000099]">
                      {formatDate(updatedUser.dateOfBirth)}
                    </Typography>
                  </Grid2>
                  <Grid2 className="flex flex-col gap-4">
                    <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C]">
                      Phone number
                    </Typography>
                    <Typography className="text-base md:!text-[1.20rem] text-[#00000099]">
                      {updatedUser.phoneNumber}
                    </Typography>
                  </Grid2>
                </Grid2>

                <Grid2 className="flex flex-col gap-8 items-start justify-start ">
                  <Grid2 className="flex flex-col gap-4">
                    <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C]">
                      Identification
                    </Typography>
                    <Typography className="text-base md:!text-[1.20rem] text-[#00000099]">
                      {updatedUser.identification}
                    </Typography>
                  </Grid2>

                  <Grid2 className="flex flex-col gap-4">
                    <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C]">
                      Gender
                    </Typography>
                    <Typography className="text-base md:!text-[1.20rem] text-[#00000099]">
                      {updatedUser.gender}
                    </Typography>
                  </Grid2>
                  <Grid2 className="flex flex-col gap-4">
                    <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C]">
                      Emergency phone number
                    </Typography>
                    <Typography className="text-base md:!text-[1.20rem] text-[#00000099]">
                      {updatedUser.emergencyPhoneNumber}
                    </Typography>
                  </Grid2>
                </Grid2>
              </Grid2>
            </Grid2>

            <Grid2
              className={`w-full pb-6 lg:pb-0 md:!w-[490px] lg:!w-full xl:!w-[490px]`}
            >
              <Typography className="!text-[18px] sm:!text-[1.20rem] text-[#15192C] ">
                Address
              </Typography>
              <Typography
                className={`text-base md:!text-[1.1rem] text-[#00000099] md:w-${boxDetailsWidth}px overflow-hidden pt-4`}
              >
                {updatedUser.address}
              </Typography>
            </Grid2>
          </Grid2>
        </>
      )}
    </>
  );
};
