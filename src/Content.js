import React, { useState, useEffect, useCallback } from "react";
import {
  onMessage,
  fetchLikedFormSubmissions,
  saveLikedFormSubmission,
} from "./service/mockServer";
import LikedSubmissions from "./components/LikedSubmissions";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingBox } from "./components/style";
import { Box } from "@mui/material";
import { ToastContainer } from "./components/Toast/index";

function Content() {
  const [currentToast, setCurrentToast] = useState(null);
  const [likedSubmissions, setLikedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [error, setError] = useState(null);

  const loadLikedSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchLikedFormSubmissions();
      if (response.status === 200) {
        setLikedSubmissions(response.formSubmissions);
        setError(null);
      } else {
        setError("Failed to load submissions. Please try again.");
      }
    } catch (error) {
      console.error("Failed to load liked submissions:", error);
      setError("Failed to load submissions. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLikedSubmissions();

    const unsubscribe = onMessage((formSubmission) => {
      setCurrentToast({
        ...formSubmission,
        open: true,
      });
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [loadLikedSubmissions]);

  const handleToastClose = () => {
    setCurrentToast(null);
    setError(null);
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
          liked: true,
        },
      };

      const response = await saveLikedFormSubmission(updatedSubmission);
      if (response.status === 500) {
        setError("Failed to save submission. Please try again.");
        return;
      }

      setLikedSubmissions((prev) => [...prev, updatedSubmission]);
      setCurrentToast(null);
    } catch (error) {
      console.error("Failed to save liked submission:", error);
      setError("Failed to save submission. Please try again.");
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Box>
      {currentToast && (
        <ToastContainer
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
