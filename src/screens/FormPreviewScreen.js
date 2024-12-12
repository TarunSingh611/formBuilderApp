// src/screens/FormPreviewScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getFormById, getFormResponses, getFormAnalytics } from '../redux/reducers/formSlice';
import FormQuestion from '../components/FormQuestion';

const FormPreviewScreen = ({ route, navigation }) => {
  const { formId } = route.params;
  const dispatch = useDispatch();
  const { currentForm, loading, responses, analytics } = useSelector(state => state.forms);
  const [userResponses, setUserResponses] = useState({});

  useEffect(() => {
    dispatch(getFormById(formId));
    dispatch(getFormResponses(formId));
    dispatch(getFormAnalytics(formId));
  }, [formId, dispatch]);

  const handleSubmit = () => {
    // Implement form submission logic
    console.log('Form responses:', userResponses);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!currentForm) {
    return (
      <View style={styles.centered}>
        <Text>Form not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{currentForm.title}</Text>
          <Text style={styles.description}>{currentForm.description}</Text>
        </View>

        <View style={styles.questions}>
          {currentForm.questions?.map((question) => (
            <FormQuestion
              key={question._id}
              question={question}
              onChange={(value) => {
                setUserResponses(prev => ({
                  ...prev,
                  [question._id]: value,
                }));
              }}
              value={userResponses[question._id]}
            />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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