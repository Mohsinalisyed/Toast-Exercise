import React, { useEffect, useRef } from "react";
import { ListItemText, Typography, Box, useTheme, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import {
  StyledPaper,
  StyledListItem,
  StyledAvatar,
  StyledList,
} from "./style.js";

function LikedSubmissions({ submissions, onClearAll }) {
  const theme = useTheme();
  const listRef = useRef(null);
  const lastItemRef = useRef(null);

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [submissions]);

  if (!submissions.length) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <Typography variant="h6" color="textSecondary">
          No liked submissions yet
        </Typography>
      </Box>
    );
  }

  return (
    <StyledPaper elevation={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: theme.palette.primary.main,
          }}
        >
          Liked Submissions
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteSweepIcon />}
          onClick={onClearAll}
          size="small"
        >
          Clear All
        </Button>
      </Box>
      <StyledList ref={listRef}>
        {submissions.map((submission, index) => (
          <StyledListItem
            key={submission.id}
            ref={index === submissions.length - 1 ? lastItemRef : null}
          >
            <StyledAvatar>
              <PersonIcon />
            </StyledAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: theme.palette.text.primary }}
                >
                  {submission.data.firstName} {submission.data.lastName}
                </Typography>
              }
              secondary={
                <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                  <EmailIcon
                    sx={{
                      fontSize: "1rem",
                      mr: 1,
                      color: theme.palette.text.secondary,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {submission.data.email}
                  </Typography>
                </Box>
              }
            />
          </StyledListItem>
        ))}
      </StyledList>
    </StyledPaper>
  );
}

export default LikedSubmissions;
