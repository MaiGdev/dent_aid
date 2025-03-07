import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks";
import { onUpdateUser } from "../../store";
import { CardContainer } from "../components";
import { CalendarIcon } from "@mui/x-date-pickers";
import { GeneralInformation } from "../components/UserDetails/GeneralInformation";
import { ProfessionalInformation } from "../components/UserDetails/ProfessionalInformation";
import { DentAidLayout } from "../layout/DentAidLayout";
import { MedicalInformation } from "../components/UserDetails/MedicalInformation";

export const UserDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const userType = searchParams.get("usertype");
  const boxRef = useRef(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { updatedUser } = useSelector((state) => state.userSlice);

  const { startGetUser } = useAuthStore();
  const location = useLocation();

  const { user } = useAuthStore();

  useLayoutEffect(() => {
    if (updatedUser && boxRef.current) {
      setBoxWidth(boxRef.current.offsetWidth);
    }
  }, [updatedUser]);

  const fetchUser = async () => {
    try {
      let data;
      if (user.id === id && user.role === userType) {
        data = await startGetUser({ id });
        dispatch(
          onUpdateUser({
            ...data,
          })
        );
      } else {
        data = await startGetUser({ id, userType });
        dispatch(
          onUpdateUser({
            ...data.user,
          })
        );
      }
    } catch (error) {
      console.error("Error obteniendo usuario:", error);
      Swal.fire(
        "Error",
        "No se pudo cargar la información del usuario",
        "error"
      );
    }

    console.log(location.pathname);
  };

  useEffect(() => {
    if (id && userType) {
      fetchUser();
    }
  }, [id, userType]);

  return (
    <DentAidLayout>
      <Box className="flex flex-col gap-4 bg-white min-h-full rounded-[2rem] lg:rounded-[3rem] border border-[#cccccc] !p-5 md:!p-10 lg:p-6">
        <CardContainer>
          <Grid2 className="flex justify-between items-center mx-4 pt-5 pb-10 xl:px-[3rem] xl:py-[2rem]">
            <Grid2
              className={`flex flex-col justify-center ${
                userType !== "DENTIST_ROLE" ? "items-center w-full" : ""
              }  sm:!items-start`}
            >
              <Typography className="!text-[20px] xl:!text-3xl ">
                {updatedUser?.fullName}
              </Typography>
              <Typography className="!text-sm lg:!text-base text-[#92959E] ">
                {userType === "ADMIN_ROLE" && "ADMINISTRATOR"}
                {userType === "DENTIST_ROLE" && "DENTIST"}
                {userType === "PATIENT_ROLE" && "PATIENT"}
              </Typography>
            </Grid2>
            {userType === "DENTIST_ROLE" && (
              <Grid2 className="">
                <Button
                  onClick={() => {
                    navigate(`/dentaid/user/${id}/schedule`);
                  }}
                  className="flex justify-center items-center gap-2 !bg-[#01448A] !text-white text-sm font-semibold !rounded-lg !normal-case hover:!bg-[#4A5D72] !min-w-0 !w-10 sm:!w-fit"
                  endIcon={<CalendarIcon />}
                >
                  <span className="hidden sm:block">Schedule</span>
                </Button>
              </Grid2>
            )}
          </Grid2>
          <Grid2 className="flex flex-col gap-5 px-[1rem] pb-[2.5rem] lg:px-[1.5rem] xl:px-[5rem] lg:pb-[5rem] ">
            <GeneralInformation />
            {userType !== "ADMIN_ROLE" && <Divider sx={{ margin: "1rem 0" }} />}
            {userType === "DENTIST_ROLE" && <ProfessionalInformation />}
            {userType === "PATIENT_ROLE" && <MedicalInformation />}
          </Grid2>
        </CardContainer>
      </Box>
    </DentAidLayout>
  );
};
