// src/screens/LoginScreen.js  
import React, { useState } from 'react';  
import {  
  View,  
  Text,  
  TextInput,  
  TouchableOpacity,  
  StyleSheet,  
  KeyboardAvoidingView,  
  Platform,  
  Alert,  
  Image  
} from 'react-native';  
import { useDispatch, useSelector } from 'react-redux';  
import { loginUser as login } from '../redux/reducers/authSlice';  
import Icon from 'react-native-vector-icons/Ionicons';  

const LoginScreen = ({ navigation }) => {  
  const dispatch = useDispatch();  
  const [formData, setFormData] = useState({  
    email: '',  
    password: '',  
  });  
  const [showPassword, setShowPassword] = useState(false);  
  const [errors, setErrors] = useState({});  
  const { loading } = useSelector(state => state.auth);  

  const validateForm = () => {  
    const newErrors = {};  
    if (!formData.email) {  
      newErrors.email = 'Email is required';  
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {  
      newErrors.email = 'Email is invalid';  
    }  
    if (!formData.password) {  
      newErrors.password = 'Password is required';  
    }  
    setErrors(newErrors);  
    return Object.keys(newErrors).length === 0;  
  };  

  const handleLogin = async () => {  
    if (validateForm()) {  
      try {  
        await dispatch(login(formData));  
      } catch (error) {  
        Alert.alert(  
          'Login Failed',  
          error.message || 'Please check your credentials and try again'  
        );  
      }  
    }  
  };  

  return (  
    <KeyboardAvoidingView   
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  
      style={styles.container}  
    >  
      <View style={styles.content}>  
        {/* Logo or App Name */}  
        <View style={styles.header}>  
          <Text style={styles.title}>Welcome Back</Text>  
          <Text style={styles.subtitle}>Sign in to continue</Text>  
        </View>  

        {/* Login Form */}  
        <View style={styles.form}>  
          <View style={styles.inputContainer}>  
            <Icon name="mail-outline" size={20} color="#666" style={styles.inputIcon} />  
            <TextInput  
              style={styles.input}  
              placeholder="Email"  
              value={formData.email}  
              onChangeText={(text) => {  
                setFormData(prev => ({ ...prev, email: text }));  
                if (errors.email) setErrors(prev => ({ ...prev, email: '' }));  
              }}  
              keyboardType="email-address"  
              autoCapitalize="none"  
              autoComplete="email"  
            />  
          </View>  
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}  

          <View style={styles.inputContainer}>  
            <Icon name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />  
            <TextInput  
              style={[styles.input, styles.passwordInput]}  
              placeholder="Password"  
              value={formData.password}  
              onChangeText={(text) => {  
                setFormData(prev => ({ ...prev, password: text }));  
                if (errors.password) setErrors(prev => ({ ...prev, password: '' }));  
              }}  
              secureTextEntry={!showPassword}  
            />  
            <TouchableOpacity   
              style={styles.passwordToggle}  
              onPress={() => setShowPassword(!showPassword)}  
            >  
              <Icon   
                name={showPassword ? "eye-off-outline" : "eye-outline"}   
                size={20}   
                color="#666"   
              />  
            </TouchableOpacity>  
          </View>  
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}  

          <TouchableOpacity   
            style={styles.forgotPassword}  
            onPress={() => navigation.navigate('ForgotPassword')}  
          >  
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>  
          </TouchableOpacity>  

          <TouchableOpacity   
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}  
            onPress={handleLogin}  
            disabled={loading}  
          >  
            {loading ? (  
              <ActivityIndicator color="white" />  
            ) : (  
              <Text style={styles.loginButtonText}>Login</Text>  
            )}  
          </TouchableOpacity>  
        </View>  

        {/* Register Link */}  
        <View style={styles.footer}>  
          <Text style={styles.footerText}>Don't have an account? </Text>  
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>  
            <Text style={styles.registerLink}>Sign Up</Text>  
          </TouchableOpacity>  
        </View>  
      </View>  
    </KeyboardAvoidingView>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#f8fafc',  
  },  
  content: {  
    flex: 1,  
    padding: 20,  
    justifyContent: 'center',  
  },  
  header: {  
    alignItems: 'center',  
    marginBottom: 40,  
  },  
  title: {  
    fontSize: 28,  
    fontWeight: 'bold',  
    color: '#1f2937',  
    marginBottom: 8,  
  },  
  subtitle: {  
    fontSize: 16,  
    color: '#6b7280',  
  },  
  form: {  
    marginBottom: 20,  
  },  
  inputContainer: {  
    flexDirection: 'row',  
    alignItems: 'center',  
    backgroundColor: 'white',  
    borderRadius: 12,  
    borderWidth: 1,  
    borderColor: '#e5e7eb',  
    marginBottom: 16,  
    paddingHorizontal: 12,  
  },  
  inputIcon: {  
    marginRight: 10,  
  },  
  input: {  
    flex: 1,  
    height: 50,  
    fontSize: 16,  
    color: '#1f2937',  
  },  
  passwordInput: {  
    paddingRight: 40,  
  },  
  passwordToggle: {  
    position: 'absolute',  
    right: 12,  
    height: '100%',  
    justifyContent: 'center',  
  },  
  errorText: {  
    color: '#ef4444',  
    fontSize: 12,  
    marginTop: -12,  
    marginBottom: 16,  
    marginLeft: 12,  
  },  
  forgotPassword: {  
    alignSelf: 'flex-end',  
    marginBottom: 20,  
  },  
  forgotPasswordText: {  
    color: '#6366f1',  
    fontSize: 14,  
  },  
  loginButton: {  
    backgroundColor: '#6366f1',  
    height: 50,  
    borderRadius: 12,  
    justifyContent: 'center',  
    alignItems: 'center',  
    shadowColor: '#6366f1',  
    shadowOffset: {  
      width: 0,  
      height: 4,  
    },  
    shadowOpacity: 0.3,  
    shadowRadius: 4.65,  
    elevation: 8,  
  },  
  loginButtonDisabled: {  
    backgroundColor: '#a5b4fc',  
    elevation: 0,  
    shadowOpacity: 0,  
  },  
  loginButtonText: {  
    color: 'white',  
    fontSize: 16,  
    fontWeight: '600',  
  },  
  footer: {  
    flexDirection: 'row',  
    justifyContent: 'center',  
    alignItems: 'center',  
  },  
  footerText: {  
    color: '#6b7280',  
    fontSize: 14,  
  },  
  registerLink: {  
    color: '#6366f1',  
    fontSize: 14,  
    fontWeight: '600',  
  },  
});  

export default LoginScreen;  