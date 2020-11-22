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

  const[user, setUser] = useState('')
  //const[pass, setPass] = useState('')
  const[email, setEmail] = useState('')
  const[fname, setFname] = useState('')
  const[lname, setLname] = useState('')

async function getItem(item) {
  try {
    const value = await AsyncStorage.getItem('key');
    const obj = JSON.parse(value)
    setUser(obj.login)
    //setPass(obj.password)
    setEmail(obj.email)
    setFname(obj.firstName)
    setLname(obj.lastName)
  } catch (error) {
    // Handle errors here
  }
}

    getItem()

    return(
      <ImageBackground
        source={background}
        style={styles.imagebackground}
      >
        <Card style={styles.inputContainer}>

                            <Text>Username</Text>
                            <TextInput style={styles.textInput} placeholder={user} />
                            <Text>Password</Text>
                            <TextInput style={styles.textInput} placeholder="Password" />
                            <Text>Email</Text>
                            <TextInput style={styles.textInput} placeholder={email} />
                            <Text>First Name</Text>
                            <TextInput style={styles.textInput} placeholder={fname} />
                            <Text>Last Name</Text>
                            <TextInput style={styles.textInput} placeholder={lname}/>
                            <Button title="Update"/>

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
