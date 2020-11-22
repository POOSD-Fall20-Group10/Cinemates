import React, { useState } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Image,
    ImageBackground
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
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
      <ImageBackground
        source={background}
        style={styles.imagebackground}
      >
            <Text>Movies</Text>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
  imagebackground: {
    width: '100%',
    height: '100%',
    flex: 1
  }
});


export default MoviesScreen;
