import { CheckBoxOutlined } from "@mui/icons-material";
import {
  Alert,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export const TimeSlotList = ({
  selectedIndex,
  handleSelect,
  dentistId,
  isLoading,
}) => {
  const { slots } = useSelector((state) => state.scheduleSlice);
  return (
    <Box className="w-full overflow-auto !h-[150px] md:!h-[350px] grow">
      <List
        className="flex flex-col gap-4  h-full w-full"
        sx={{
          padding: "0 1.6rem 0 1rem",
        }}
      >
        {dentistId === "" ? (
          <Alert severity="info">
            <Typography>
              Please select a dentist to view their available schedule.
            </Typography>
          </Alert>
        ) : isLoading ? (
          <LoadingSpinner size="50px" />
        ) : (
          <>
            <Typography className="text-[#92959E] !font-extralight md:!hidden">
              Select a slot
            </Typography>
            {slots && slots.length > 0 ? (
              slots.map((day, index) => (
                <ListItem key={index} disablePadding className="!w-full">
                  <motion.div
                    initial={{ width: 138 }}
                    animate={{
                      width: selectedIndex === index ? 182 : 182,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="!w-full flex justify-center"
                  >
                    <ListItemButton
                      onClick={() => handleSelect(day.start, day.end, index)}
                      className="!text-sm w-full"
                      sx={{
                        backgroundColor:
                          selectedIndex === index ? "#0B6911" : "#fff",
                        color: selectedIndex === index ? "#fff" : "#4285CB",
                        border: `2px solid ${
                          selectedIndex === index ? "#0B6911" : "#4285CB"
                        }`,
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        borderRadius: "1rem",
                        textTransform: "none",
                        display: "flex",
                        alignItems: "center",
                        padding: ".2rem 1.7rem",
                        transition: "all 0.3s",
                        textAlign: "center",
                        gap:"0.5rem",
                        "&:hover": {
                          backgroundColor: "#4285CB",
                          color: "#fff",
                        },
                      }}
                    >
                      <ListItemText primary={`${day.start}-${day.end}`} />
                      {selectedIndex === index && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            duration: 0.1,
                            ease: "easeOut",
                          }}
                        >
                          <CheckBoxOutlined />
                        </motion.span>
                      )}
                    </ListItemButton>
                  </motion.div>
                </ListItem>
              ))
            ) : (
              <Alert severity="warning">
                <Typography>No available schedule for this dentist</Typography>
              </Alert>
            )}{" "}
          </>
        )}
      </List>
    </Box>
  );
};
