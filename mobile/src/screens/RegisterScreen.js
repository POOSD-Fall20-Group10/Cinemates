import React, { useState } from 'react';
import { Alert, View, StyleSheet, Text, TouchableHighlight, TextInput, Image, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const RegisterScreen = ({ navigation }) => {

  const url = 'https://cine-mates.herokuapp.com/API/AddUser'

  const[fname, setfname] = useState('')
  const[lname, setlname] = useState('')
  const[username, setusername] = useState('')
  const[email, setemail] = useState('')
  const[password, setpassword] = useState('')
  const[password2, setpassword2] = useState('')

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

      //register
      if(responseJson.error == ''){
        Alert.alert(
          'Registration Successful',
          'Please be sure to verify your email address',
          [
            {text: 'OK', onPress: () => navigation.reset ({
            index: 0,
            routes: [{name: 'Login'}]
            })}
          ]
        )
      }

    } catch (e) {
      console.log(e)
    }
  }

const doRegister = () => {

  if(password != password2){
    Alert.alert("Error: passwords do not match")
    return
  }

  var hashedpass = md5(password)

  //json object construction
  var obj = {
    firstName: fname,
    lastName: lname,
    login: username,
    email: email,
    password: hashedpass,
  };

  var objstr = JSON.stringify(obj)

  sendtoserver(objstr)
}

    return (
      <ImageBackground
        source={background}
        style={styles.imagebackground}
      >
          <KeyboardAvoidingView
              behavior={Platform.OS === 'android' ? "height" : "padding"}
              style={{ flex : 1 }}
          >
            <View style={styles.screen}>
                <Image source={logo} style={styles.logo} />
                <View style={{justifyContent: 'space-between', }}>
                <Card style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder="First Name" onChangeText={(val) => setfname(val)}/>
                    <TextInput style={styles.textInput} placeholder="Last Name" onChangeText={(val) => setlname(val)}/>
                    <TextInput style={styles.textInput} placeholder="Username" onChangeText={(val) => setusername(val)}/>
                    <TextInput style={styles.textInput} placeholder="Email" onChangeText={(val) => setemail(val)}/>
                    <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={(val) => setpassword(val)}/>
                    <TextInput style={styles.textInput} placeholder="Confirm Password" secureTextEntry={true} onChangeText={(val) => setpassword2(val)}/>
                    <TouchableHighlight style={styles.cineButton} onPress={() => doRegister()}>
                      <Text style={{color: 'white'}}>Sign Up</Text>
                    </TouchableHighlight>
                </Card>
                
                <Card style={{...styles.inputContainer, padding:10}}>
                  <View style={{flexDirection: 'row'}}>
                        <Text>Already have an account? </Text>
                        <Text style={{color: 'blue'}}
                          onPress={() =>
                            navigation.reset ({
                            index: 0,
                            routes: [{name: 'Login'}]
                          })}>
                                Log in
                        </Text>
                    </View>
                </Card>
                </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        marginBottom: 20
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
        marginVertical: 7,
        justifyContent: 'space-between',
    },
    textInput: {
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        height: 39,
        alignItems: 'center',
        marginVertical: 3
    },
    imagebackground: {
      width: '100%',
      height: '100%',
      flex: 1
    },
    cineButton: {
      alignSelf: 'stretch',
      marginTop: 5,
      alignItems: 'center',
      backgroundColor: 'dimgray',
      borderRadius: 3,
      height: 30,
      justifyContent: 'center'
    },
});

export default RegisterScreen;
