import { EventNote, FilterListOff, Search } from "@mui/icons-material";
import {
  Button,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useSelector } from "react-redux";

export const FilterControls = ({
  dentists,
  selectedDentist,
  selectedStatus,
  patientInput,
  selectedDate,
  handleFilterChange,
  navigator,
}) => {
  const appointmentStatus = [
    { value: "scheduled", label: "Scheduled" },
    { value: "finished", label: "Finished" },
    { value: "cancel", label: "Cancel" },
  ];

  const { user } = useSelector((state) => state.authSlice);

  return (
    <Grid2 className="flex justify-between gap-4 !flex-wrap ">
      <Grid2 className="flex gap-4 justify-center items-center grow">
        {user.role !== "DENTIST_ROLE" && (
          <FormControl className="w-full !hidden sm:!flex">
            <InputLabel
              id="user-select-label"
              sx={{
                transform: "translate(14px, 5px) scale(1)",
                transition: "all 0.2s ease-in-out",
                "&.Mui-focused, &.MuiInputLabel-shrink": {
                  transform: "translate(14px, -8px) scale(0.75)",
                },
              }}
            >
              Dentist
            </InputLabel>
            <Select
              labelId="user-select-label"
              id="demo-simple-select"
              value={selectedDentist}
              onChange={(e) => {
                handleFilterChange({
                  target: {
                    name: "user-select",
                    value: e.target.value,
                  },
                });
              }}
              sx={{
                fontSize: "0.875rem",
                height: "2.063rem",
                borderRadius: ".4rem",
                color: "#5A6474",
                textAlign: "left",
                "& .MuiInputLabel-root": {
                  transform: "translate(14px, 5px) scale(1) !important",
                  "&.Mui-focused, &.MuiInputLabel-shrink": {
                    transform: "translate(14px, -8px) scale(0.75) !important",
                  },
                },
              }}
              label="Dentist"
            >
              {dentists.map((dentist) => (
                <MenuItem key={dentist.id} value={dentist.id}>
                  {dentist.user.fullName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        <FormControl className="w-full !hidden sm:!flex">
          <InputLabel
            id="status-select-label"
            sx={{
              transform: "translate(14px, 5px) scale(1)",
              transition: "all 0.2s ease-in-out",
              "&.Mui-focused, &.MuiInputLabel-shrink": {
                transform: "translate(14px, -8px) scale(0.75)",
              },
            }}
          >
            Status
          </InputLabel>
          <Select
            labelId="status-select-label"
            id="demo-simple-select"
            value={selectedStatus}
            onChange={(e) => {
              handleFilterChange({
                target: {
                  name: "status-select",
                  value: e.target.value,
                },
              });
            }}
            className="text-sm h-8 !rounded-lg text-[#5A6474] text-left"
            label="Status"
          >
            {appointmentStatus.map((status, index) => (
              <MenuItem key={status.value} value={status.value}>
                {status.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {user.role !== "PATIENT_ROLE" && (
          <TextField
            id="input-with-icon-textfield"
            placeholder="Patient"
            value={patientInput}
            onChange={(e) => {
              handleFilterChange({
                target: {
                  name: "patient-input",
                  value: e.target.value,
                },
              });
            }}
            className="text-sm h-8 text-[#5A6474] text-left w-full"
            sx={{
              "& .MuiInputBase-root": {
                borderRadius: ".4rem",
                height: "100%",
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              handleFilterChange({
                target: {
                  name: "date-select",
                  value: date,
                },
              });
            }}
            className="w-full !hidden 2xl:!block"
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "0.875rem",
                height: "2.063rem",
                borderRadius: ".5rem",
                textAlign: "left",
               /*  width: "140px", */
                paddingRight: "8px",
              },
              "& .MuiInputLabel-root": {
                transform: "translate(14px, 5px) scale(1)",
                whiteSpace: "nowrap",
                width: "fit-content",
                "&.Mui-focused, &.MuiInputLabel-shrink": {
                  transform: "translate(10px, -8px) scale(0.75) !important",
                },
              },
              "& .MuiInputBase-input": {
                width: "100%",
              },
            }}
            label="Date"
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          disableElevation
          onClick={() =>
            handleFilterChange({
              target: {
                name: "clear",
              },
            })
          }
          className="!bg-white !text-[#B72F2F] !rounded-[7px] !outline-2 !outline-[#B72F2F] gap-2 px-2.5  h-[33px] hover:!bg-[#B72F2F] hover:!text-white !normal-case !p-0 !min-w-0 w-30  2xl:!w-full 2xl:!px-2"
          endIcon={<FilterListOff />}
        >
          <span className="hidden 2xl:block"> Clear filters</span>
        </Button>
      </Grid2>

     
        <Button
          onClick={() => {
            navigator("/dentaid/appointments/847623985");
          }}
          startIcon={<EventNote />}
          className="!bg-[#01448A] !text-white !text-sm !rounded-[7px] !font-semibold !normal-case hover:!bg-white hover:!text-[#01448A] h-[35px] gap-2 hover:!outline-2 hover:!outline-[#01448A] w-full md:w-fit"
        >
          Add
        </Button>
     
    </Grid2>
  );
};
