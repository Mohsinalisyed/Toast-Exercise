import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ToastActions from "./ToastActions";
import ToastContent from "./ToastContent";
import { AlertStyled } from "../style";

function ToastContainer({
  open,
  message,
  onClose,
  onLike,
  isLoading,
  error,
  autoHideDuration = 6000,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        severity={error ? "error" : ""}
        sx={{
          ...AlertStyled,
          backgroundColor: error ? "#d32f2f" : "black",
        }}
        action={
          <ToastActions
            isLoading={isLoading}
            error={error}
            onLike={onLike}
            onClose={onClose}
          />
        }
      >
        <ToastContent message={message} error={error} />
      </Alert>
    </Snackbar>
  );
}

export default ToastContainer;
