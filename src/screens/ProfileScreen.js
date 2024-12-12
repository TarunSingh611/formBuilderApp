// src/screens/ProfileScreen.js  
import React from 'react';  
import {  
  View,  
  Text,  
  StyleSheet,  
  TouchableOpacity,  
  Alert  
} from 'react-native';  
import { useSelector, useDispatch } from 'react-redux';  
import { logoutUser } from '../redux/reducers/authSlice'; 

const ProfileScreen = () => {  
  const dispatch = useDispatch();  
  const { user } = useSelector(state => state.auth);  

  const handleLogout = () => {  
    Alert.alert(  
      'Logout',  
      'Are you sure you want to logout?',  
      [  
        {  
          text: 'Cancel',  
          style: 'cancel',  
        },  
        {  
          text: 'Logout',  
          style: 'destructive',  
          onPress: () => dispatch(logoutUser()),  
        },  
      ],  
    );  
  };  

  return (  
    <View style={styles.container}>  
      <View style={styles.header}>  
        <View style={styles.avatarContainer}>  
          <Text style={styles.avatarText}>  
            {user?.email?.[0]?.toUpperCase() || 'U'}  
          </Text>  
        </View>  
        <Text style={styles.email}>{user?.email}</Text>  
      </View>  

      <View style={styles.section}>  
        <Text style={styles.sectionTitle}>Account</Text>  
        <TouchableOpacity style={styles.menuItem}>  
          <Text style={styles.menuItemText}>Edit Profile</Text>  
        </TouchableOpacity>  
        <TouchableOpacity style={styles.menuItem}>  
          <Text style={styles.menuItemText}>Change Password</Text>  
        </TouchableOpacity>  
      </View>  

      <View style={styles.section}>  
        <Text style={styles.sectionTitle}>App</Text>  
        <TouchableOpacity style={styles.menuItem}>  
          <Text style={styles.menuItemText}>About</Text>  
        </TouchableOpacity>  
        <TouchableOpacity style={styles.menuItem}>  
          <Text style={styles.menuItemText}>Privacy Policy</Text>  
        </TouchableOpacity>  
      </View>  

      <TouchableOpacity   
        style={styles.logoutButton}  
        onPress={handleLogout}  
      >  
        <Text style={styles.logoutButtonText}>Logout</Text>  
      </TouchableOpacity>  
    </View>  
  );  
};  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#f5f5f5',  
  },  
  header: {  
    backgroundColor: 'white',  
    padding: 20,  
    alignItems: 'center',  
    borderBottomWidth: 1,  
    borderBottomColor: '#eee',  
  },  
  avatarContainer: {  
    width: 80,  
    height: 80,  
    borderRadius: 40,  
    backgroundColor: '#6366f1',  
    alignItems: 'center',  
    justifyContent: 'center',  
    marginBottom: 12,  
  },  
  avatarText: {  
    fontSize: 32,  
    color: 'white',  
    fontWeight: 'bold',  
  },  
  email: {  
    fontSize: 16,  
    color: '#333',  
  },  
  section: {  
    marginTop: 20,  
    backgroundColor: 'white',  
    paddingVertical: 8,  
  },  
  sectionTitle: {  
    fontSize: 14,  
    color: '#666',  
    paddingHorizontal: 16,  
    paddingVertical: 8,  
  },  
  menuItem: {  
    paddingVertical: 12,  
    paddingHorizontal: 16,  
    borderBottomWidth: 1,  
    borderBottomColor: '#eee',  
  },  
  menuItemText: {  
    fontSize: 16,  
    color: '#333',  
  },  
  logoutButton: {  
    margin: 16,  
    backgroundColor: '#ef4444',  
    padding: 16,  
    borderRadius: 8,  
    alignItems: 'center',  
  },  
  logoutButtonText: {  
    color: 'white',  
    fontSize: 16,  
    fontWeight: '600',  
  },  
});  

export default ProfileScreen;  