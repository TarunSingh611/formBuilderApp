// mobile/src/screens/WelcomeScreen.js  
import React from 'react';  
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';  

const WelcomeScreen = ({ navigation }) => {  
  return (  
    <View style={styles.container}>  
      <Text style={styles.title}>Welcome to Form Builder</Text>  
      <TouchableOpacity   
        style={styles.button}  
        onPress={() => navigation.navigate('Login')}  
      >  
        <Text style={styles.buttonText}>Sign In</Text>  
      </TouchableOpacity>  
      <TouchableOpacity   
        style={[styles.button, styles.secondaryButton]}  
        onPress={() => navigation.navigate('Register')}  
      >  
        <Text style={styles.secondaryButtonText}>Create Account</Text>  
      </TouchableOpacity>  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    padding: 20,  
    backgroundColor: '#ffffff',  
  },  
  title: {  
    fontSize: 24,  
    fontWeight: 'bold',  
    marginBottom: 30,  
    color: '#1f2937',  
  },  
  button: {  
    width: '100%',  
    padding: 15,  
    borderRadius: 8,  
    backgroundColor: '#6366f1',  
    marginBottom: 10,  
  },  
  buttonText: {  
    color: '#ffffff',  
    textAlign: 'center',  
    fontSize: 16,  
    fontWeight: '600',  
  },  
  secondaryButton: {  
    backgroundColor: 'transparent',  
    borderWidth: 1,  
    borderColor: '#6366f1',  
  },  
  secondaryButtonText: {  
    color: '#6366f1',  
    textAlign: 'center',  
    fontSize: 16,  
    fontWeight: '600',  
  },  
});  

export default WelcomeScreen;  