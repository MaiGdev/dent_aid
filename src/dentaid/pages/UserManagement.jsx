import { Box, Divider, Grid2, Paper, Typography } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";
import { useAuthStore, useUserStore } from "../../hooks";
import { UserOptions } from "../components/UserManagement/UserOptions";
import { UserTable } from "../components/UserManagement/UserTable";
import { DentAidLayout } from "../layout/DentAidLayout";

export const UserManagement = () => {
  const { dentists, patients } = useUserStore();
  const [rows, setRows] = useState([]);

  const { user } = useAuthStore();

  useEffect(() => {
    //default user row
    if (dentists && dentists.length > 0) {
      const formatedDentist = dentists.map((dentist) => ({
        id: dentist.id,
        user: dentist.user.fullName,
        email: dentist.user.email,
        phoneNumber: dentist.user.phoneNumber,
        accountStatus: "active -d",
      }));
      setRows(formatedDentist);

      if (user.role === "DENTIST_ROLE") {
        const formatedPatient = patients.map((patient) => ({
          id: patient.id,
          user: patient.user?.fullName,
          email: patient.user?.email,
          phoneNumber: patient.user?.phoneNumber,
          accountStatus: "active -d",
        }));
        setRows(formatedPatient);
      }
    }
  }, [dentists, user]);

  const [userType, setUserType] = useState("DENTIST_ROLE");

  const pageTitle =
    user.role === "DENTIST_ROLE" ? "PATIENTS" : "USER MANAGEMENT";
  const pageDescription =
    user.role === "DENTIST_ROLE"
      ? "View and manage your patients' information."
      : "Manage all users, including dentists and patients.";

  return (
    <DentAidLayout>
      {user && (
        <Box className="flex flex-col justify-center items-center gap-4 bg-white rounded-[2rem] lg:rounded-[3rem] border border-[#cccccc] xl:p-6 pb-15 overflow-hidden min-h-full ">
          <Grid2 className="bg-white 2xl:p-10 rounded-2xl flex flex-col gap-6 min-w-0 w-full">
            <Grid2 className="pt-10 pb-10 md:w-full text-center lg:pb-15">
              <Typography
                variant="h1"
                className=" px-1.5  !text-3xl lg:!text-4xl bg-gradient-to-r from-[#5f83a9] lg:from-[#FFFFFF] to-[#8297ae] lg:to-[#024389] bg-clip-text text-transparent"
              >
                {pageTitle}
              </Typography>
              <Typography className="hidden md:block !text-sm text-[#92959E] font-extralight">
                {pageDescription}
              </Typography>
            </Grid2>

            <UserOptions
              userType={userType}
              setUserType={setUserType}
              setRows={setRows}
            />

            <Divider />

            <Grid2 className="w-full min-w-0 px-4 sm:px-8  ">
              <Grid2 className="h-[18px] bg-[#333333] rounded-t-xl" />
              <Paper className="border border-[#cccccc] rounded-none min-w-0">
                <UserTable rows={rows} userType={userType} />
              </Paper>
            </Grid2>
          </Grid2>
        </Box>
      )}
    </DentAidLayout>
  );
};
