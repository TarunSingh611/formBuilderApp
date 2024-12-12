// frontend/src/components/QuestionBuilder.js  
import React from 'react';  
import { View } from 'react-native';  
import { Input, Button, CheckBox, Text } from 'react-native-elements';  
// import { QuestionTypeSelector } from './QuestionTypeSelector';  
import { styles } from '../styles';  

export const QuestionBuilder = ({ question, onUpdate, onDelete }) => {  
  const handleTypeChange = (type) => {  
    onUpdate({ ...question, type });  
  };  

  const handleOptionsChange = (options) => {  
    onUpdate({ ...question, options });  
  };  

  return (  
    <View style={styles.questionContainer}>  
      <Input  
        placeholder="Question Title"  
        value={question.title}  
        onChangeText={(text) => onUpdate({ ...question, title: text })}  
      />  

      {/* <QuestionTypeSelector  
        selectedType={question.type}  
        onTypeSelect={handleTypeChange}  
      />   */}

      {['CheckBox', 'Radio', 'Grid'].includes(question.type) && (  
        <OptionsBuilder  
          options={question.options}  
          onChange={handleOptionsChange}  
        />  
      )}  

      {question.type === 'Grid' && (  
        <GridOptionsBuilder  
          rows={question.rows}  
          columns={question.columns}  
          onChange={(updates) => onUpdate({ ...question, ...updates })}  
        />  
      )}  

      <CheckBox  
        title="Required"  
        checked={question.required}  
        onPress={() => onUpdate({ ...question, required: !question.required })}  
      />  

      <Button  
        title="Delete Question"  
        icon={{ name: 'delete', color: 'white' }}  
        onPress={onDelete}  
        buttonStyle={styles.deleteButton}  
      />  
    </View>  
  );  
};  