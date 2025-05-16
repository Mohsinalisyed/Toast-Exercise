import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ToastActions from './ToastActions';
import ToastContent from './ToastContent';




function Toast({ 
  open, 
  message, 
  onClose, 
  onLike, 
  isLoading,
  error,
  autoHideDuration = 6000 
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
          minHeight: "80px",
          minWidth: "400px",
          display: "flex",
          backgroundColor: error ? "#d32f2f" : "black",
          color: "white",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
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

export default Toast; 