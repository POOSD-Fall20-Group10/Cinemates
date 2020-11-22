import React, { useState } from 'react';
import {
    Alert,
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Image,
    ImageBackground
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
import logo from '../assets/Cinemates.png';
import Card from '../components/Card';

const AccountScreen = ({ navigation }) => {

  const url = 'https://cine-mates.herokuapp.com/API/EditUser'
  var md5 = require('md5');

  //prepopulation of current values
  const[user, setUser] = useState('')
  //const[pass, setPass] = useState('')
  const[email, setEmail] = useState('')
  const[fname, setFname] = useState('')
  const[lname, setLname] = useState('')
  const[token, setToken] = useState('')

  //new values to be updated
  const[userNew, setUser2] = useState('')
  const[passNew, setPass2] = useState('')
  const[emailNew, setEmail2] = useState('')
  const[fnameNew, setFname2] = useState('')
  const[lnameNew, setLname2] = useState('')
  const[tokenNew, setToken2] = useState('')

  async function getItem(item) {
    try {
      const value = await AsyncStorage.getItem('key');
      const obj = JSON.parse(value)

      setUser(obj.login)
      //setPass(obj.password)
      setEmail(obj.email)
      setFname(obj.firstName)
      setLname(obj.lastName)
      setToken(obj.token)
    } catch (error) {
      console.log(error)
    }
  }
  getItem()

  const doUpdate = () => {

    var hashNew = md5(passNew)

    var obj = {
      login: userNew,
      password: hashNew,
      email: emailNew,
      firstName: fnameNew,
      lastName: lnameNew,
      token: token,
    };

    var objstr = JSON.stringify(obj)
    editUser(objstr)
  }

//login Api call
  async function editUser(param) {
    console.log(param)
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
      console.log(responseJson)
    } catch (e) {
        Alert.alert(e)
      }
  }

    return(
      <ImageBackground
        source={background}
        style={styles.imagebackground}
      >
        <Card style={styles.inputContainer}>

          <Text>Username</Text>
          <TextInput style={styles.textInput} placeholder={user} onChangeText={(val) => setUser2(val)}/>
          <Text>Password</Text>
          <TextInput style={styles.textInput} placeholder="Password" onChangeText={(val) => setPass2(val)}/>
          <Text>Email</Text>
          <TextInput style={styles.textInput} placeholder={email} onChangeText={(val) => setEmail2(val)}/>
          <Text>First Name</Text>
          <TextInput style={styles.textInput} placeholder={fname} onChangeText={(val) => setFname2(val)}/>
          <Text>Last Name</Text>
          <TextInput style={styles.textInput} placeholder={lname} onChangeText={(val) => setLname2(val)}/>
          <Button title="Update" onPress={() => doUpdate()}/>

        </Card>
      </ImageBackground>
    );
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
        alignSelf: 'center',
        marginVertical: 120,
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
    },
    imagebackground: {
      width: '100%',
      height: '100%',
      flex: 1
    }
});

export default AccountScreen;
