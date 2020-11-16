import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MainScreen from './src/screens/MainScreen';


const CinematesStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <CinematesStack.Navigator>

      <CinematesStack.Screen
          name = "Login"
          component = { LoginScreen }
          options = {{ title: 'Login', headerTitleAlign: 'center' }}
        />

        <CinematesStack.Screen
          name = "Register"
          component = { RegisterScreen }
          options = {{ title: 'Register', headerTitleAlign: 'center' }}
        />

      <CinematesStack.Screen
          name = "Main"
          component = { MainScreen }
          options = {{ title: 'Main', headerTitleAlign: 'center' }}
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

export default App;
