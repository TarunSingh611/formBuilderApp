// frontend/src/styles/index.js  
import { StyleSheet } from 'react-native';  

export const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#f5f5f5',  
  },  
  header: {  
    flexDirection: 'row',  
    justifyContent: 'space-between',  
    alignItems: 'center',  
    padding: 16,  
    backgroundColor: '#ffffff',  
    elevation: 2,  
  },  
  formList: {  
    padding: 16,  
  },  
  formCard: {  
    borderRadius: 8,  
    marginBottom: 16,  
  },  
  formDescription: {  
    marginBottom: 16,  
    color: '#666666',  
  },  
  formActions: {  
    flexDirection: 'row',  
    justifyContent: 'space-around',  
    paddingTop: 8,  
  },  
  questionContainer: {  
    backgroundColor: '#ffffff',  
    padding: 16,  
    marginBottom: 16,  
    borderRadius: 8,  
    elevation: 1,  
  },  
  addButton: {  
    backgroundColor: '#4CAF50',  
    marginVertical: 16,  
  },  
  saveButton: {  
    backgroundColor: '#2196F3',  
    marginVertical: 16,  
  },  
  deleteButton: {  
    backgroundColor: '#f44336',  
    marginTop: 8,  
  },  
  deleteText: {  
    color: '#f44336',  
  },  
});  