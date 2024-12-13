// src/screens/FormPreviewScreen.js
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { submitFormResponse } from '../redux/reducers/formSlice';
import FormQuestion from '../components/FormQuestion';
import LoadingSpinner from '../components/common/LoadingSpinner';

const FormPreviewScreen = ({ route, navigation }) => {
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();

  const validateResponses = () => {
    const requiredQuestions = currentForm.questions.filter(q => q.required);
    const missingRequired = requiredQuestions.find(q => !responses[q._id]);
    
    if (missingRequired) {
      Alert.alert('Error', 'Please answer all required questions');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateResponses()) return;
    
    setIsSubmitting(true);
    try {
      await dispatch(submitFormResponse({
        formId: currentForm._id,
        responses
      })).unwrap();
      
      Alert.alert('Success', 'Form submitted successfully', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveProgress = async () => {
    try {
      await AsyncStorage.setItem(
        `form_progress_${currentForm._id}`,
        JSON.stringify(responses)
      );
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  };

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const saved = await AsyncStorage.getItem(`form_progress_${currentForm._id}`);
        if (saved) {
          setResponses(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    };
    loadProgress();
  }, [currentForm._id]);

  useEffect(() => {
    const answered = Object.keys(responses).length;
    const total = currentForm.questions.length;
    setProgress((answered / total) * 100);
    saveProgress();
  }, [responses]);

  if (isSubmitting) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <ProgressBar progress={progress} />
      <ScrollView>
        {currentForm.questions.map((question) => (
          <FormQuestion
            key={question._id}
            question={question}
            value={responses[question._id]}
            onChange={(value) => {
              setResponses(prev => ({
                ...prev,
                [question._id]: value
              }));
            }}
            isPreview={true}
          />
        ))}
      </ScrollView>
      <SubmitButton 
        onPress={handleSubmit}
        disabled={isSubmitting}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  questions: {
    padding: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FormPreviewScreen;