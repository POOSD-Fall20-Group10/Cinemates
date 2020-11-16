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
            <View style={styles.screen}>
                <Image source={logo} style={styles.logo} />
                <Card style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder="Username" />
                    <TextInput style={styles.textInput} placeholder="Password"/>
                    <Button title="Login" onPress={() => navigation.navigate('Main')}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text>Don't have an account?</Text>
                        <Button 
                            title="Register" 
                            onPress={() => 
                                navigation.reset ({
                                index: 0,
                                routes: [{name: 'Register'}]
                            })}/>
                    </View>
                </Card>
            </View>
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20
    },
    textInput: {
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        height: 39,
        alignItems: 'center',
        marginVertical: 3
    }
});

export default LoginScreen;