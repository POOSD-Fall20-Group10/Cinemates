import React, { useState } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import Background from '../components/Background';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';


async function getMyObject() {
  try {
      const jsonValue = await AsyncStorage.getItem('key')
      const needed = JSON.parse(jsonValue)
      Alert.alert(needed.email)
    } catch(e) {
      Alert.alert(e)
    }

    console.log('Done.')

  }

const MoviesScreen = ({ navigation }) => {
    return(
        <Background>
            <Button title="press me for your email" onPress={() => getMyObject()}/>
        </Background>
    );
};

export default MoviesScreen;
