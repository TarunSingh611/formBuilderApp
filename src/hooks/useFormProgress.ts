// src/hooks/useFormProgress.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFormProgress = (formId:any) => {
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, [formId]);

  const loadProgress = async () => {
    try {
      setLoading(true);
      const saved = await AsyncStorage.getItem(`form_progress_${formId}`);
      if (saved) {
        setResponses(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async (newResponses: any) => {
    try {
      await AsyncStorage.setItem(
        `form_progress_${formId}`,
        JSON.stringify(newResponses)
      );
      setResponses(newResponses);
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  return {
    responses,
    loading,
    saveProgress,
  };
};