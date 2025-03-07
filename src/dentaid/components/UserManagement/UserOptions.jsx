import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Divider,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";

import { AssignmentInd, Settings } from "@mui/icons-material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore, useUserStore } from "../../../hooks";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { StyledMenu } from "../../constants/StyledMenu";

export const UserOptions = ({ userType, setUserType, setRows }) => {
  const { admin, dentists, patients } = useUserStore();
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState();
  const { user } = useAuthStore();
  const screenSize = useScreenSize();

  const handleUserTypeChange = ({ target }) => {
    const { value } = target;
    setUserType(value);
    console.log(value);
    switch (value) {
      case "ADMIN_ROLE":
        const formatedAdmin = admin.map((admin) => ({
          id: admin.id,
          user: admin.fullName,
          email: admin.email,
          phoneNumber: admin.phoneNumber,
          accountStatus: "active -c",
        }));
        setRows(formatedAdmin);
        break;
      case "DENTIST_ROLE":
        const formatedDentist = dentists.map((dentist) => ({
          id: dentist.id,
          user: dentist.user?.fullName,
          email: dentist.user?.email,
          phoneNumber: dentist.user?.phoneNumber,
          accountStatus: "active -d",
        }));
        setRows(formatedDentist);
        break;
      case "PATIENT_ROLE":
        const formatedPatient = patients.map((patient) => ({
          id: patient.id,
          user: patient.user?.fullName,
          email: patient.user?.email,
          phoneNumber: patient.user?.phoneNumber,
          accountStatus: "active -d",
        }));
        setRows(formatedPatient);
        break;
      default:
        console.log(value);
        break;
    }
  };

  const handleSearchFilter = ({ target }) => {
    const { value } = target;

    switch (userType) {
      case "ADMIN_ROLE":
        const formattedAdmin = admin
          .filter((admin) =>
            admin.fullName?.toLowerCase().includes(value.toLowerCase())
          )
          .map((admin) => ({
            id: admin.id,
            user: admin.fullName,
            email: admin.email,
            phoneNumber: admin.phoneNumber,
            accountStatus: "active -c",
          }));
        setRows(formattedAdmin);
        break;
      case "DENTIST_ROLE":
        const formattedDentists = dentists
          .filter((dentist) =>
            dentist.user?.fullName.toLowerCase().includes(value.toLowerCase())
          )
          .map((dentist) => ({
            id: dentist.id,
            user: dentist.user?.fullName,
            email: dentist.user?.email,
            phoneNumber: dentist.user?.phoneNumber,
            accountStatus: "active -d",
          }));

        setRows(formattedDentists);
        break;
      case "PATIENT_ROLE":
        const formatedPatient = patients
          .filter((patient) =>
            patient.user?.fullName.toLowerCase().includes(value.toLowerCase())
          )
          .map((patient) => ({
            id: patient.id,
            user: patient.user?.fullName,
            email: patient.user?.email,
            phoneNumber: patient.user?.phoneNumber,
            accountStatus: "active -d",
          }));
        setRows(formatedPatient);
        break;
      default:
        console.log(value);
        break;
    }

    console.log(`Search term: ${value}`);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCreateUserNavigation = ({ target }) => {
    navigate(`/auth/register?usertype=${target}`);
  };

  return (
    <Grid2 className="flex justify-between items-center gap-5 px-4 sm:px-8 min-w-0 flex-wrap">
      <Grid2 className="flex gap-4">
        <TextField
          value={nameInput}
          onChange={handleSearchFilter}
          id="input-with-icon-textfield"
          placeholder="User name"
          className=" w-40 md:!w-52 text-sm h-8 text-[#5A6474]"
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: ".4rem",
              height: "100%",
            },
            "& .MuiInputAdornment-root": {
              marginRight: "8px",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        {user.role === "ADMIN_ROLE" && (
          <FormControl className="!hidden md:!block">
            <InputLabel
              id="userType-label"
              sx={{
                transform: "translate(14px, 5px) scale(1)",
                "&.Mui-focused, &.MuiInputLabel-shrink": {
                  transform: "translate(14px, -9px) scale(0.75)",
                },
              }}
            >
              User type
            </InputLabel>
            <Select
              labelId="userType-label"
              id="userType"
              value={userType}
              label="User type"
              onChange={handleUserTypeChange}
              name="userType"
              className="text-sm h-8 text-[#5A6474] !rounded-[.4rem] lg:!w-[205px]"
            >
              <MenuItem value="ADMIN_ROLE">Admin</MenuItem>
              <MenuItem value="DENTIST_ROLE">Dentist</MenuItem>
              <MenuItem value="PATIENT_ROLE">Patient</MenuItem>
            </Select>
          </FormControl>
        )}
      </Grid2>
      {user.role === "ADMIN_ROLE" && (
        <Grid2 className="">
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            className={`!h-[32px] !w-4 md:!w-full !bg-[#01448A]`}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {screenSize > 1024 ? "Options" : <Settings />}
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={(e) => {
                handleClose(e);
                handleCreateUserNavigation({
                  target: "DENTIST_ROLE",
                });
              }}
              disableRipple
            >
              <AssignmentInd />
              Create Dentist
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={(e) => {
                handleClose(e);
                handleCreateUserNavigation({
                  target: "PATIENT_ROLE",
                });
              }}
              disableRipple
            >
              <FileCopyIcon />
              Create Patient
            </MenuItem>
          </StyledMenu>
        </Grid2>
      )}
    </Grid2>
  );
};
