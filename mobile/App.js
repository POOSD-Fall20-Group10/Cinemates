import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './src/screens/RegisterScreen';
import TestScreen from './src/screens/TestScreen';


const CinematesStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <CinematesStack.Navigator>

        <CinematesStack.Screen
          name = "Register"
          component = { RegisterScreen }
          options = {{ title: 'Register ', headerTitleAlign: 'center' }}
        />

        <CinematesStack.Screen
          name = "Test"
          component = { TestScreen }
          options = {{title: 'Test', headerTitleAlign: 'center'}}
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
