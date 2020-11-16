import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Text,
    Button,
    TextInput,
    Image,
    KeyboardAvoidingView 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import Background from '../components/Background';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const app_name = 'cine-mates';


function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    } else {
        return 'http://10.0.2.2:5000/' + route;
    }
}

const RegisterScreen = ({ navigation }) => {
    var regLogin;
    var regFName;
    var regLName;
    var regPassword;
    var regConfirm;
    var regEmail;
    const [message,setMessage] = useState('');

    const doRegister = async event => {
        event.preventDefault();

        if(regLogin.value && regFName.value && regLName.value && regPassword.value && regConfirm.value && regEmail.value) {
            if(regPassword.value == regConfirm.value){
                var obj = {email:regEmail.value, login:regLogin.value,
                    password:regPassword.value, firstName:regFName.value, lastName:regLName.value, isVerified:false};
                var js = JSON.stringify(obj);

                try {    
                    const response = await fetch(buildPath('api/AddUser'),
                        {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

                    var res = JSON.parse(await response.text());

                    setMessage('');
                    window.location.href = '/';
                }
                catch(e) {
                    setMessage('Could Not Create User');
                    return;
                }
            } else {
                setMessage('Passwords do not match');
            }
        } else {
            setMessage('Please Fill Out All Forms');
        }
    };


    return (
        <Background>
            <View style={styles.screen}>
                <KeyboardAvoidingView behavior="padding">
                <Image source={logo} style={styles.logo} />
                <Card style={styles.inputContainer}>
                    <Text>First Name</Text>
                    <TextInput style={styles.textInput} placeholder="i.e. John" underlineColorAndroid={'black'}/>
                    <Text>Last Name</Text>
                    <TextInput style={styles.textInput} placeholder="i.e. Doe" underlineColorAndroid={'black'}/>
                    <Text>Username</Text>
                    <TextInput style={styles.textInput} placeholder="i.e. johndoe123" underlineColorAndroid={'black'}/>
                    <Text>Email</Text>
                    <TextInput style={styles.textInput} placeholder="i.e. johndoe@gmail.com" underlineColorAndroid={'black'}/>
                    <Text>Password</Text>
                    <TextInput style={styles.textInput} underlineColorAndroid={'black'}/>
                    <Text>Confirm Password</Text>
                    <TextInput style={styles.textInput} underlineColorAndroid={'black'}/>
                    <View style={styles.buttonContainer}>
                        <Button title="Register" onPress={() => doRegister}/>
                    </View>
                    <Text id="regResult">{message}</Text>
                </Card>
                    </KeyboardAvoidingView>
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
    },
    textInput: {
        alignSelf: 'stretch'
        
    }
});

export default RegisterScreen;