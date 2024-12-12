// mobile/src/screens/Auth/Login.js  
'use client';
import React, { useState } from 'react';  
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';  
import { useFormik } from 'formik';  
import * as Yup from 'yup';  
import { useDispatch } from 'react-redux';  
import LottieView from 'lottie-react-native';  

const LoginSchema = Yup.object().shape({  
  email: Yup.string()  
    .email('Invalid email')  
    .required('Email is required'),  
  password: Yup.string()  
    .min(6, 'Password must be at least 6 characters')  
    .required('Password is required'),  
});  

const Login = ({ navigation }) => {  
  const [loading, setLoading] = useState(false);  
  const fadeAnim = new Animated.Value(0);  
  const dispatch = useDispatch();  

  React.useEffect(() => {  
    Animated.timing(fadeAnim, {  
      toValue: 1,  
      duration: 1000,  
      useNativeDriver: true,  
    }).start();  
  }, []);  

  const formik = useFormik({  
    initialValues: {  
      email: '',  
      password: '',  
    },  
    validationSchema: LoginSchema,  
    onSubmit: async (values) => {  
      try {  
        setLoading(true);  
        // API call to login  
        const response = await authService.login(values);  
        dispatch(loginSuccess(response.data));  
        navigation.replace('Home');  
      } catch (error) {  
        Alert.alert('Error', error.message);  
      } finally {  
        setLoading(false);  
      }  
    },  
  });  

  return (  
    <Animated.View   
      style={[  
        styles.container,  
        {  
          opacity: fadeAnim,  
          transform: [{  
            translateY: fadeAnim.interpolate({  
              inputRange: [0, 1],  
              outputRange: [50, 0],  
            }),  
          }],  
        },  
      ]}  
    >  
      <LottieView  
        source={require('../../animations/login.json')}  
        autoPlay  
        loop  
        style={styles.animation}  
      />  

      <Text style={styles.title}>Welcome Back!</Text>  

      <View style={styles.form}>  
        <TextInput  
          style={styles.input}  
          placeholder="Email"  
          value={formik.values.email}  
          onChangeText={formik.handleChange('email')}  
          onBlur={formik.handleBlur('email')}  
          keyboardType="email-address"  
          autoCapitalize="none"  
        />  
        {formik.touched.email && formik.errors.email && (  
          <Text style={styles.errorText}>{formik.errors.email}</Text>  
        )}  

        <TextInput  
          style={styles.input}  
          placeholder="Password"  
          value={formik.values.password}  
          onChangeText={formik.handleChange('password')}  
          onBlur={formik.handleBlur('password')}  
          secureTextEntry  
        />  
        {formik.touched.password && formik.errors.password && (  
          <Text style={styles.errorText}>{formik.errors.password}</Text>  
        )}  

        <TouchableOpacity  
          style={styles.button}  
          onPress={formik.handleSubmit}  
          disabled={loading}  
        >  
          {loading ? (  
            <ActivityIndicator color="#fff" />  
          ) : (  
            <Text style={styles.buttonText}>Login</Text>  
          )}  
        </TouchableOpacity>  

        <TouchableOpacity  
          onPress={() => navigation.navigate('Register')}  
          style={styles.linkButton}  
        >  
          <Text style={styles.linkText}>Don't have an account? Sign up</Text>  
        </TouchableOpacity>  
      </View>  
    </Animated.View>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#fff',  
    padding: 20,  
  },  
  animation: {  
    width: 200,  
    height: 200,  
    alignSelf: 'center',  
  },  
  title: {  
    fontSize: 28,  
    fontWeight: 'bold',  
    textAlign: 'center',  
    marginBottom: 30,  
    color: '#333',  
  },  
  form: {  
    width: '100%',  
  },  
  input: {  
    backgroundColor: '#f5f5f5',  
    padding: 15,  
    borderRadius: 10,  
    marginBottom: 15,  
    fontSize: 16,  
  },  
  errorText: {  
    color: 'red',  
    fontSize: 12,  
    marginBottom: 10,  
  },  
  button: {  
    backgroundColor: '#007AFF',  
    padding: 15,  
    borderRadius: 10,  
    alignItems: 'center',  
    marginTop: 10,  
  },  
  buttonText: {  
    color: '#fff',  
    fontSize: 16,  
    fontWeight: 'bold',  
  },  
  linkButton: {  
    marginTop: 20,  
    alignItems: 'center',  
  },  
  linkText: {  
    color: '#007AFF',  
    fontSize: 16,  
  },  
});  

export default Login;  