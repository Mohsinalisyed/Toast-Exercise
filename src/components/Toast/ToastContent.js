import { Typography } from "@mui/material";

const ToastContent = ({ message, error }) => (
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
);
export default ToastContent;
