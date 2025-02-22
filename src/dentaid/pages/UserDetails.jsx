import { Settings } from "@mui/icons-material";
import { Button, Divider, Grid2, Typography } from "@mui/material";
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
import { GeneralInformation } from "../components/UserDetails/GeneralInformation";
import { MedicalInformation } from "../components/UserDetails/MedicalInformation";
import { ProfessionalInformation } from "../components/UserDetails/ProfessionalInformation";
import { DentAidLayout } from "../layout/DentAidLayout";

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
      <CardContainer
        minHeight="100%"
        borderRadius="3rem"
        display="flex"
        flexDirection="column"
        backgroundColor="#fff"
        border="1px solid #cccccc"
        padding="2.5rem"
        gap="3.125rem"
        urlNavigate="/dentaid/user-management"
      >
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "2rem 3rem",
          }}
        >
          <Grid2 sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ fontSize: "1.875rem", color: "#15192C" }}>
              {updatedUser?.fullName}
            </Typography>
            <Typography sx={{ fontSize: "1rem", color: "#92959E" }}>
              {userType === "ADMIN_ROLE" && "ADMINISTRATOR"}
              {userType === "DENTIST_ROLE" && "DENTIST"}
              {userType === "PATIENT_ROLE" && "PATIENT"}
            </Typography>
          </Grid2>
          {userType === "DENTIST_ROLE" && (
            <Grid2>
              <Button
                onClick={() => {
                  navigate(`/dentaid/user/${id}/schedule`);
                }}
                sx={{
                  backgroundColor: "#01448A",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: ".5rem",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  "&:hover": {
                    backgroundColor: "#4A5D72",
                  },
                }}
                endIcon={<Settings />}
              >
                Schedule
              </Button>
            </Grid2>
          )}
        </Grid2>

        <Grid2
          sx={{
            padding: "0 5rem 5rem 5rem",
            gap: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <GeneralInformation />
          {userType !== "ADMIN_ROLE" && <Divider sx={{ margin: "1rem 0" }} />}

          {userType === "DENTIST_ROLE" && <ProfessionalInformation />}

          {userType === "PATIENT_ROLE" && <MedicalInformation />}
        </Grid2>
      </CardContainer>
    </DentAidLayout>
  );
};
