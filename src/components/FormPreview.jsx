// mobile/src/components/FormPreview.js  
import React, { useState } from 'react';  
import {  
  View,  
  Text,  
  ScrollView,  
  TextInput,  
  TouchableOpacity,  
  Image,  
  Alert,  
} from 'react-native';  
import { useDispatch } from 'react-redux';  
import { submitFormResponse } from '../store/actions/formActions';  
import { CheckBox } from 'react-native-elements';  

const FormPreview = ({ form, onSubmit }) => {  
  const [responses, setResponses] = useState({});  
  const dispatch = useDispatch();  

  const handleSubmit = async () => {  
    try {  
      // Validate required fields  
      const missingRequired = form.questions  
        .filter(q => q.required)  
        .find(q => !responses[q.id]);  

      if (missingRequired) {  
        Alert.alert('Error', 'Please answer all required questions');  
        return;  
      }  

      await dispatch(submitFormResponse(form.id, responses));  
      onSubmit();  
      Alert.alert('Success', 'Form submitted successfully');  
    } catch (error) {  
      Alert.alert('Error', error.message);  
    }  
  };  

  const renderQuestion = (question) => {  
    switch (question.type) {  
      case 'text':  
        return (  
          <TextInput  
            style={styles.textInput}  
            placeholder="Your answer"  
            value={responses[question.id]}  
            onChangeText={(text) =>  
              setResponses({ ...responses, [question.id]: text })  
            }  
            multiline  
          />  
        );  

      case 'checkbox':  
        return (  
          <View>  
            {question.options.map((option, index) => (  
              <CheckBox  
                key={index}  
                title={option}  
                checked={  
                  responses[question.id]  
                    ? responses[question.id].includes(option)  
                    : false  
                }  
                onPress={() => {  
                  const currentResponses = responses[question.id] || [];  
                  const newResponses = currentResponses.includes(option)  
                    ? currentResponses.filter((item) => item !== option)  
                    : [...currentResponses, option];  
                  setResponses({ ...responses, [question.id]: newResponses });  
                }}  
              />  
            ))}  
          </View>  
        );  

      case 'grid':  
        return (  
          <View style={styles.gridContainer}>  
            {[1, 2, 3, 4, 5].map((value) => (  
              <TouchableOpacity  
                key={value}  
                style={[  
                  styles.gridItem,  
                  responses[question.id] === value && styles.gridItemSelected,  
                ]}  
                onPress={() =>  
                  setResponses({ ...responses, [question.id]: value })  
                }  
              >  
                <Text style={styles.gridItemText}>{value}</Text>  
              </TouchableOpacity>  
            ))}  
          </View>  
        );  

      default:  
        return null;  
    }  
  };  

  return (  
    <ScrollView style={styles.container}>  
      {form.headerImage && (  
        <Image source={{ uri: form.headerImage }} style={styles.headerImage} />  
      )}  

      <Text style={styles.title}>{form.title}</Text>  

      {form.questions.map((question, index) => (  
        <View key={question.id} style={styles.questionContainer}>  
          <Text style={styles.questionText}>  
            {index + 1}. {question.question}  
            {question.required && <Text style={styles.required}> *</Text>}  
          </Text>  

          {question.image && (  
            <Image  
              source={{ uri: question.image }}  
              style={styles.questionImage}  
            />  
          )}  

          {renderQuestion(question)}  
        </View>  
      ))}  

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>  
        <Text style={styles.submitButtonText}>Submit</Text>  
      </TouchableOpacity>  
    </ScrollView>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#fff',  
  },  
  headerImage: {  
    width: '100%',  
    height: 200,  
  },  
  title: {  
    fontSize: 24,  
    fontWeight: 'bold',  
    padding: 20,  
  },  
  questionContainer: {  
    padding: 20,  
    borderBottomWidth: 1,  
    borderBottomColor: '#eee',  
  },  
  questionText: {  
    fontSize: 16,  
    marginBottom: 10,  
  },  
  required: {  
    color: 'red',  
  },  
  questionImage: {  
    width: '100%',  
    height: 150,  
    borderRadius: 8,  
    marginBottom: 10,  
  },  
  textInput: {  
    borderWidth: 1,  
    borderColor: '#ddd',  
    borderRadius: 8,  
    padding: 10,  
    minHeight: 100,  
  },  
  gridContainer: {  
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    marginTop: 10,  
  },  
  gridItem: {  
    width: 40,  
    height: 40,  
    borderRadius: 20,  
    backgroundColor: '#f5f5f5',  
    justifyContent: 'center',  
    alignItems: 'center',  
  },  
  gridItemSelected: {  
    backgroundColor: '#007AFF',  
  },  
  gridItemText: {  
    fontSize: 16,  
    color: '#333',  
  },  
  submitButton: {  
    backgroundColor: '#007AFF',  
    padding: 15,  
    margin: 20,  
    borderRadius: 10,  
    alignItems: 'center',  
  },  
  submitButtonText: {  
    color: '#fff',  
    fontSize: 16,  
    fontWeight: 'bold',  
  },  
});  

export default FormPreview;  