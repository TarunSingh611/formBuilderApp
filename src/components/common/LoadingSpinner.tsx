// src/components/common/LoadingSpinner.tsx  
import React from 'react';  
import { View, ActivityIndicator, StyleSheet } from 'react-native';  
  
interface LoadingSpinnerProps {  
  color?: string;  
  size?: 'small' | 'large';  
}  
  
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({  
  color = '#2196F3',  
  size = 'large',  
}) => (  
  <View style={styles.spinnerContainer}>  
    <ActivityIndicator size={size} color={color} />  
  </View>  
);  
  
const styles = StyleSheet.create({  
  spinnerContainer: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    backgroundColor: '#fff',  
  },  
});  
  
export default LoadingSpinner;  