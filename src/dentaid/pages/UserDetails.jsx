import { Settings } from "@mui/icons-material";
import { Button, Divider, Grid2, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks";
import { CardContainer } from "../components";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
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
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const { startGetUser } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await startGetUser({ id, userType });
        const dateOfBirthFormat = new Date(
          data.user.dateOfBirth
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setUserData({
          ...data,
          dateOfBirthFormat,
        });
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

    if (id && userType) fetchUser();
  }, [id, userType]);

  useLayoutEffect(() => {
    if (userData && boxRef.current) {
      setBoxWidth(boxRef.current.offsetWidth);
    }
  }, [userData]);

  return (
    <DentAidLayout>
      {userData !== null ? (
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
                {userData.user.fullName}
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
            <GeneralInformation
              userData={userData}
              boxWidth={boxWidth}
              boxRef={boxRef}
            />
            {userType !== "ADMIN_ROLE" && <Divider />}

            {userType === "DENTIST_ROLE" && (
              <ProfessionalInformation
                userData={userData}
                boxWidth={boxWidth}
              />
            )}

            {userType === "PATIENT_ROLE" && (
              <MedicalInformation userData={userData} boxWidth={boxWidth} />
            )}
          </Grid2>
        </CardContainer>
      ) : (
        <>
          <LoadingSpinner size="100px" heightContainer="100vh" />
        </>
      )}
    </DentAidLayout>
  );
};
