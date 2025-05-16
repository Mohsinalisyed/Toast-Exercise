import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Typography, Button } from '@mui/material';

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
          <Box display="flex" gap={4}>
            {isLoading ? (
              <Box sx={{pr:"12px"}}>
                <CircularProgress size={20} />
              </Box>
            ) : (
              <>
                {error ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={onLike}
                    sx={{
                      backgroundColor: 'white',
                      color: '#d32f2f',
                      '&:hover': {
                        backgroundColor: '#f5f5f5',
                      },
                    }}
                  >
                    Try Again
                  </Button>
                ) : (
                  <IconButton
                    size="small"
                    aria-label="like"
                    onClick={onLike}
                    color="primary"
                  >
                    LIKE
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={onClose}
                  sx={{
                    color: "white",
                    pt: "2px",
                    pr: "10px",
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </>
            )}
          </Box>
        }
      >
        <div>
          <Typography variant="body1" color="white">
            {message.firstName} {message.lastName}
          </Typography>
          <Typography variant="body1" color="white">
            {message.email}
          </Typography>
          {error && (
            <Typography variant="body2" color="white" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </div>
      </Alert>
    </Snackbar>
  );
}

export default Toast; 