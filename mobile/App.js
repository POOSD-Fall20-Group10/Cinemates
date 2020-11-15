import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Header from './src/components/Header';
import Background from './src/components/Background';
import RegisterScreen from './src/screens/RegisterScreen';

const App = () => {
  return (
    <View>
      <RegisterScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default App;
