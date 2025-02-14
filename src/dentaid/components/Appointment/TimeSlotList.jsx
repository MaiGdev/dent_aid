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
import { CheckBoxOutlined } from "@mui/icons-material";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export const TimeSlotList = ({
  slots,
  selectedIndex,
  handleSelect,
  dentistId,
  isLoading,
}) => {
  return (
    <Box sx={{ overflowY: "auto", maxHeight: "350px" }}>
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          padding: "0 1.6rem 0 1rem",
          height: "100%",
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
        ) : slots && slots.length > 0 ? (
          slots.map((day, index) => (
            <ListItem key={index} disablePadding>
              <motion.div
                initial={{ width: 138 }}
                animate={{
                  width: selectedIndex === index ? 182 : 182,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ListItemButton
                  onClick={() => handleSelect(day.start, day.end, index)}
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
        )}
      </List>
    </Box>
  );
};
