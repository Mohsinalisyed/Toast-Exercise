import { useState, useCallback } from 'react';

export const useToast = (onLike) => {
  const [currentToast, setCurrentToast] = useState(null);
  const [isLiking, setIsLiking] = useState(false);

  const handleToastClose = useCallback(() => {
    setCurrentToast(null);
  }, []);

  const handleToastLike = useCallback(async () => {
    if (!currentToast || isLiking) return;

    try {
      setIsLiking(true);
      const updatedSubmission = {
        ...currentToast,
        data: {
          ...currentToast.data,
          liked: true,
        },
      };

      const success = await onLike(updatedSubmission);
      if (success) {
        setCurrentToast(null);
      }
    } finally {
      setIsLiking(false);
    }
  }, [currentToast, isLiking, onLike]);

  const showToast = useCallback((submission) => {
    setCurrentToast({
      ...submission,
      open: true,
    });
  }, []);

  return {
    currentToast,
    isLiking,
    handleToastClose,
    handleToastLike,
    showToast
  };
}; 