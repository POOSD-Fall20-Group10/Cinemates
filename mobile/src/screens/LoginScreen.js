import React, { useState } from 'react';
import { 
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

import Background from '../components/Background';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const LoginScreen = ({ navigation }) => {
    return (
        <Background>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? "height" : "padding"}
                    style={{ flex : 1 }}    
                >
            <View style={styles.screen}>
                <Image source={logo} style={styles.logo} />
                <Card style={styles.inputContainer}>
                    <Text>Username</Text>
                    <TextInput style={styles.textInput} placeholder="i.e. johndoe123" underlineColorAndroid={'black'}/>
                    <Text>Password</Text>
                    <TextInput style={styles.textInput} underlineColorAndroid={'black'}/>
                    <View style={styles.buttonContainer}>
                        <Button title="Login" onPress={() => doRegister}/>
                    </View>
                </Card>
            </View>
                    </KeyboardAvoidingView>
        </Background>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    logo: {
        flex: 1,
        alignSelf: 'center',
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
    },
    textInput: {
        alignSelf: 'stretch'
        
    }
});

export default LoginScreen;