// frontend/src/screens/Home.js  
import React from 'react';  
import { View, ScrollView, TouchableOpacity } from 'react-native';  
import { useNavigation } from '@react-navigation/native';  
import { Text, Card, Button, Icon } from 'react-native-elements';  
import { useForms } from '../hooks/useForms';  
import { styles } from '../styles';  
import LoadingSpinner from '../components/common/LoadingSpinner';  

export const HomeScreen = () => {  
  const navigation = useNavigation();  
  const { forms, loading, error, deleteForm } = useForms();  

  if (loading) {  
    return <LoadingSpinner />;
  }  

  return (  
    <View style={styles.container}>  
      <View style={styles.header}>  
        <Text h4>My Forms</Text>  
        <Button  
          icon={<Icon name="add" color="#ffffff" />}  
          title="Create Form"  
          onPress={() => navigation.navigate('CreateForm')}  
        />  
      </View>  

      <ScrollView style={styles.formList}>  
        {forms.map((form) => (  
          <Card key={form._id} containerStyle={styles.formCard}>  
            <Card.Title>{form.title}</Card.Title>  
            <Card.Divider />  
            <Text style={styles.formDescription}>{form.description}</Text>  
            <View style={styles.formActions}>  
              <TouchableOpacity  
                onPress={() => navigation.navigate('FormResponses', { formId: form._id })}  
              >  
                <Icon name="bar-chart" type="font-awesome" />  
                <Text>Responses</Text>  
              </TouchableOpacity>  
              <TouchableOpacity  
                onPress={() => navigation.navigate('EditForm', { formId: form._id })}  
              >  
                <Icon name="edit" />  
                <Text>Edit</Text>  
              </TouchableOpacity>  
              <TouchableOpacity onPress={() => deleteForm(form._id)}>  
                <Icon name="delete" color="red" />  
                <Text style={styles.deleteText}>Delete</Text>  
              </TouchableOpacity>  
            </View>  
          </Card>  
        ))}  
      </ScrollView>  
    </View>  
  );  
};  