// frontend/src/navigation/AppNavigator.js  
import React from 'react';  
import { createStackNavigator } from '@react-navigation/stack';  
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  
import { Icon } from 'react-native-elements';  

import { HomeScreen } from '../screens/Home';  
import { CreateFormScreen } from '../screens/CreateForm';  
// import { EditFormScreen } from '../screens/EditForm';  
// import { FormResponsesScreen } from '../screens/FormResponses';  
import ProfileScreen from '../screens/ProfileScreen';  

const Stack = createStackNavigator();  
const Tab = createBottomTabNavigator();  

const MainTabs = () => (  
  <Tab.Navigator>  
    <Tab.Screen  
      name="Home"  
      component={HomeScreen}  
      options={{  
        tabBarIcon: ({ color }) => (  
          <Icon name="home" color={color} />  
        ),  
      }}  
    />  
    <Tab.Screen  
      name="Profile"  
      component={ProfileScreen}  
      options={{  
        tabBarIcon: ({ color }) => (  
          <Icon name="person" color={color} />  
        ),  
      }}  
    />  
  </Tab.Navigator>  
);  

export const AppNavigator = () => (  
    <Stack.Navigator>  
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
      {/* <Stack.Screen  
        name="EditForm"  
        component={EditFormScreen}  
        options={{ title: 'Edit Form' }}  
      />   */}
      {/* <Stack.Screen  
        name="FormResponses"  
        component={FormResponsesScreen}  
        options={{ title: 'Responses' }}  
      />   */}
    </Stack.Navigator>  
);  