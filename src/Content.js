import React, { useEffect } from "react";
import { onMessage } from "./service/mockServer";
import LikedSubmissions from "./components/LikedSubmissions";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingBox } from "./components/style";
import { Box } from "@mui/material";
import { ToastContainer } from "./components/Toast/index";
import { useLikedSubmissions } from "./hooks/useLikedSubmissions";
import { useToast } from "./hooks/useToast";

function Content() {
  const {
    likedSubmissions,
    loading,
    error,
    loadSubmissions,
    addSubmission,
    setError
  } = useLikedSubmissions();

  const {
    currentToast,
    isLiking,
    handleToastClose,
    handleToastLike,
    showToast
  } = useToast(addSubmission);

  useEffect(() => {
    loadSubmissions();

    const unsubscribe = onMessage((formSubmission) => {
      showToast(formSubmission);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [loadSubmissions, showToast]);

  const handleClose = () => {
    handleToastClose();
    setError(null);
  };

  const handleClearAll = async () => {
    try {
      await localStorage.clear("formSubmissions");
      await loadSubmissions();
    } catch (error) {
      console.error("Failed to refresh submissions:", error);
      setError("Failed to refresh submissions. Please try again.");
    }
  };

  return (
    <Box>
      {currentToast && (
        <ToastContainer
          open={currentToast.open}
          message={currentToast.data}
          onClose={handleClose}
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
        <LikedSubmissions 
          submissions={likedSubmissions} 
          onClearAll={handleClearAll}
        />
      )}
    </Box>
  );
}

export default Content;
