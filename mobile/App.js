import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MoviesScreen from './src/screens/MoviesScreen';
import GroupsScreen from './src/screens/GroupsScreen';
import AccountScreen from './src/screens/AccountScreen';

const CinematesStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainScreen() {
  return (
      <Tab.Navigator>
        <Tab.Screen 
          name = "Movies"
          component = { MoviesScreen }
        />

        <Tab.Screen 
          name = "Groups"
          component = { GroupsScreen }
        />

        <Tab.Screen 
          name = "Account"
          component = { AccountScreen }
        />
      </Tab.Navigator>
  );
} 

export default function App() {
  return (
    <NavigationContainer>
      <CinematesStack.Navigator>

        <CinematesStack.Screen
          name = "Login"
          component = { LoginScreen }
          options = {{ headerShown: false }}
        />

        <CinematesStack.Screen
          name = "Register"
          component = { RegisterScreen }
          options = {{  headerShown: false }}
        />

        <CinematesStack.Screen
            name = "Main"
            component = { MainScreen }
            options = {{  headerShown: false }}
        />
        
      </CinematesStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
