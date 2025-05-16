import React, { useState, useEffect } from 'react';
import { onMessage, fetchLikedFormSubmissions, saveLikedFormSubmission } from './service/mockServer';
import Toast from './components/Toast';
import LikedSubmissions from './components/LikedSubmissions';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingBox } from './components/style';
import { Box } from '@mui/material';

function Content() {
  const [currentToast, setCurrentToast] = useState(null);
  const [likedSubmissions, setLikedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load liked submissions on mount
    loadLikedSubmissions();

    // Subscribe to new form submissions
    onMessage((formSubmission) => {
      setCurrentToast({
        ...formSubmission,
        open: true
      });
    });
  }, []);

  const loadLikedSubmissions = async () => {
    try {
      const response = await fetchLikedFormSubmissions();
      if (response.status === 200) {
        setLikedSubmissions(response.formSubmissions);
      }
    } catch (error) {
      console.error('Failed to load liked submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToastClose = () => {
    setCurrentToast(null);
  };

  const handleToastLike = async () => {
    if (!currentToast || isLiking) return;

    try {
      setIsLiking(true);
      setError(null);
      const updatedSubmission = {
        ...currentToast,
        data: {
          ...currentToast.data,
          liked: true
        }
      };

      const response = await saveLikedFormSubmission(updatedSubmission);
      if (response.status === 500) {
        setError('Failed to save submission. Please try again.');
        return;
      }
      
      setLikedSubmissions([...likedSubmissions, updatedSubmission]);
      setCurrentToast(null);
    } catch (error) {
      console.error('Failed to save liked submission:', error);
      setError('Failed to save submission. Please try again.');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Box>
      {currentToast && (
        <Toast
          open={currentToast.open}
          message={currentToast.data}
          onClose={handleToastClose}
          onLike={handleToastLike}
          isLiked={currentToast.data.liked}
          isLoading={isLiking}
          error={error}
        />
      )}
      {loading ? (
        <LoadingBox>
          <CircularProgress />
        </LoadingBox>
      ) : (
        <LikedSubmissions submissions={likedSubmissions} />
      )}
    </Box>
  );
}

export default Content;
