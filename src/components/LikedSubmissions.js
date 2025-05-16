import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function LikedSubmissions({ submissions }) {
  if (!submissions || submissions.length === 0) {
    return (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6" color="text.secondary">
          No liked submissions yet
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Liked Submissions
      </Typography>
      <List>
        {submissions.map((submission) => (
          <ListItem key={submission.id}>
            <ListItemText
              primary={`${submission.data.firstName} ${submission.data.lastName}`}
              secondary={submission.data.email}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default LikedSubmissions; 