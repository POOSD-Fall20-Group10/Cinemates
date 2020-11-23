import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Image,
    ImageBackground,
    FlatList,
    Modal,
    TouchableHighlight
} from 'react-native';

import background from '../assets/background_curtains.jpg';
import Card from '../components/Card';

const IndividualGroupScreen = ({naviagtion}) => {
    return (
        <ImageBackground
        source={background}
        style={styles.imagebackground}
        >

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imagebackground: {
      width: '100%',
      height: '100%',
      flex: 1
    },
});

export default IndividualGroupScreen;