import { Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../hooks";
import { useScreenSize } from "../../../hooks/useScreenSize";

export const UserTable = ({ rows, userType }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const screenSize = useScreenSize();

  const baseColumns = [
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
      renderCell: (params) =>
        user.role === "ADMIN_ROLE" ? (
          <div className="flex justify-center items-center gap-2 h-full">
            <Button
              endIcon={<Edit className="!h-4" />}
              size="small"
              variant="contained"
              onClick={() => handleEdit(params.row)}
              className={`gap-1 !normal-case mr-1 bg-[#4285CB] ${
                screenSize < 600 ? "!min-w-1 !w-[25px]" : "!min-w-1"
              } `}
            >
              {screenSize > 1280 ? "Details" : ""}
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => handleDelete(params.row.id)}
              className=" !min-w-1 !w-[25px]"
            >
              <Delete className="!h-4" />
            </Button>
          </div>
        ) : (
          <div>
            <Button
              size="small"
              variant="contained"
              onClick={() => handleDetails(params.row)}
              sx={{ marginRight: 1, backgroundColor: "#4285CB" }}
            >
              Details
            </Button>
          </div>
        ),
    },
  ];

  const columns = baseColumns.filter((column) => {
    if (screenSize < 600) {
      return column.field === "user" || column.field === "actions";
    } else if (screenSize < 1024) {
      return (
        column.field === "id" ||
        column.field === "user" ||
        column.field === "email" ||
        column.field === "actions"
      );
    } else if (screenSize < 1280) {
      return (
        column.field === "id" ||
        column.field === "user" ||
        column.field === "email" ||
        column.field === "actions"
      );
    } else {
      return true;
    }
  });

  const paginationModel = { page: 0, pageSize: 5 };

  const handleEdit = (e) => {
    navigate(`/dentaid/user/${e.id}?usertype=${userType}`);
  };

  const handleDetails = (e) => {
    if (user.role === "DENTIST_ROLE") {
      navigate(
        `/dentaid/user/${e.id}?usertype=PATIENT_ROLE&view=patient-history`
      );
    } else {
      navigate(`/dentaid/user/${e.id}?usertype=PATIENT_ROLE`);
    }
  };

  return (
    <DataGrid
      className="!text-[12px] !h-[400px] !min-w-0"
      rows={rows}
      columns={columns}
      initialState={{ pagination: { paginationModel } }}
      pageSizeOptions={[5, 10]}
      sx={{ border: 0, borderRadius: 0 }}
      autoPageSize
    />
  );
};
