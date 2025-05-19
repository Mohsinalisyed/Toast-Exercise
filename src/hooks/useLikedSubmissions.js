import { useState, useCallback } from 'react';
import { fetchLikedFormSubmissions, saveLikedFormSubmission } from '../service/mockServer';

export const useLikedSubmissions = () => {
  const [likedSubmissions, setLikedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSubmissions = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetchLikedFormSubmissions();
      if (response.status === 200) {
        setLikedSubmissions(response.formSubmissions);
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

  const addSubmission = useCallback(async (submission) => {
    try {
      const response = await saveLikedFormSubmission(submission);
      if (response.status === 500) {
        setError("Failed to save submission. Please try again.");
        return false;
      }
      setLikedSubmissions(prev => [...prev, submission]);
      return true;
    } catch (error) {
      console.error("Failed to save liked submission:", error);
      setError("Failed to save submission. Please try again.");
      return false;
    }
  }, []);

  return {
    likedSubmissions,
    loading,
    error,
    loadSubmissions,
    addSubmission,
    setError
  };
}; 