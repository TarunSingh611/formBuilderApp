// src/components/FormQuestion.js  
import React from 'react';  
import {  
  View,  
  Text,  
  TextInput,  
  StyleSheet,  
  TouchableOpacity  
} from 'react-native';  

const FormQuestion = ({ question, onChange, value }) => {  
  const renderQuestionInput = () => {  
    switch (question.type) {  
      case 'text':  
        return (  
          <TextInput  
            style={styles.textInput}  
            value={value}  
            onChangeText={onChange}  
            placeholder="Enter your answer"  
            multiline={question.multiline}  
          />  
        );  
      case 'checkbox':  
        return (  
          <TouchableOpacity  
            style={styles.checkbox}  
            onPress={() => onChange(!value)}  
          >  
            <View style={[  
              styles.checkboxInner,  
              value && styles.checkboxChecked  
            ]} />  
          </TouchableOpacity>  
        );  
      case 'grid':  
        return (  
          <View style={styles.gridContainer}>  
            {question.options.map((option, index) => (  
              <TouchableOpacity  
                key={index}  
                style={[  
                  styles.gridOption,  
                  value === option && styles.gridOptionSelected  
                ]}  
                onPress={() => onChange(option)}  
              >  
                <Text style={[  
                  styles.gridOptionText,  
                  value === option && styles.gridOptionTextSelected  
                ]}>  
                  {option}  
                </Text>  
              </TouchableOpacity>  
            ))}  
          </View>  
        );  
      default:  
        return null;  
    }  
  };  

  return (  
    <View style={styles.container}>  
      <Text style={styles.questionText}>{question.text}</Text>  
      {question.description && (  
        <Text style={styles.description}>{question.description}</Text>  
      )}  
      {renderQuestionInput()}  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    backgroundColor: 'white',  
    padding: 16,  
    borderRadius: 8,  
    marginBottom: 12,  
  },  
  questionText: {  
    fontSize: 16,  
    fontWeight: '600',  
    marginBottom: 8,  
  },  
  description: {  
    fontSize: 14,  
    color: '#666',  
    marginBottom: 12,  
  },  
  textInput: {  
    borderWidth: 1,  
    borderColor: '#ddd',  
    borderRadius: 8,  
    padding: 12,  
    fontSize: 16,  
  },  
  checkbox: {  
    width: 24,  
    height: 24,  
    borderWidth: 2,  
    borderColor: '#6366f1',  
    borderRadius: 4,  
    justifyContent: 'center',  
    alignItems: 'center',  
  },  
  checkboxInner: {  
    width: 14,  
    height: 14,  
    borderRadius: 2,  
  },  
  checkboxChecked: {  
    backgroundColor: '#6366f1',  
  },  
  gridContainer: {  
    flexDirection: 'row',  
    flexWrap: 'wrap',  
    marginTop: 8,  
    gap: 8,  
  },  
  gridOption: {  
    paddingHorizontal: 16,  
    paddingVertical: 8,  
    borderRadius: 20,  
    borderWidth: 1,  
    borderColor: '#ddd',  
  },  
  gridOptionSelected: {  
    backgroundColor: '#6366f1',  
    borderColor: '#6366f1',  
  },  
  gridOptionText: {  
    color: '#666',  
  },  
  gridOptionTextSelected: {  
    color: 'white',  
  },  
});  

export default FormQuestion;  