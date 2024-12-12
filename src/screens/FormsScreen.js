// src/screens/FormsScreen.js  
import React from 'react';  
import {  
  View,  
  Text,  
  FlatList,  
  StyleSheet,  
  TouchableOpacity,  
  RefreshControl  
} from 'react-native';  
import { useSelector, useDispatch } from 'react-redux';  
import { fetchForms } from '../redux/reducers/formSlice';  

const FormCard = ({ form, onPress }) => (  
  <TouchableOpacity style={styles.card} onPress={onPress}>  
    <Text style={styles.cardTitle}>{form.title}</Text>  
    <Text style={styles.cardDescription}>{form.description}</Text>  
    <View style={styles.cardFooter}>  
      <Text style={styles.cardDate}>  
        Created: {new Date(form.createdAt).toLocaleDateString()}  
      </Text>  
      <Text style={styles.cardResponses}>  
        {form.responses?.length || 0} responses  
      </Text>  
    </View>  
  </TouchableOpacity>  
);  

const FormsScreen = ({ navigation }) => {  
  const dispatch = useDispatch();  
  const { forms, loading } = useSelector(state => state.form);  
  const [refreshing, setRefreshing] = React.useState(false);  

  const onRefresh = React.useCallback(() => {  
    setRefreshing(true);  
    dispatch(fetchForms()).finally(() => setRefreshing(false));  
  }, [dispatch]);  

  React.useEffect(() => {  
    dispatch(fetchForms());  
  }, [dispatch]);  

  const renderEmptyState = () => (  
    <View style={styles.emptyState}>  
      <Text style={styles.emptyStateText}>No forms created yet</Text>  
      <TouchableOpacity   
        style={styles.createButton}  
        onPress={() => navigation.navigate('Create')}  
      >  
        <Text style={styles.createButtonText}>Create your first form</Text>  
      </TouchableOpacity>  
    </View>  
  );  

  return (  
    <View style={styles.container}>  
      <FlatList  
        data={forms}  
        renderItem={({ item }) => (  
          <FormCard  
            form={item}  
            onPress={() => navigation.navigate('FormPreview', { formId: item._id })}  
          />  
        )}  
        keyExtractor={item => item._id}  
        contentContainerStyle={styles.listContainer}  
        refreshControl={  
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />  
        }  
        ListEmptyComponent={renderEmptyState()}  
      />  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#f5f5f5',  
  },  
  listContainer: {  
    padding: 16,  
  },  
  card: {  
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
  cardTitle: {  
    fontSize: 18,  
    fontWeight: 'bold',  
    marginBottom: 8,  
  },  
  cardDescription: {  
    fontSize: 14,  
    color: '#666',  
    marginBottom: 12,  
  },  
  cardFooter: {  
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    borderTopWidth: 1,  
    borderTopColor: '#eee',  
    paddingTop: 8,  
  },  
  cardDate: {  
    fontSize: 12,  
    color: '#999',  
  },  
  cardResponses: {  
    fontSize: 12,  
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
    marginBottom: 16,  
  },  
  createButton: {  
    backgroundColor: '#6366f1',  
    paddingHorizontal: 20,  
    paddingVertical: 10,  
    borderRadius: 8,  
  },  
  createButtonText: {  
    color: 'white',  
    fontWeight: '600',  
  },  
});  

export default FormsScreen;  