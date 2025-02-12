import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUserStore } from "../../hooks";
import { DentAidLayout } from "../layout/DentAidLayout";

export const UserManagement = () => {
  const { admin, dentists, patients, startGetUsers } = useUserStore();
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    startGetUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "user", headerName: "User", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      flex: 2,
    },
    {
      field: "accountStatus",
      headerName: "Account status",
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 2,
      renderCell: (params) => (
        <div>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleEdit(params.row)}
            sx={{ marginRight: 1, backgroundColor: "#4285CB" }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

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
    }
  }, [dentists]);

  const paginationModel = { page: 0, pageSize: 5 };

  const [userType, setUserType] = useState("DENTIST_ROLE");

  const handleEdit = (e) => {
    navigate(`/dentaid/user/${e.id}?usertype=${userType}`);
  };

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
          user: dentist.user.fullName,
          email: dentist.user.email,
          phoneNumber: dentist.user.phoneNumber,
          accountStatus: "active -d",
        }));
        setRows(formatedDentist);
        break;
      case "PATIENT_ROLE":
        const formatedPatient = patients.map((patient) => ({
          id: patient.id,
          user: patient.user.fullName,
          email: patient.user.email,
          phoneNumber: patient.user.phoneNumber,
          accountStatus: "active -d",
        }));
        setRows(formatedPatient);
        break;
      default:
        console.log(value);
        break;
    }
  };

  return (
    <DentAidLayout>
      <Box
        sx={{
          minHeight: "100%",
          borderRadius: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          border: "1px solid #cccccc",
        }}
      >
        <Grid2
          container
          direction={"column"}
          spacing={3}
          sx={{
            /*   width: "75%", */
            backgroundColor: "#fff",
            padding: "2.5rem",
            borderRadius: "1rem",
          }}
        >
          <Grid2 xs={12}>
            <Typography variant="h1" sx={{ fontSize: "1.875rem" }}>
              User management
            </Typography>
            <Typography
              sx={{ color: "#92959E", fontSize: "14px", fontWeight: "200" }}
            >
              Information about...
            </Typography>
          </Grid2>

          <Grid2 sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid2 sx={{ display: "flex", gap: "1rem" }}>
              <TextField
                id="input-with-icon-textfield"
                placeholder="Name, email, etc..."
                sx={{
                  width: "205px",
                  fontSize: "0.875rem",
                  height: "2.063rem",
                  color: "#5A6474",
                  textAlign: "left",
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

              <FormControl sx={{ width: "205px" }}>
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
                  sx={{
                    fontSize: "0.875rem",
                    height: "2.063rem",
                    borderRadius: ".4rem",
                    color: "#5A6474",
                    textAlign: "left",
                  }}
                >
                  <MenuItem value="ADMIN_ROLE">Admin</MenuItem>
                  <MenuItem value="DENTIST_ROLE">Dentist</MenuItem>
                  <MenuItem value="PATIENT_ROLE">Patient</MenuItem>
                </Select>
              </FormControl>
            </Grid2>
            <Grid2>
              <Button
                fullWidth
                sx={{
                  backgroundColor: "#01448A",
                  color: "white",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  borderRadius: ".5rem",
                  textTransform: "none",

                  "&:hover": {
                    backgroundColor: "#4A5D72",
                  },
                }}
              >
                New
              </Button>
            </Grid2>
          </Grid2>

          <Divider />

          <Grid2>
            <Grid2
              sx={{
                width: "100%",
                height: "18px",
                backgroundColor: "#333333",
                borderTopLeftRadius: "1rem",
                borderTopRightRadius: "1rem",
              }}
            />
            <Paper
              sx={{
                height: 450,
                width: "900px",
                border: "1px solid #cccccc",
                borderRadius: 0,
              }}
            >
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                /*  checkboxSelection */
                sx={{ border: 0, borderRadius: 0 }}
              />
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </DentAidLayout>
  );
};
