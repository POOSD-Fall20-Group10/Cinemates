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
    TouchableHighlight,
    SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import background from '../assets/background_curtains.jpg';
import Card from '../components/Card';

const IndividualGroupScreen = ({navigation}) => {
  navigation.setOptions = {
    title: name
  }

const url = 'https://cine-mates.herokuapp.com/API/GetUserByLogin'
const url2 = 'https://cine-mates.herokuapp.com/API/AddUserToGroup'
const url3 = 'https://cine-mates.herokuapp.com/API/ListGrpupMessages'

const[token, setToken] = useState('')
const[groupID, setGID] = useState('')
const[name, setName] = useState('')
const[description, setDescription] = useState('')
const[members, setMembers] = useState('')

const[find, setFind] = useState('')
const[tobeadded, setTBA] = useState('')

const[err, setErr] = useState('')

  async function getToken() {
    try {
      const value = await AsyncStorage.getItem('key');
      const obj = JSON.parse(value)

      setToken(obj.token)

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
      setMembers(obj.members)

    } catch (error) {
      console.log(error)
    }
  }

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

  /*
  async function listGroupMessages() {
    try {
      let response = await fetch(url3, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        })
      })
    }
  }
  */

    return (
        <ImageBackground
        source={background}
        style={styles.imagebackground}
        >
          <Button title="Fire Up" onPress={() => {getItem(); getToken()}}/>
          <TextInput style={styles.textInput} onChangeText={(val) => setFind(val)}/>
          <Button title="Finder" onPress={() => findPerson(find)}/>
          <Text>Group Name: {name} Description: {description}</Text>
          <Text>{err}</Text>

          <Card style={styles.inputContainer}>
              <Text style={{fontWeight: 'bold', fontSize: 20, textAlign: 'center'}}>Chat</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 30}}>
                <TextInput style={{marginRight: 10}} placeholder="Write Your Message Here"/>
                <Button title="Send"/>
              </View>
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
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 10,
      marginVertical: 7
  },
});

export default IndividualGroupScreen;