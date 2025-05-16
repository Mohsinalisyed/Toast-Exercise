import { Box, CircularProgress, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ToastActions = ({ isLoading, error, onLike, onClose }) => (
  <Box display="flex" gap={4}>
    {isLoading ? (
      <Box sx={{ pr: "12px" }}>
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
              backgroundColor: "white",
              color: "#d32f2f",
              "&:hover": {
                backgroundColor: "#f5f5f5",
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
);
export default ToastActions;