import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './src/screens/RegisterScreen';
import LoginScreen from './src/screens/LoginScreen';


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
