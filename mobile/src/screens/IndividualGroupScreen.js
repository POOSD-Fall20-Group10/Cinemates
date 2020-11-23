import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Image,
    ImageBackground,
    FlatList,
    Modal,
    TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
import Card from '../components/Card';

const IndividualGroupScreen = ({naviagtion}) => {

const findlink = 'https://cine-mates.herokuapp.com/API/GetUserByLogin'
const addlink = 'https://cine-mates.herokuapp.com/API/AddUserToGroup'

const[name, setName] = useState('')
const[description, setDescription] = useState('')
const[members, setMembers] = useState('')

const[token, setToken] = useState('')
const[groupID, setGID] = useState('')

const[find, setFind] = useState('')
const[tobeadded, setTBA] = useState('')

const[err, setErr] = useState('')

  async function getToken() {
    try {
      const value = await AsyncStorage.getItem('key');
      const obj = JSON.parse(value)

      setToken(obj.token)
      console.log(token)

    } catch (error) {
      console.log(error)
    }
  }

  async function getItem() {
    try {
      const value = await AsyncStorage.getItem('group');
      const obj = JSON.parse(value)

      setGID(obj._id)
      setName(obj.name)
      setDescription(obj.description)
      setMembers(JSON.stringify(obj.members))

    } catch (error) {
      console.log(error)
    }
  }
/*
  async function findPerson(param) {
    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: find
        })
      });

      let responseJson = await response.json()

        if(responseJson.error ==''){
          console.log("SUCCESS USER FOUND")
          setTBA(responseJson.id)
          addToGroup()
        }
        else{
          console.log("user not found")
          setErr("user not found, try again")
          return
        }
      }
     catch (e) {
        console.log(e)
      }
  }

  async function addToGroup() {
    try {
      let response = await fetch(url2, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          userID: tobeadded,
          groupID: groupID,
        })
      });

      let responseJson = await response.json()
      if(responseJson.error ==''){
        console.log("ADDED")
      }


      }
     catch (e) {
        console.log(e)
      }
  }
*/

    return (
        <ImageBackground
        source={background}
        style={styles.imagebackground}
        >
          <Card style={styles.inputContainer}>
            <Button title="Load Data" onPress={() => getItem()}/>
            <Text>GroupID:{groupID} Name:{name} Desc: {description} Members: {members}</Text>
          </Card>

        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imagebackground: {
      width: '100%',
      height: '100%',
      flex: 1
    },
    textInput: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        height: 39,
        alignItems: 'center',
        marginVertical: 3
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: 'center',
        marginVertical: 7,
        justifyContent: 'space-between',
    }
});

export default IndividualGroupScreen;
