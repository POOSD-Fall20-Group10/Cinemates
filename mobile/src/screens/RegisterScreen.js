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
import { StackNavigationProp } from '@react-navigation/stack';

import Background from '../components/Background';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const RegisterScreen = ({ navigation }) => {
    return (
        <Background>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'android' ? "height" : "padding"}
                    style={{ flex : 1 }}    
                >
            <View style={styles.screen}>
                <Image source={logo} style={styles.logo} />
                <View style={{justifyContent: 'space-between', }}>
                <Card style={styles.inputContainer}>

                    <TextInput style={styles.textInput} placeholder="First Name" />
                    <TextInput style={styles.textInput} placeholder="Last Name" />
                    <TextInput style={styles.textInput} placeholder="Username" />
                    <TextInput style={styles.textInput} placeholder="Email" />
                    <TextInput style={styles.textInput} placeholder="Password" />
                    <TextInput style={styles.textInput} placeholder="Confirm Password" />
                    <Button title="Register" onPress={() => {}}/>
                    <View style={{flexDirection: 'row'}}>
                        <Text>Already have an account?</Text>
                        <Button 
                            title="Login" 
                            onPress={() => 
                                navigation.reset ({
                                index: 0,
                                routes: [{name: 'Login'}]
                            })}/>
                    </View>
                </Card>
                </View>
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
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        height: 39,
        alignItems: 'center',
        marginVertical: 3
    }
});

export default RegisterScreen;