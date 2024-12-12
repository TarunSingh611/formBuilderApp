// frontend/src/screens/CreateForm.js  
import React, { useState } from 'react';  
import { View, ScrollView } from 'react-native';  
import { Input, Button, Text } from 'react-native-elements';  
import { QuestionBuilder } from '../components/QuestionBuilder';  
import { useFormBuilder } from '../hooks/useFormBuilder';  
import { styles } from '../styles';  

export const CreateFormScreen = () => {  
  const { form, addQuestion, removeQuestion, updateQuestion, saveForm, loading } = useFormBuilder();  

  return (  
    <ScrollView style={styles.container}>  
      <View style={styles.formHeader}>  
        <Input  
          placeholder="Form Title"  
          value={form.title}  
          onChangeText={(text) => updateForm({ title: text })}  
        />  
        <Input  
          placeholder="Description"  
          multiline  
          value={form.description}  
          onChangeText={(text) => updateForm({ description: text })}  
        />  
      </View>  

      {form.questions.map((question, index) => (  
        <QuestionBuilder  
          key={index}  
          question={question}  
          onUpdate={(updatedQuestion) => updateQuestion(index, updatedQuestion)}  
          onDelete={() => removeQuestion(index)}  
        />  
      ))}  

      <Button  
        title="Add Question"  
        icon={{ name: 'add', color: 'white' }}  
        onPress={() => addQuestion()}  
        buttonStyle={styles.addButton}  
      />  

      <Button  
        title="Save Form"  
        loading={loading}  
        onPress={saveForm}  
        buttonStyle={styles.saveButton}  
      />  
    </ScrollView>  
  );  
};  