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

import Background from '../components/Background';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const AccountScreen = ({ navigation }) => {
    return(
        <Background>
            <Text>Account</Text>
        </Background>
    );
};

export default AccountScreen;