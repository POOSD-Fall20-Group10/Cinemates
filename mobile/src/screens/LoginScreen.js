import React, { useState } from 'react';
import { Modal, Alert, View, StyleSheet, Text, TouchableHighlight, TextInput, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const LoginScreen = ({ navigation }) => {

  const url = 'https://cine-mates.herokuapp.com/API/UserLogin'
  const url2 = 'https://cine-mates.herokuapp.com/API/EmailVerification'
  const url3 = 'https://cine-mates.herokuapp.com/API/PasswordReset'

  const [modalVisible, setModalVisible] = useState(false);

  const[username, setName] = useState('')
  const[password, setPass] = useState('')

  const[resetEmail, setReset] = useState('')

  const[myerror, setErr] = useState('')

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
        setErr(responseJson.error)
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

  async function resetPass() {
    try {
      let response = await fetch(url3, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
              email: resetEmail
          })
      });
      let responseJson = await response.json()

      if(responseJson.error == ''){
        Alert.alert("Sent")
      }
      else{
        Alert.alert(responseJson.error)
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.modalView}>
                  <Text>Email Address</Text>
                  <TextInput style={styles.textInput} onChangeText={(val) => setReset(val)}/>
                  <TouchableHighlight
                      onPress={() => {
                          setModalVisible(!modalVisible);
                      }}
                  >
                      <Text>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                      onPress={() => {
                          resetPass()
                          setModalVisible(!modalVisible);
                      }}
                  >
                    <Text>Submit</Text>
                  </TouchableHighlight>
              </View>
            </Modal>

              <View style={styles.screen}>
                  <Image source={logo} style={styles.logo} />
                  <Card style={styles.inputContainer}>
                      <TextInput style={styles.textInput} placeholder="Username" onChangeText={(val) => setName(val)} />
                      <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={true} onChangeText={(val) => setPass(val)}/>
                      <TouchableHighlight style={styles.cineButton} onPress={() => doLogin()}>
                        <Text style={{color: 'white'}}>Log In</Text>
                      </TouchableHighlight>
                      <Text style={{color: 'red'}}>{myerror}</Text>
                      <Text style={{color: 'blue',  marginTop: 10, marginBottom: -5}}
                              onPress={() =>
                                setModalVisible(true)}>
                              Forgot Password?
                          </Text>
                  </Card>
                  <Card style={{...styles.inputContainer, padding:10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                          <Text>Don't have an account? </Text>
                          <Text style={{color: 'blue'}}
                              onPress={() =>
                                navigation.reset ({
                                index: 0,
                                routes: [{name: 'Register'}]
                              })}>
                              Sign up
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
          padding: 20,
          marginVertical: 7
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
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 4,
    },
  });

export default LoginScreen;
