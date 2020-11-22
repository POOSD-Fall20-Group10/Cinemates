import React, { useState } from 'react';
import { Alert, View, StyleSheet, Text, Button, TextInput, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const LoginScreen = ({ navigation }) => {

  const url = 'https://cine-mates.herokuapp.com/API/UserLogin'
  const url2 = 'https://cine-mates.herokuapp.com/API/EmailVerification'

  const[username, setName] = useState('')
  const[password, setPass] = useState('')

  var md5 = require('md5');

  //Save response body for rest of webpages
  async function storeInfo(param) {
    try {
      await AsyncStorage.setItem('key', JSON.stringify(param))
    } catch(e) {
      console.log(e)
    }
  }

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
        //login true and verified
        if(responseJson.isVerified == true){
          storeInfo(responseJson)

          navigation.reset ({
          index: 0,
          routes: [{name: 'Main'}]
          })
        }
        //login true and not verified
        else{
          Alert.alert(
            'Login unsuccessful',
            'Please verify email before logging in',
            [
              {text: 'Ok'},
              {text: 'Resend', onPress: () => emailMe(responseJson.email) }
            ]
          )
        }
      }
      //incorrect password
      else if (responseJson.error == 'Username or password incorrect') {
        console.log(responseJson.error)
      }

    } catch (e) {
      console.log(e)
    }
  }

  //set username and password to send to api call function
  const doLogin = () => {

    var hashedpass = md5(password)

    var obj = {
      login: username,
      password: hashedpass
    };

    var objstr = JSON.stringify(obj)

    sendtoserver(objstr)
  }

  async function emailMe(email) {
    try {
      let response = await fetch(url2, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
              email: email
          })
      });
      let responseJson = await response.json()

      if(responseJson.error == ''){
        Alert.alert("Sent again, be sure to check spam folder")
      }

    } catch (e) {
      console.log(e)
    }
  }

      return (
          <ImageBackground
            source={background}
            style={styles.imagebackground}
          >
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
          </ImageBackground>
      )
  };

  const styles = StyleSheet.create({
      screen: {
          flex: 1,
          padding: 10,
          alignItems: 'center',
          marginBottom: 50
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
      },
      imagebackground: {
        width: '100%',
        height: '100%',
        flex: 1
      }
  });

export default LoginScreen;
