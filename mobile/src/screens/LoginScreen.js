import React, { useState } from 'react';
import { Alert, View, StyleSheet, Text, Button, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Background from '../components/Background';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const LoginScreen = ({ navigation }) => {

const url = 'https://cine-mates.herokuapp.com/API/UserLogin'
const[username, setName] = useState('')
const[password, setPass] = useState('')
var md5 = require('md5');

//login Api call
async function sendtoserver(param) {
  try {
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: param
    });
    let responseJson = await response.json()

    //correct password
    if(responseJson.error == ''){
      Alert.alert("goodshit my g")
    }
    //incorrect password
    else if (responseJson.error == 'Username or password incorrect') {
      Alert.alert(responseJson.error)
    }

  } catch (e) {
    Alert.alert(e)
  }
}

//set username and password to send to api call function
const doLogin = () => {
  //json object construction

  var hashedpass = md5(password)

  var obj = {
    login: username,
    password: hashedpass
  };

  var objstr = JSON.stringify(obj)

  sendtoserver(objstr)
}

    return (
        <Background>
            <View style={styles.screen}>
                <Image source={logo} style={styles.logo} />
                <Card style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder="Username" onChangeText={(val) => setName(val)} />
                    <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={(val) => setPass(val)}/>
                    <Button title="Login" onPress={() => doLogin()}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text>Don't have an account? </Text>
                        <Text style={{color: 'blue'}}
                            onPress={() =>
                              navigation.reset ({
                              index: 0,
                              routes: [{name: 'Register'}]
                            })}>
                            Register
                        </Text>
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
