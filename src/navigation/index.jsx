// src/navigation/index.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';

import { HomeScreen } from '../screens/Home';
import { CreateFormScreen } from '../screens/CreateForm';
import FormEditor from '../screens/FormBuilder/FormEditor'; 
import FormPreviewScreen from '../screens/FormPreviewScreen';
import FormResponsesScreen from '../screens/FormResponsesScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#2196F3',
      tabBarInactiveTintColor: '#666',
      tabBarStyle: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 5,
        paddingBottom: 5
      }
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="home" type="ionicon" color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="person" type="ionicon" color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const AppNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#fff',
        elevation: 1,
        shadowOpacity: 0.3,
      },
      headerTintColor: '#333',
      headerTitleStyle: {
        fontWeight: '600',
      },
    }}
  >
    <Stack.Screen
      name="Main"
      component={MainTabs}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="CreateForm"
      component={CreateFormScreen}
      options={{ title: 'Create Form' }}
    />
    <Stack.Screen
      name="FormEditor"
      component={FormEditor}
      options={{ title: 'Edit Form' }}
    />
    <Stack.Screen
      name="FormPreview"
      component={FormPreviewScreen}
      options={{ title: 'Preview Form' }}
    />
    <Stack.Screen
      name="FormResponses"
      component={FormResponsesScreen}
      options={{ title: 'Form Responses' }}
    />
  </Stack.Navigator>
);