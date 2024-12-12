// src/screens/FormResponsesScreen.js  
import React, { useEffect } from 'react';  
import {  
  View,  
  Text,  
  FlatList,  
  StyleSheet,  
  TouchableOpacity,  
  ActivityIndicator  
} from 'react-native';  
import { useSelector, useDispatch } from 'react-redux';  
import { getFormResponses } from '../redux/reducers/formSlice';  

const ResponseCard = ({ response }) => (  
  <View style={styles.responseCard}>  
    <View style={styles.responseHeader}>  
      <Text style={styles.responseDate}>  
        {new Date(response.createdAt).toLocaleDateString()}  
      </Text>  
      <Text style={styles.responseId}>ID: {response._id}</Text>  
    </View>  
    {Object.entries(response.answers).map(([questionId, answer]) => (  
      <View key={questionId} style={styles.answerItem}>  
        <Text style={styles.questionText}>{answer.questionText}</Text>  
        <Text style={styles.answerText}>{answer.value}</Text>  
      </View>  
    ))}  
  </View>  
);  

const FormResponsesScreen = ({ route }) => {  
  const { formId } = route.params;  
  const dispatch = useDispatch();  
  const { responses, loading } = useSelector(state => state.form);  

  useEffect(() => {  
    dispatch(getFormResponses(formId));  
  }, [formId]);  

  if (loading) {  
    return (  
      <View style={styles.centered}>  
        <ActivityIndicator size="large" color="#6366f1" />  
      </View>  
    );  
  }  

  return (  
    <View style={styles.container}>  
      <FlatList  
        data={responses}  
        renderItem={({ item }) => <ResponseCard response={item} />}  
        keyExtractor={item => item._id}  
        contentContainerStyle={styles.listContainer}  
        ListEmptyComponent={() => (  
          <View style={styles.emptyState}>  
            <Text style={styles.emptyStateText}>No responses yet</Text>  
          </View>  
        )}  
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
  listContainer: {  
    padding: 16,  
  },  
  responseCard: {  
    backgroundColor: 'white',  
    borderRadius: 8,  
    padding: 16,  
    marginBottom: 12,  
    elevation: 2,  
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 2 },  
    shadowOpacity: 0.1,  
    shadowRadius: 4,  
  },  
  responseHeader: {  
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    marginBottom: 12,  
    paddingBottom: 8,  
    borderBottomWidth: 1,  
    borderBottomColor: '#eee',  
  },  
  responseDate: {  
    fontSize: 14,  
    color: '#666',  
  },  
  responseId: {  
    fontSize: 12,  
    color: '#999',  
  },  
  answerItem: {  
    marginBottom: 8,  
  },  
  questionText: {  
    fontSize: 14,  
    fontWeight: '600',  
    marginBottom: 4,  
  },  
  answerText: {  
    fontSize: 14,  
    color: '#666',  
  },   
  emptyState: {  
    alignItems: 'center',  
    justifyContent: 'center',  
    padding: 20,  
  },  
  emptyStateText: {  
    fontSize: 16,  
    color: '#666',  
  },  
});  

export default FormResponsesScreen;  